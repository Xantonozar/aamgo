'use client'
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export default function NotFound() {
  // Typing effect for the main message
  const message = "Our designer is too tired to code the pages.";
  const [typed, setTyped] = useState("");
  const idx = useRef(0);

  useEffect(() => {
    if (idx.current < message.length) {
      const timeout = setTimeout(() => {
        setTyped((prev) => prev + message[idx.current]);
        idx.current += 1;
      }, 60);
      return () => clearTimeout(timeout);
    }
  }, [typed]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8f4e9] px-4 relative overflow-hidden">
      {/* Animated background mango icon */}
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none opacity-10 animate-pulse">
        <Image src="/mangoes/logo2.png" alt="Mango" width={300} height={300} className="mx-auto animate-bounce" />
      </div>
      <div className="relative z-10 flex flex-col items-center">
        {/* Animated 404 icon */}
        <div className="mb-8">
          <svg className="h-32 w-32 text-[#FDBE02] animate-spin-slow hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" stroke="#FDBE02" strokeWidth="8" fill="#fffbe7" />
            <text x="50" y="60" textAnchor="middle" fontSize="40" fill="#f57f17" fontWeight="bold">404</text>
          </svg>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-[#f57f17] mb-4 animate-fade-in">Page Not Found</h1>
        <p className="text-lg md:text-xl text-[#333333] mb-8 font-mono animate-typing border-r-2 border-[#f57f17] pr-2 whitespace-nowrap">
          {typed}
        </p>
        <Link href="/" className="inline-flex items-center px-6 py-3 rounded-full bg-[#f57f17] text-white font-semibold shadow-lg hover:bg-[#FDBE02] hover:text-[#333333] transition-all duration-300 group">
          <span className="mr-2 group-hover:translate-x-1 transition-transform duration-300">Go Home</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
      {/* Custom CSS for typing effect */}
      <style jsx>{`
        .animate-typing {
          overflow: hidden;
          border-right: .15em solid #f57f17;
          white-space: nowrap;
          animation: blink-caret 1s step-end infinite;
        }
        @keyframes blink-caret {
          from, to { border-color: transparent }
          50% { border-color: #f57f17; }
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-in;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-spin-slow {
          animation: spin 4s linear infinite;
        }
        @keyframes spin {
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
} 