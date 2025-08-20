import React, { useRef, useEffect } from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  Platform,
} from 'react-native';

interface TerminalViewProps {
  output: string[];
}

export const TerminalView: React.FC<TerminalViewProps> = ({ output }) => {
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [output]);

  return (
    <ScrollView
      ref={scrollViewRef}
      style={styles.terminal}
      contentContainerStyle={styles.terminalContent}
    >
      {output.map((line, index) => (
        <Text key={index} style={styles.terminalText}>
          {line}
        </Text>
      ))}
      <View style={styles.cursor} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  terminal: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    padding: 10,
  },
  terminalContent: {
    paddingBottom: 20,
  },
  terminalText: {
    color: '#0f0',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: 14,
    lineHeight: 20,
  },
  cursor: {
    width: 10,
    height: 16,
    backgroundColor: '#0f0',
    marginTop: 4,
    opacity: 0.8,
  },
});