'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Camera } from 'lucide-react';

export default function BoothSelection() {
  const router = useRouter();
  const [selectedShots, setSelectedShots] = useState(4);
  const [printFormat, setPrintFormat] = useState('strip'); // 'strip' or 'postcard'
  const [exitAnimation, setExitAnimation] = useState(false);
  const [showWatermark, setShowWatermark] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Watermark animation
  const watermarkVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Check for existing selection when component mounts
  useEffect(() => {
    // Try to get any previously saved selection from localStorage
    const savedShots = localStorage.getItem('selectedShots');
    if (savedShots) {
      setSelectedShots(parseInt(savedShots));
    }
  }, [setSelectedShots]);

  // Auto-switch format based on shot count
  useEffect(() => {
    if (selectedShots >= 5 && printFormat === 'strip') {
      setPrintFormat('postcard');
    }
  }, [selectedShots, printFormat]);

  const toggleWatermark = () => {
    setShowWatermark(prev => !prev);
  };

  const handleContinue = () => {
    if (selectedShots) {
      // Store the selected shot count and print format in localStorage
      localStorage.setItem('selectedShots', selectedShots.toString());
      localStorage.setItem('printFormat', printFormat);

      // Start exit animation and show loader
      setExitAnimation(true);
      setIsLoading(true);

      // Navigate to next page
      setTimeout(() => {
        router.push(`/instructions?shots=${selectedShots}`);
      }, 800);
    } else {
      alert("Please select the number of shots before continuing!");
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.6 } },
  };

  // Camera shutter animation
  const shutterVariants = {
    closed: { height: '100%' },
    open: { height: '0%' }
  };



  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background subtle gradient - from landing page */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white"></div>

      {/* Abstract camera elements - from landing page */}
      <motion.div
        className="absolute top-20 right-24 w-16 h-16 border-4 border-blue-500 rounded-full"
        animate={{
          scale: [1, 1.1, 1],
          borderColor: ['#3b82f6', '#8b5cf6', '#3b82f6']
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          className="absolute inset-2 bg-blue-200 rounded-full"
          animate={{
            scale: [0.8, 1, 0.8],
            backgroundColor: ['#bfdbfe', '#c7d2fe', '#bfdbfe']
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <motion.div
        className="absolute bottom-32 left-24 w-20 h-14 rounded border-2 border-purple-500"
        animate={{
          rotate: [0, 5, 0, -5, 0],
          borderColor: ['#8b5cf6', '#3b82f6', '#8b5cf6']
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          className="absolute top-0 left-0 right-0 bg-purple-300 origin-bottom"
          variants={shutterVariants}
          initial="closed"
          animate="open"
          transition={{ duration: 1, repeat: Infinity, repeatDelay: 5, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Camera flash effect */}
      <motion.div
        className="absolute inset-0 bg-white pointer-events-none"
        animate={{ opacity: [0, 0, 0.8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 5 }}
      />

      {/* Geometric decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-40 left-1/4 w-8 h-8 rounded bg-blue-300 opacity-40"
          animate={{
            y: [0, 30, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute bottom-40 right-1/4 w-12 h-12 rounded-full bg-purple-300 opacity-40"
          animate={{
            x: [0, -20, 0, 20, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute top-1/3 right-1/3 w-6 h-6 rotate-45 bg-blue-400 opacity-30"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Cute Camera Loader - Replacing the previous loader */}
      {isLoading && (
        <motion.div
          className="fixed inset-0 bg-white bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Cute Camera SVG with animations */}
            <motion.div
              className="relative"
              animate={{
                rotate: [0, 0, 5, -5, 0],
                scale: [1, 1.05, 1, 1.05, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {/* Camera body */}
              <motion.div className="w-20 h-16 bg-blue-500 rounded-lg relative">
                {/* Camera lens */}
                <motion.div
                  className="absolute top-4 left-4 w-12 h-12 bg-blue-700 rounded-full border-4 border-blue-300"
                  animate={{
                    scale: [1, 0.95, 1.05, 0.95, 1]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {/* Inner lens */}
                  <motion.div
                    className="absolute inset-2 bg-blue-900 rounded-full"
                    animate={{
                      scale: [0.8, 1, 0.8]
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {/* Lens reflection */}
                    <motion.div
                      className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full opacity-80"
                      animate={{
                        opacity: [0.7, 1, 0.7]
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity
                      }}
                    />
                  </motion.div>
                </motion.div>

                {/* Camera viewfinder */}
                <div className="absolute top-1 right-2 w-4 h-3 bg-blue-800 rounded-sm" />

                {/* Camera flash */}
                <motion.div
                  className="absolute top-1 left-1 w-2 h-2 bg-yellow-300 rounded-full"
                  animate={{
                    opacity: [0.5, 1, 0.5],
                    boxShadow: [
                      "0 0 0px rgba(253, 224, 71, 0.5)",
                      "0 0 8px rgba(253, 224, 71, 0.8)",
                      "0 0 0px rgba(253, 224, 71, 0.5)"
                    ]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                {/* Shutter button */}
                <motion.div
                  className="absolute -top-2 right-6 w-4 h-2 bg-red-500 rounded-full"
                  animate={{
                    y: [0, -2, 0]
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    repeatDelay: 1.2,
                    ease: "easeInOut"
                  }}
                />

                {/* Camera strap */}
                <div className="absolute -left-4 top-4 w-4 h-1.5 bg-blue-300 rounded-full" />
                <div className="absolute -right-4 top-4 w-4 h-1.5 bg-blue-300 rounded-full" />
              </motion.div>

              {/* Camera flash animation */}
              <motion.div
                className="absolute inset-0 bg-white rounded-lg"
                animate={{
                  opacity: [0, 0, 0.6, 0]
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: "easeInOut"
                }}
              />
            </motion.div>

            {/* Loading text */}
            <motion.p
              className="mt-6 text-blue-600 text-sm font-medium tracking-wide"
              animate={{
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <motion.span
                animate={{
                  opacity: [0, 1, 0],
                  // Replace 'steps(3)' with a valid easing type
                  transition: {
                    ease: "easeInOut", // Using a valid easing function
                    times: [0, 0.5, 1], // Control timing of opacity keyframes
                    repeat: Infinity,
                    duration: 1.5
                  }
                }}
              >
                Preparing your booth
              </motion.span>
            </motion.p>
          </motion.div>
        </motion.div>
      )}

      {/* Main content */}
      <motion.div
        className="z-10 max-w-md w-full bg-white rounded-lg shadow-md p-6 border border-blue-100"
        initial="hidden"
        animate={exitAnimation ? 'exit' : 'visible'}
        variants={fadeIn}
      >
        <motion.div variants={fadeIn} className="mb-6 text-center">
          <Camera size={24} className="text-blue-500 mx-auto mb-2" />
          <h1 className="text-2xl font-medium text-gray-800">Choose Your Experience</h1>
          <p className="text-gray-500 text-sm">
            Select how many photos you&apos;d like to capture
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col items-center justify-center mb-8"
          variants={fadeIn}
        >
          <div className="flex items-center gap-6">
            <motion.button
              onClick={() => setSelectedShots(prev => Math.max(1, prev - 1))}
              className="w-12 h-12 flex items-center justify-center rounded-full border border-blue-200 text-blue-500 hover:bg-blue-50 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </motion.button>

            <div className="flex flex-col items-center">
              <span className="text-6xl font-light text-blue-500 mb-1">{selectedShots}</span>
              <span className="text-xs text-gray-400 uppercase tracking-widest">Photos</span>
            </div>

            <motion.button
              onClick={() => setSelectedShots(prev => Math.min(8, prev + 1))}
              className="w-12 h-12 flex items-center justify-center rounded-full border border-blue-200 text-blue-500 hover:bg-blue-50 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </motion.button>
          </div>

          <div className="mt-6 w-full">
            <input
              type="range"
              min="1"
              max="8"
              value={selectedShots}
              onChange={(e) => setSelectedShots(parseInt(e.target.value))}
              className="w-full h-1.5 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <div className="flex justify-between mt-2 px-1">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                <span key={n} className={`text-[10px] ${selectedShots === n ? 'text-blue-500 font-bold' : 'text-gray-300'}`}>{n}</span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Print Format Selection */}
        <motion.div variants={fadeIn} className="mb-8 w-full">
          <h3 className="text-sm font-medium text-gray-700 mb-4 text-center uppercase tracking-wider">Choose printing size</h3>
          <div className="grid grid-cols-1 gap-3">
            <button
              onClick={() => setPrintFormat("strip")}
              disabled={selectedShots >= 5}
              className={`flex flex-col items-start p-4 rounded-xl border text-left transition-all ${selectedShots >= 5
                ? "border-gray-100 bg-gray-50 opacity-60 cursor-not-allowed"
                : printFormat === "strip"
                  ? "border-blue-500 bg-blue-50 shadow-sm"
                  : "border-gray-100 bg-white hover:border-gray-200"
                }`}
            >
              <div className="flex items-center mb-1">
                <div className={`w-4 h-4 rounded-full mr-3 flex items-center justify-center border ${selectedShots >= 5
                  ? "border-gray-200"
                  : printFormat === "strip"
                    ? "border-blue-500"
                    : "border-gray-300"
                  }`}>
                  {printFormat === "strip" && selectedShots < 5 && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                </div>
                <span className={`text-sm font-bold ${selectedShots >= 5
                  ? "text-gray-400"
                  : printFormat === "strip"
                    ? "text-blue-700"
                    : "text-gray-700"
                  }`}>Strip</span>
              </div>
              <p className="text-[11px] text-gray-500 leading-relaxed ml-7">
                {selectedShots >= 5
                  ? "Strip just for 4 shots or less"
                  : "Size 2x6 inch, common for instant camera."}
              </p>
            </button>

            <button
              onClick={() => setPrintFormat("postcard")}
              className={`flex flex-col items-start p-4 rounded-xl border text-left transition-all ${printFormat === "postcard" ? "border-blue-500 bg-blue-50 shadow-sm" : "border-gray-100 bg-white hover:border-gray-200"}`}
            >
              <div className="flex items-center mb-1">
                <div className={`w-4 h-4 rounded-full mr-3 flex items-center justify-center border ${printFormat === "postcard" ? "border-blue-500" : "border-gray-300"}`}>
                  {printFormat === "postcard" && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                </div>
                <span className={`text-sm font-bold ${printFormat === "postcard" ? "text-blue-700" : "text-gray-700"}`}>Postcard</span>
              </div>
              <p className="text-[11px] text-gray-500 leading-relaxed ml-7">
                Size 4x6 inch, standard postcard size.
              </p>
            </button>
          </div>
        </motion.div>

        <motion.button
          onClick={handleContinue}
          disabled={!selectedShots}
          className={`w-full py-3 rounded-md text-sm font-medium transition-all ${selectedShots
            ? 'bg-blue-500 text-white hover:bg-blue-600'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          variants={fadeIn}
          whileHover={selectedShots ? { scale: 1.01 } : {}}
          whileTap={selectedShots ? { scale: 0.99 } : {}}
        >
          Continue to Booth
          {selectedShots && (
            <span className="ml-1 inline-flex items-center">

            </span>
          )}
        </motion.button>
      </motion.div>

      <motion.div
        className="mt-4 text-xs text-blue-500 text-center z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 0.8 }}
      >
        Photos will be stored temporarily and available for download after your session
      </motion.div>

      {/* Elevate Icon in Bottom Right - Highlighted */}
      <motion.div
        className="absolute bottom-6 right-6 z-20 cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleWatermark}
      >
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-full shadow-lg flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </div>
      </motion.div>

      {/* Watermark Overlay with 50% Transparency */}
      {showWatermark && (
        <motion.div
          className="absolute inset-0 bg-opacity-50 flex items-center justify-center z-30 backdrop-blur-sm"
          initial="hidden"
          animate="visible"
          variants={watermarkVariants}
          transition={{ duration: 0.5 }}
          onClick={toggleWatermark}
        >
          <motion.div
            className="bg-white bg-opacity-90 backdrop-blur-md rounded-xl p-8 max-w-md text-black shadow-xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2">Created By</h2>
              <p className="text-xl mb-4">PhucTran</p>
              <div className="bg-black h-px w-32 mx-auto mb-4 opacity-70"></div>
              <p className="text-black text-opacity-90 mb-6">
                Full Stack Developer.
              </p>
            </div>

            {/* Contact Information Section */}
            <div className="mt-2">
              <p className="text-black text-opacity-90 font-medium mb-3 text-center">Get in Touch</p>

              {/* Email */}
              <div className="flex items-center mb-2 justify-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <p className="text-black text-opacity-80">haizzzzzzz123123@gmail.com</p>
              </div>

              {/* Phone */}
              <div className="flex items-center mb-4 justify-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <p className="text-black text-opacity-80">+84 862 318 819</p>
              </div>

              {/* Social Media Icons */}
              <div className="flex justify-center space-x-6 mt-2">
                {/* Instagram */}
                <a target="_blank" href="https://www.instagram.com/nor__2602/" className="text-black hover:text-blue-500 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>

                </a>

                {/* Facebook */}
                <a target="_blank" href="https://www.facebook.com/PhucTran.2602" className="text-black hover:text-blue-500 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </a>

                {/* Github */}
                <a href="https://github.com/Nor262" className="text-black hover:text-blue-500 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a href="https://www.linkedin.com/in/ph%C3%BAc-tr%E1%BA%A7n-640286342/" className="text-black hover:text-blue-500 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                  </svg>
                </a>
              </div>
            </div>

            <p className="text-black text-opacity-70 text-sm mt-6 text-center">
              Tap anywhere to close
            </p>
          </motion.div>
        </motion.div>
      )}
    </main>
  );
}