import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Terminal, GitBranch, Star, Activity, AlertCircle, CheckCircle2 } from 'lucide-react';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import axios from 'axios';

export default function App() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  // Simulate progress bar during loading
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      setScanProgress(0);
      interval = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 95) return prev;
          return prev + Math.random() * 15;
        });
      }, 500);
    } else {
      setScanProgress(100);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setIsLoading(true);
    setError(null);
    setData(null);
    setIsScanning(true);

    try {
      // Send the URL to your custom backend
      const response = await axios.post(process.env.ANALYSIS_API, { githubUrl: url });
      
      // Handle the markdown data returned from your backend
      // Adjust 'response.data.markdown' if your backend sends the markdown in a different field
      setData(response.data.markdown || response.data || 'No analysis generated.');
    } catch (err: any) {
      console.error('Analysis error:', err);
      setError(err.response?.data?.error || err.message || 'Failed to analyze repository. Please check the URL and try again.');
    } finally {
      setIsLoading(false);
      setTimeout(() => setIsScanning(false), 2000); // Keep scan line for a bit after load
    }
  };

  return (
    <div className="min-h-screen relative font-sans selection:bg-[#00f0ff] selection:text-black">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#030303]">
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-[#8a2be2] rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-[50vw] h-[50vw] bg-[#00f0ff] rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[50vw] h-[50vw] bg-[#8a2be2] rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-blob animation-delay-4000"></div>
        <div className="bg-grid"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80"></div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-16 max-w-5xl flex flex-col items-center min-h-screen">
        
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12 w-full"
        >
          <div className="inline-flex items-center justify-center p-2 mb-6 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <Terminal className="w-5 h-5 text-[#00f0ff] mr-2" />
            <span className="text-sm font-mono text-gray-300 tracking-wider uppercase">Neural Codebase Analysis</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Decode Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] via-[#8a2be2] to-[#00f0ff] animate-pulse">
              Codebase
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-light">
            Enter a GitHub repository URL to initiate a deep-scan intelligence report. 
            Uncover vulnerabilities, architecture patterns, and quality metrics in seconds.
          </p>
        </motion.div>

        {/* Input Section */}
        <motion.form 
          onSubmit={handleAnalyze}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-3xl mb-16 relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-[#00f0ff] to-[#8a2be2] rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative flex items-center bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-2xl focus-within:border-[#00f0ff] focus-within:shadow-[0_0_20px_rgba(0,240,255,0.3),inset_0_0_10px_rgba(0,240,255,0.1)] transition-all duration-300">
            <div className="pl-4 pr-2 text-gray-500">
              <GitBranch className="w-6 h-6" />
            </div>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://github.com/username/repository"
              required
              className="flex-1 bg-transparent border-none outline-none text-white text-lg focus:ring-0 focus:outline-none placeholder-gray-600 font-mono py-4"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="cursor-pointer ml-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-medium transition-all duration-300 flex items-center border border-white/5 hover:border-[#00f0ff]/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Activity className="w-5 h-5 animate-spin text-[#00f0ff]" />
              ) : (
                <>
                  <Search className="w-5 h-5 mr-2 text-[#00f0ff]" />
                  Analyze
                </>
              )}
            </button>
          </div>
        </motion.form>

        {/* Loading State */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="w-full max-w-3xl mb-8"
            >
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-md relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-[#00f0ff] font-mono text-sm">
                    <Activity className="w-4 h-4 mr-2 animate-pulse" />
                    ESTABLISHING NEURAL LINK...
                  </div>
                  <div className="text-gray-400 font-mono text-sm">{Math.round(scanProgress)}%</div>
                </div>
                <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-[#00f0ff] to-[#8a2be2]"
                    initial={{ width: '0%' }}
                    animate={{ width: `${scanProgress}%` }}
                    transition={{ ease: "linear", duration: 0.5 }}
                  />
                </div>
                <div className="mt-4 space-y-2">
                  <div className="h-2 bg-gray-800 rounded w-3/4 animate-pulse"></div>
                  <div className="h-2 bg-gray-800 rounded w-1/2 animate-pulse delay-75"></div>
                  <div className="h-2 bg-gray-800 rounded w-5/6 animate-pulse delay-150"></div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error State */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-3xl mb-8 bg-red-500/10 border border-red-500/30 rounded-xl p-6 backdrop-blur-md flex items-start"
            >
              <AlertCircle className="w-6 h-6 text-red-400 mr-4 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-red-400 font-medium mb-1">Analysis Failed</h3>
                <p className="text-red-200/70 text-sm">{error}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results View */}
        <AnimatePresence>
          {data && !isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="w-full max-w-4xl relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-b from-[#00f0ff]/20 to-[#8a2be2]/20 rounded-2xl blur-sm"></div>
              <div className="bg-[#0a0a0a]/90 border border-white/10 rounded-2xl p-8 md:p-12 backdrop-blur-xl relative overflow-hidden shadow-2xl">
                
                {/* Scanning Animation Overlay */}
                {isScanning && <div className="scan-line"></div>}

                <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-8">
                  <div className="flex items-center">
                    <CheckCircle2 className="w-6 h-6 text-[#00f0ff] mr-3" />
                    <h2 className="text-2xl font-bold tracking-tight">Intelligence Report</h2>
                  </div>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                  </div>
                </div>

                <div className="markdown-body">
                  <Markdown
                    components={{
                      code({ node, inline, className, children, ...props }: any) {
                        const match = /language-(\w+)/.exec(className || '');
                        return !inline && match ? (
                          <SyntaxHighlighter
                            style={vscDarkPlus as any}
                            language={match[1]}
                            PreTag="div"
                            {...props}
                          >
                            {String(children).replace(/\n$/, '')}
                          </SyntaxHighlighter>
                        ) : (
                          <code className={className} {...props}>
                            {children}
                          </code>
                        );
                      }
                    }}
                  >
                    {data}
                  </Markdown>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </main>
    </div>
  );
}
