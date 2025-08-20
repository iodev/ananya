import React, { useState, useEffect } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';

interface VoiceInputProps {
  onTranscript: (text: string) => void;
  isRecording: boolean;
  setIsRecording: (recording: boolean) => void;
}

export const VoiceInput: React.FC<VoiceInputProps> = ({
  onTranscript,
  isRecording,
  setIsRecording,
}) => {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [permissionResponse, requestPermission] = Audio.usePermissions();

  const startRecording = async () => {
    try {
      if (permissionResponse?.status !== 'granted') {
        await requestPermission();
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      
      setRecording(recording);
      setIsRecording(true);
    } catch (err) {
      console.error('Failed to start recording', err);
      Alert.alert('Error', 'Failed to start recording');
    }
  };

  const stopRecording = async () => {
    if (!recording) return;

    setIsRecording(false);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    
    const uri = recording.getURI();
    setRecording(null);

    if (uri) {
      // For now, we'll simulate transcription
      // In production, you'd send this to a speech-to-text API
      simulateTranscription();
    }
  };

  const simulateTranscription = () => {
    // This is a placeholder - in production, you'd use a real speech-to-text service
    // For iOS App Store submission, you might want to use Apple's Speech framework
    // or a third-party service like Google Cloud Speech-to-Text
    const commands = [
      'claude --version',
      'ls -la',
      'pwd',
      'echo "Hello from Ananya"',
    ];
    const randomCommand = commands[Math.floor(Math.random() * commands.length)];
    onTranscript(randomCommand);
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <TouchableOpacity
      style={[styles.voiceButton, isRecording && styles.recording]}
      onPress={toggleRecording}
    >
      <Text style={styles.voiceButtonText}>
        {isRecording ? '⏹' : '🎤'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  voiceButton: {
    width: 50,
    height: 40,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  recording: {
    backgroundColor: '#f44336',
  },
  voiceButtonText: {
    fontSize: 20,
  },
});