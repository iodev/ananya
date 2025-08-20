# CLAUDE.md - AI Assistant Instructions for Ananya Project

## Project Overview

Ananya is an iOS SSH terminal application with voice input capabilities, designed specifically to enable mobile access to Claude Code CLI on Ubuntu machines. The app uses a WebSocket proxy architecture to comply with iOS App Store restrictions while maintaining secure SSH connections.

## Architecture Context

### Key Components
1. **iOS App**: React Native/Expo application with TypeScript
2. **Proxy Server**: Node.js WebSocket-to-SSH bridge (required for App Store compliance)
3. **Voice Engine**: expo-av for audio recording and speech recognition integration
4. **Security Layer**: expo-secure-store for iOS Keychain integration

### Technology Stack
- **Frontend**: React Native 0.79.5, Expo SDK 52, TypeScript 5.1
- **Backend**: Node.js with ssh2 and ws libraries
- **Security**: iOS Keychain, WebSocket Secure (WSS)
- **Voice**: expo-av with future Speech Recognition API integration

## Development Guidelines

### Code Style
- Use TypeScript for all new components
- Follow React Native best practices for performance
- Implement proper error boundaries and fallbacks
- Use React hooks and functional components exclusively
- Maintain consistent styling with StyleSheet objects

### Security Requirements
- NEVER store credentials in plain text
- Always use SecureStore for sensitive data
- Implement certificate pinning for production
- Use WSS (not WS) for production WebSocket connections
- Validate all input on both client and server
- Implement rate limiting on the proxy server

### iOS-Specific Considerations
- Respect iOS Human Interface Guidelines
- Handle keyboard properly with KeyboardAvoidingView
- Support both portrait and landscape orientations
- Implement proper audio session management
- Request permissions explicitly with clear explanations
- Support Dynamic Type for accessibility

## Common Tasks

### Adding New Terminal Commands
1. Update `SSHConnection.tsx` to handle the command
2. Add visual feedback in `TerminalView.tsx`
3. Update command history management
4. Test with actual SSH connection

### Implementing Voice Features
1. Use expo-av for recording
2. Integrate with speech-to-text service (Google Cloud/Apple Speech)
3. Add voice command preprocessing
4. Implement command confirmation for destructive operations

### Proxy Server Deployment
1. Use environment variables for configuration
2. Implement health check endpoints
3. Add logging with winston or similar
4. Set up SSL certificates for WSS
5. Configure CORS appropriately
6. Implement connection pooling for scalability

## Testing Strategy

### Unit Tests
- Test credential encryption/decryption
- Test command parsing and validation
- Test WebSocket message handling

### Integration Tests
- Test full SSH connection flow
- Test voice input to command execution
- Test reconnection logic

### E2E Tests
- Test complete user journey from connection to command execution
- Test credential storage and retrieval
- Test error scenarios and recovery

## Build & Deployment

### iOS Build Process
```bash
# Development build
eas build --profile development --platform ios

# Production build
eas build --profile production --platform ios

# Submit to App Store
eas submit --platform ios
```

### Proxy Server Deployment
```bash
# Heroku example
heroku create ananya-proxy
heroku config:set NODE_ENV=production
git push heroku main

# Docker deployment
docker build -t ananya-proxy .
docker run -p 8080:8080 ananya-proxy
```

## Performance Optimization

### App Performance
- Implement lazy loading for components
- Use React.memo for expensive renders
- Optimize terminal output with virtualization for long sessions
- Implement efficient command history with limited storage
- Use InteractionManager for expensive operations

### Network Optimization
- Implement connection pooling in proxy server
- Use compression for WebSocket messages
- Implement intelligent reconnection with exponential backoff
- Cache frequently used data locally
- Minimize round trips with batched commands

## Troubleshooting Guide

### Common Issues

1. **WebSocket Connection Fails**
   - Check proxy server is running
   - Verify SSL certificates
   - Check firewall settings
   - Validate CORS configuration

2. **SSH Authentication Fails**
   - Verify credentials are correct
   - Check SSH server configuration
   - Ensure port 22 is open
   - Validate key format if using SSH keys

3. **Voice Input Not Working**
   - Check microphone permissions
   - Verify audio session configuration
   - Test with different audio modes
   - Check internet connectivity for transcription

4. **App Crashes on Launch**
   - Check for missing dependencies
   - Verify Info.plist permissions
   - Review crash logs in Xcode
   - Test on different iOS versions

## Future Enhancements

### Priority 1 (Next Release)
- [ ] Implement biometric authentication (Face ID/Touch ID)
- [ ] Add SSH key authentication support
- [ ] Integrate native iOS Speech Recognition
- [ ] Add session recording and playback

### Priority 2 (Future Releases)
- [ ] Multi-tab support for multiple SSH sessions
- [ ] File transfer capabilities (SCP/SFTP)
- [ ] Custom keyboard shortcuts
- [ ] Terminal themes and customization
- [ ] Siri Shortcuts integration
- [ ] iPad optimization with Split View

### Priority 3 (Long-term)
- [ ] End-to-end encryption for proxy
- [ ] Self-hosted proxy setup wizard
- [ ] Plugin system for extensions
- [ ] Collaborative sessions
- [ ] AI-powered command suggestions

## Maintenance Notes

### Regular Updates Required
- React Native version updates (check monthly)
- Expo SDK updates (major versions quarterly)
- Security dependency updates (weekly scan)
- iOS SDK compatibility (with each iOS release)
- App Store guideline compliance (review before each submission)

### Monitoring
- Track WebSocket connection stability
- Monitor proxy server performance
- Log voice transcription accuracy
- Track user session metrics
- Monitor battery usage impact

## API Keys and Services

### Required Services
1. **Apple Developer Account**: For App Store distribution
2. **Cloud Provider**: For proxy server hosting (AWS/Heroku/DigitalOcean)
3. **Speech-to-Text API**: Google Cloud Speech or Apple Speech Recognition
4. **Analytics** (Optional): Firebase or Amplitude
5. **Crash Reporting** (Optional): Sentry or Bugsnag

### Environment Variables
```env
# Proxy Server
NODE_ENV=production
PORT=8080
SSL_CERT_PATH=/path/to/cert
SSL_KEY_PATH=/path/to/key
MAX_CONNECTIONS=100
RATE_LIMIT_WINDOW=60000
RATE_LIMIT_MAX_REQUESTS=100

# iOS App (in app.json or eas.json)
PROXY_SERVER_URL=wss://your-proxy.com
SPEECH_API_KEY=your-api-key
ANALYTICS_ENABLED=false
```

## Support Resources

- **React Native Docs**: https://reactnative.dev/docs/getting-started
- **Expo Documentation**: https://docs.expo.dev/
- **SSH2 Library**: https://github.com/mscdex/ssh2
- **App Store Guidelines**: https://developer.apple.com/app-store/guidelines/
- **Claude Code CLI**: https://claude.ai/code

## Contact & Collaboration

For questions about this project's architecture or implementation details, reference this document first. For Claude Code CLI specific integrations, ensure compatibility with the latest CLI version.

---

*This document should be updated with each major feature addition or architectural change.*