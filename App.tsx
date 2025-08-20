import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  SafeAreaView,
  Modal,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Audio } from 'expo-av';
import { SSHConnection } from './src/components/SSHConnection';
import { VoiceInput } from './src/components/VoiceInput';
import { TerminalView } from './src/components/TerminalView';
import { ConnectionForm } from './src/components/ConnectionForm';

interface SSHCredentials {
  host: string;
  port: string;
  username: string;
  password?: string;
  privateKey?: string;
}

export default function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [credentials, setCredentials] = useState<SSHCredentials | null>(null);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [inputCommand, setInputCommand] = useState('');
  const [showConnectionModal, setShowConnectionModal] = useState(true);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    loadSavedCredentials();
    setupAudioMode();
  }, []);

  const setupAudioMode = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        allowsRecordingIOS: true,
      });
    } catch (error) {
      console.error('Audio setup error:', error);
    }
  };

  const loadSavedCredentials = async () => {
    try {
      const savedCreds = await SecureStore.getItemAsync('ssh_credentials');
      if (savedCreds) {
        setCredentials(JSON.parse(savedCreds));
      }
    } catch (error) {
      console.error('Error loading credentials:', error);
    }
  };

  const saveCredentials = async (creds: SSHCredentials) => {
    try {
      await SecureStore.setItemAsync('ssh_credentials', JSON.stringify(creds));
      setCredentials(creds);
      setShowConnectionModal(false);
    } catch (error) {
      Alert.alert('Error', 'Failed to save credentials');
    }
  };

  const handleConnect = async () => {
    if (!credentials) {
      setShowConnectionModal(true);
      return;
    }
    setIsConnected(true);
    addToTerminal(`Connecting to ${credentials.host}:${credentials.port}...`);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    addToTerminal('Disconnected from server');
  };

  const addToTerminal = (text: string) => {
    setTerminalOutput(prev => [...prev, text]);
  };

  const sendCommand = (command: string) => {
    if (!isConnected) {
      Alert.alert('Not Connected', 'Please connect to a server first');
      return;
    }
    addToTerminal(`$ ${command}`);
    // SSH command execution will be handled by SSHConnection component
    setInputCommand('');
  };

  const handleVoiceCommand = (transcript: string) => {
    setInputCommand(transcript);
    sendCommand(transcript);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Ananya SSH Terminal</Text>
          <TouchableOpacity
            style={[styles.connectionButton, isConnected && styles.connectedButton]}
            onPress={isConnected ? handleDisconnect : handleConnect}
          >
            <Text style={styles.connectionButtonText}>
              {isConnected ? 'Disconnect' : 'Connect'}
            </Text>
          </TouchableOpacity>
        </View>

        <TerminalView output={terminalOutput} />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputCommand}
            onChangeText={setInputCommand}
            onSubmitEditing={() => sendCommand(inputCommand)}
            placeholder="Enter command or use voice..."
            placeholderTextColor="#666"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <VoiceInput 
            onTranscript={handleVoiceCommand}
            isRecording={isRecording}
            setIsRecording={setIsRecording}
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={() => sendCommand(inputCommand)}
          >
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>

        <Modal
          visible={showConnectionModal}
          animationType="slide"
          transparent={true}
        >
          <ConnectionForm
            onSave={saveCredentials}
            onCancel={() => setShowConnectionModal(false)}
            initialCredentials={credentials}
          />
        </Modal>

        {isConnected && credentials && (
          <SSHConnection
            credentials={credentials}
            onOutput={addToTerminal}
            onDisconnect={handleDisconnect}
            command={inputCommand}
          />
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#2d2d2d',
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  connectionButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
  connectedButton: {
    backgroundColor: '#f44336',
  },
  connectionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#2d2d2d',
    borderTopWidth: 1,
    borderTopColor: '#444',
  },
  input: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    color: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    marginRight: 10,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  sendButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#2196F3',
    borderRadius: 5,
    justifyContent: 'center',
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});