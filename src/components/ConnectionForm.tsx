import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

interface ConnectionFormProps {
  onSave: (credentials: any) => void;
  onCancel: () => void;
  initialCredentials: any;
}

export const ConnectionForm: React.FC<ConnectionFormProps> = ({
  onSave,
  onCancel,
  initialCredentials,
}) => {
  const [host, setHost] = useState(initialCredentials?.host || '');
  const [port, setPort] = useState(initialCredentials?.port || '22');
  const [username, setUsername] = useState(initialCredentials?.username || '');
  const [password, setPassword] = useState(initialCredentials?.password || '');

  const handleSave = () => {
    if (!host || !username) {
      alert('Please enter host and username');
      return;
    }
    onSave({
      host,
      port,
      username,
      password,
    });
  };

  return (
    <KeyboardAvoidingView 
      style={styles.modalContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>SSH Connection Settings</Text>
        
        <TextInput
          style={styles.modalInput}
          placeholder="Host IP Address"
          placeholderTextColor="#666"
          value={host}
          onChangeText={setHost}
          autoCapitalize="none"
          autoCorrect={false}
        />
        
        <TextInput
          style={styles.modalInput}
          placeholder="Port (default: 22)"
          placeholderTextColor="#666"
          value={port}
          onChangeText={setPort}
          keyboardType="numeric"
        />
        
        <TextInput
          style={styles.modalInput}
          placeholder="Username"
          placeholderTextColor="#666"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          autoCorrect={false}
        />
        
        <TextInput
          style={styles.modalInput}
          placeholder="Password"
          placeholderTextColor="#666"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        
        <View style={styles.modalButtons}>
          <TouchableOpacity
            style={[styles.modalButton, styles.cancelButton]}
            onPress={onCancel}
          >
            <Text style={styles.modalButtonText}>Cancel</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.modalButton, styles.saveButton]}
            onPress={handleSave}
          >
            <Text style={styles.modalButtonText}>Save & Connect</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#2d2d2d',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalInput: {
    backgroundColor: '#1e1e1e',
    color: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 5,
    marginBottom: 15,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#666',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
  },
  modalButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});