# MediaFlow - Universal Media Player

A modern, elegant universal media player built with Next.js that supports video, audio, images, and PDF files. Play large movie files (including MKV format) directly from your local disk without loading them entirely into memory.

![MediaFlow](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## ✨ Features

- **Universal Media Support**
  - 🎬 Video: MP4, MKV, AVI, MOV, WebM, FLV, WMV, and more
  - 🎵 Audio: MP3, WAV, OGG, AAC, FLAC, M4A
  - 🖼️ Images: JPG, PNG, GIF, WebP, SVG
  - 📄 PDF: Native PDF viewing with zoom controls

- **Advanced Video Player**
  - Customizable screen size (Fit, Fill, Original)
  - Playback speed control (0.5x - 2x)
  - Skip forward/backward 10 seconds
  - Fullscreen support
  - Smooth scrubbing and volume control
  - Auto-hide controls during playback

- **Optimized for Large Files**
  - Streams directly from disk without loading entire file into memory
  - Handles 10GB+ video files smoothly
  - Progressive loading for instant playback

- **Modern UI/UX**
  - Clean, minimalist design
  - Dark and light theme support
  - Smooth animations and transitions
  - Responsive across all devices
  - Keyboard shortcuts

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/BimleshRB/mediaflow.git
cd mediaflow
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Run the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎯 Usage

1. Click on the file type card (Video, Audio, Image, or PDF) or drag and drop files
2. Select your media file from your local disk
3. Enjoy playback with full controls
4. Use the close button to select a different file

### Keyboard Shortcuts

- **Space**: Play/Pause
- **F**: Toggle fullscreen
- **Arrow Left**: Skip backward 10s
- **Arrow Right**: Skip forward 10s
- **Arrow Up**: Increase volume
- **Arrow Down**: Decrease volume

## 🛠️ Built With

- **[Next.js 16](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Styling
- **[shadcn/ui](https://ui.shadcn.com/)** - UI components
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Theme management
- **[Lucide Icons](https://lucide.dev/)** - Beautiful icons

## 📂 Project Structure

```
mediaflow/
├── app/
│   ├── layout.tsx          # Root layout with theme provider
│   ├── page.tsx            # Main page with file selection
│   └── globals.css         # Global styles and theme tokens
├── components/
│   ├── file-uploader.tsx   # File selection interface
│   ├── media-player.tsx    # Main media player component
│   ├── video-player.tsx    # Video player with controls
│   ├── audio-player.tsx    # Audio player with controls
│   ├── image-viewer.tsx    # Image viewer with zoom/rotate
│   ├── pdf-viewer.tsx      # PDF viewer
│   ├── theme-provider.tsx  # Theme context provider
│   └── ui/                 # shadcn/ui components
└── public/                 # Static assets
```

## 🤝 Contributing

Contributions are welcome! This is an open source project, and we'd love your help to make it better.

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

### Ways to Contribute

- 🐛 Report bugs
- 💡 Suggest new features
- 📝 Improve documentation
- 🎨 Enhance UI/UX
- ⚡ Optimize performance
- 🧪 Add tests

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

**Bimlesh Kumar**

- LinkedIn: [bimlesh-kumar-iiitbh-cse](https://www.linkedin.com/in/bimlesh-kumar-iiitbh-cse/)
- GitHub: [@BimleshRB](https://github.com/BimleshRB)
- Portfolio: [portfolio-jade-chi-50.vercel.app](https://portfolio-jade-chi-50.vercel.app/)

## 🙏 Acknowledgments

- Thanks to all contributors who help improve this project
- Inspired by modern media players like VLC, Apple Music, and Spotify
- Built with amazing open source tools and libraries

## 📧 Support

If you have any questions or need help, feel free to:
- Open an issue on GitHub
- Contact me via LinkedIn
- Check out the [documentation](docs/)

---

Made with ❤️ by Bimlesh Kumar
