# RepoDecode

**RepoDecode** is a futuristic, high-performance frontend application designed to interface with a neural codebase analysis backend. It provides an immersive, cyberpunk-inspired dashboard for developers and security engineers to scan GitHub repositories, uncovering vulnerabilities, architecture patterns, and code quality metrics in real-time.

## 🚀 Features

- **Immersive UI/UX**: A dark, modern, and slick interface featuring animated glowing orbs, a 3D holographic grid, and smooth transitions.
- **Real-time Scanning Simulation**: Engaging loading states that simulate a deep neural link establishment while waiting for backend processing.
- **Markdown & Code Highlighting**: Beautifully rendered analysis reports with full markdown support and syntax-highlighted code blocks.
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile viewing.
- **Seamless Backend Integration**: Connects directly to your custom analysis API via Axios.

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Motion (Framer Motion)](https://motion.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Markdown Rendering**: `react-markdown` & `react-syntax-highlighter`

## 📦 Installation & Setup

### Prerequisites
Ensure you have [Node.js](https://nodejs.org/) (v18 or higher) and `npm` installed.

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/repodecode.git
cd repodecode
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure the Backend Endpoint
By default, the app sends a `POST` request to `/api/analyze`. If your backend is hosted elsewhere, update the Axios request URL in `src/App.tsx`:
```typescript
// src/App.tsx
const response = await axios.post('https://your-api-url.com/analyze', { url });
```

### 4. Run the development server
```bash
npm run dev
```
The application will be available at `http://localhost:3000`.

## 🏗️ Building for Production

To create a production-ready build:
```bash
npm run build
```
The optimized static files will be generated in the `dist/` directory.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/yourusername/repodecode/issues).

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
