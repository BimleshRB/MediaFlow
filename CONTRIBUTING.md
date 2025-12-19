# Contributing to MediaFlow

First off, thank you for considering contributing to MediaFlow! It's people like you that make MediaFlow such a great tool.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples to demonstrate the steps**
- **Describe the behavior you observed after following the steps**
- **Explain which behavior you expected to see instead and why**
- **Include screenshots or animated GIFs** if possible
- **Include your environment details** (OS, browser, Node.js version, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

- **Use a clear and descriptive title**
- **Provide a step-by-step description of the suggested enhancement**
- **Provide specific examples to demonstrate the steps**
- **Describe the current behavior** and **explain which behavior you expected to see instead**
- **Explain why this enhancement would be useful**

### Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Clone your fork** locally
   ```bash
   git clone https://github.com/YOUR_USERNAME/mediaflow.git
   cd mediaflow
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Create a new branch** for your feature or bugfix
   ```bash
   git checkout -b feature/amazing-feature
   # or
   git checkout -b fix/bug-fix
   ```

5. **Make your changes**
   - Write clear, concise commit messages
   - Follow the existing code style
   - Add tests if applicable
   - Update documentation as needed

6. **Test your changes**
   ```bash
   npm run dev
   # Test manually in the browser
   ```

7. **Commit your changes**
   ```bash
   git add .
   git commit -m "Add some amazing feature"
   ```

8. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```

9. **Open a Pull Request** from your fork to the main repository

## Development Guidelines

### Code Style

- Use TypeScript for type safety
- Follow React best practices and hooks guidelines
- Use functional components with hooks
- Keep components small and focused
- Use meaningful variable and function names
- Add comments for complex logic

### Component Structure

```tsx
// 1. Imports
import { useState } from "react"
import { Button } from "@/components/ui/button"

// 2. Types/Interfaces
interface ComponentProps {
  title: string
  onAction: () => void
}

// 3. Component
export function Component({ title, onAction }: ComponentProps) {
  // 4. Hooks
  const [state, setState] = useState(false)

  // 5. Handlers
  const handleClick = () => {
    setState(!state)
    onAction()
  }

  // 6. Render
  return (
    <div>
      <h1>{title}</h1>
      <Button onClick={handleClick}>Click me</Button>
    </div>
  )
}
```

### Commit Message Guidelines

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line

**Examples:**
```
Add video playback speed control
Fix MKV file detection issue
Update README with installation instructions
Refactor video player component for better performance
```

### Branch Naming

- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `refactor/` - Code refactoring
- `test/` - Adding tests
- `chore/` - Maintenance tasks

**Examples:**
- `feature/add-subtitle-support`
- `fix/audio-playback-issue`
- `docs/update-contributing-guide`

## Project Areas to Contribute

### 🎬 Media Player Features
- Add subtitle/caption support
- Implement playlist functionality
- Add video filters and effects
- Support for more file formats
- Picture-in-picture mode

### 🎨 UI/UX Improvements
- Improve mobile responsiveness
- Add more theme options
- Create custom color schemes
- Enhance animations
- Improve accessibility

### ⚡ Performance
- Optimize large file handling
- Improve loading times
- Reduce bundle size
- Add lazy loading
- Implement caching strategies

### 🧪 Testing
- Add unit tests
- Add integration tests
- Add E2E tests
- Improve test coverage

### 📚 Documentation
- Improve README
- Add API documentation
- Create user guides
- Add code examples
- Create video tutorials

## Questions?

Feel free to reach out:
- Open a GitHub issue
- Contact [@BimleshRB](https://github.com/BimleshRB) on GitHub
- Connect on [LinkedIn](https://www.linkedin.com/in/bimlesh-kumar-iiitbh-cse/)

## Recognition

Contributors will be recognized in the README and on our contributors page. Thank you for your contributions!

---

Happy coding! 🚀
