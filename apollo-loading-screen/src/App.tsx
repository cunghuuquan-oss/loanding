import { motion } from 'motion/react';
import React, { useState, useEffect } from 'react';

// Colors matched from the provided Apollo logo
const C_DARK_BLUE = '#376ab3';
const C_LIGHT_BLUE = '#2ab0e5';

const ApolloLogoMark = () => {
  return (
    <motion.img
      src="/logo.svg"
      alt="Apollo Logo"
      className="w-[600px] h-auto drop-shadow-sm mb-4"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1, rotate: 360 }}
      transition={{ 
        opacity: { duration: 0.8, ease: "easeOut" },
        scale: { duration: 0.8, ease: "easeOut" },
        rotate: { duration: 45, repeat: Infinity, ease: "linear" }
      }}
    />
  );
};

export default function App() {
  const [progress, setProgress] = useState(0);

  // Simulate dynamic loading progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Increment mostly smoothly
        return p + Math.random() * 8 + 2; 
      });
    }, 250);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center relative overflow-hidden font-sans select-none">
      
      {/* Decorative Background Accents */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-60 z-0 pointer-events-none"></div>
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-rose-100 rounded-full blur-3xl opacity-60 z-0 pointer-events-none"></div>

      {/* Main Logo and Typography */}
      <motion.div 
        className="flex flex-col items-center z-10"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <ApolloLogoMark />

        <motion.div 
          className="text-5xl md:text-[5rem] font-black tracking-tight uppercase mt-2 mb-8"
          style={{ color: '#376ab3' }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        >
          APOLLO
        </motion.div>
      </motion.div>

      {/* Interactive Progress Bar */}
      <motion.div 
        className="mt-20 flex flex-col w-full max-w-[320px] px-6 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <div className="flex justify-between items-end mb-3 px-1 text-[#5b51d8]">
          <motion.span
            className="text-xs font-bold italic opacity-80"
             animate={{ opacity: [0.6, 1, 0.6] }}
             transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
             Initializing System...
          </motion.span>
          <span className="text-sm font-bold">{Math.floor(Math.min(progress, 100))}%</span>
        </div>
        
        <div className="w-full h-2 bg-indigo-100 rounded-full overflow-hidden relative">
          <motion.div 
            className="absolute left-0 top-0 h-full bg-[#5b51d8]"
            initial={{ width: "0%" }}
            animate={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ ease: "circOut" }}
          />
        </div>
      </motion.div>

      {/* Bottom Status Text */}
      <motion.div 
        className="absolute bottom-8 md:bottom-12 flex flex-col md:flex-row items-center gap-4 md:gap-6 text-slate-400 text-[10px] md:text-xs font-medium uppercase tracking-[0.2em] z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]"></div>
          Secure System Connected
        </div>
        <div className="hidden md:block w-1 h-1 bg-slate-300 rounded-full"></div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]"></div>
          Platform Active
        </div>
      </motion.div>

      {/* Subtle Side Branding */}
      <motion.div 
        className="hidden lg:block absolute right-12 top-1/2 -rotate-90 origin-right translate-y-1/2 text-slate-300 font-bold tracking-[0.5em] text-[10px] whitespace-nowrap uppercase z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        Enterprise Identity Platform
      </motion.div>

    </div>
  );
}
