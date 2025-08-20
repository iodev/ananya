# Contributing to Ananya

First off, thank you for considering contributing to Ananya! It's people like you that make Ananya such a great tool for the developer community.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples to demonstrate the steps**
- **Describe the behavior you observed and expected**
- **Include screenshots if possible**
- **Include device information** (iPhone model, iOS version)
- **Include crash logs if the app crashes**

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

- **Use a clear and descriptive title**
- **Provide a detailed description of the suggested enhancement**
- **Provide specific examples to demonstrate the enhancement**
- **Describe the current behavior and expected behavior**
- **Explain why this enhancement would be useful**

### Your First Code Contribution

Unsure where to begin? You can start by looking through these `beginner` and `help-wanted` issues:

- [Beginner issues](https://github.com/iodev/ananya/labels/beginner) - issues which should only require a few lines of code
- [Help wanted issues](https://github.com/iodev/ananya/labels/help%20wanted) - issues which need extra attention

### Pull Requests

1. Fork the repo and create your branch from `main`
2. If you've added code that should be tested, add tests
3. If you've changed APIs, update the documentation
4. Ensure the test suite passes
5. Make sure your code follows the existing style
6. Issue that pull request!

## Development Process

### Setting Up Your Environment

```bash
# Clone your fork
git clone https://github.com/your-username/ananya.git
cd ananya

# Add upstream remote
git remote add upstream https://github.com/iodev/ananya.git

# Install dependencies
npm install
cd proxy-server && npm install
```

### Development Workflow

1. Create a feature branch:
```bash
git checkout -b feature/your-feature-name
```

2. Make your changes and test locally:
```bash
npm start  # Run the app
npm test   # Run tests
```

3. Commit your changes:
```bash
git add .
git commit -m "feat: add amazing feature"
```

4. Push to your fork:
```bash
git push origin feature/your-feature-name
```

5. Open a Pull Request

### Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` - A new feature
- `fix:` - A bug fix
- `docs:` - Documentation only changes
- `style:` - Changes that don't affect the code meaning
- `refactor:` - Code change that neither fixes a bug nor adds a feature
- `perf:` - Code change that improves performance
- `test:` - Adding missing tests or correcting existing tests
- `chore:` - Changes to the build process or auxiliary tools

### Code Style

- Use TypeScript for all new code
- Follow the existing code style
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused
- Write tests for new features

### Testing

- Write unit tests for new functions
- Write integration tests for new features
- Ensure all tests pass before submitting PR
- Aim for high code coverage

## Project Structure

```
ananya/
├── App.tsx                 # Main app component
├── src/
│   ├── components/        # React components
│   ├── utils/            # Utility functions
│   ├── services/         # External services
│   └── types/            # TypeScript types
├── proxy-server/         # WebSocket proxy server
├── assets/              # Images and other assets
└── __tests__/          # Test files
```

## Review Process

All submissions require review. We use GitHub pull requests for this purpose. Consult [GitHub Help](https://help.github.com/articles/about-pull-requests/) for more information.

## Community

- Join our [Discord Server](https://discord.gg/ananya)
- Follow us on [Twitter](https://twitter.com/ananya_app)
- Read our [Blog](https://blog.ananya.app)

## Recognition

Contributors who submit accepted pull requests will be added to our [Contributors List](https://github.com/iodev/ananya/graphs/contributors).

## Questions?

Feel free to open an issue with your question or reach out to the maintainers directly.

Thank you for contributing! 🎉