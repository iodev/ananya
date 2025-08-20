const WebSocket = require('ws');
const { Client } = require('ssh2');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log(`SSH Proxy Server running on port ${PORT}`);
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('New WebSocket connection');
  let sshClient = null;
  let sshStream = null;

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      
      if (data.type === 'connect') {
        // Establish SSH connection
        sshClient = new Client();
        
        sshClient.on('ready', () => {
          console.log('SSH connection established');
          ws.send(JSON.stringify({
            type: 'status',
            message: 'SSH connection established'
          }));
          
          sshClient.shell((err, stream) => {
            if (err) {
              ws.send(JSON.stringify({
                type: 'error',
                message: err.message
              }));
              return;
            }
            
            sshStream = stream;
            
            stream.on('data', (data) => {
              ws.send(JSON.stringify({
                type: 'output',
                text: data.toString('utf8')
              }));
            });
            
            stream.on('close', () => {
              ws.send(JSON.stringify({
                type: 'status',
                message: 'SSH stream closed'
              }));
            });
          });
        });
        
        sshClient.on('error', (err) => {
          console.error('SSH error:', err);
          ws.send(JSON.stringify({
            type: 'error',
            message: err.message
          }));
        });
        
        // Connect to SSH server
        const connectionConfig = {
          host: data.host,
          port: parseInt(data.port) || 22,
          username: data.username,
          password: data.password,
          readyTimeout: 30000,
          keepaliveInterval: 10000
        };
        
        // If private key is provided, use it instead of password
        if (data.privateKey) {
          connectionConfig.privateKey = data.privateKey;
          delete connectionConfig.password;
        }
        
        sshClient.connect(connectionConfig);
        
      } else if (data.type === 'command') {
        // Execute command
        if (sshStream) {
          sshStream.write(data.command + '\n');
        } else {
          ws.send(JSON.stringify({
            type: 'error',
            message: 'No SSH connection established'
          }));
        }
        
      } else if (data.type === 'disconnect') {
        // Close SSH connection
        if (sshClient) {
          sshClient.end();
        }
      }
      
    } catch (error) {
      console.error('Message processing error:', error);
      ws.send(JSON.stringify({
        type: 'error',
        message: error.message
      }));
    }
  });
  
  ws.on('close', () => {
    console.log('WebSocket connection closed');
    if (sshClient) {
      sshClient.end();
    }
  });
  
  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
    if (sshClient) {
      sshClient.end();
    }
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// Basic info endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'Ananya SSH Proxy Server',
    version: '1.0.0',
    websocket: `ws://localhost:${PORT}`
  });
});