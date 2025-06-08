"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

export default function VideoHero() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [videoError, setVideoError] = useState(false);
  
  // Detect scroll for arrow animation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <section className="relative h-[90vh] min-h-[650px] w-full overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        {/* Fallback Image (shown before video loads or on mobile) */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=1974"
            alt="Mango orchard background"
            fill
            className="object-cover"
            priority
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1605027990121-cbae9e0642df?q=80&w=1970";
            }}
          />
        </div>
        
        {/* Video (hidden on small devices to save bandwidth) */}
        <div className="absolute inset-0 hidden md:block">
          <video 
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay 
            muted 
            loop 
            playsInline
            onError={() => setVideoError(true)}
          >
            <source 
              src="https://storage.googleapis.com/gweb-uniblog-publish-prod/original_videos/Flagship_Trailer_V5_3.mp4" 
              type="video/mp4" 
            />
            Your browser does not support the video tag.
          </video>
        </div>
        
        {/* Overlay Gradient - Using the specified brand colors */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#f57f17]/80 to-[#FDBE02]/70 mix-blend-multiply"></div>
        
        {/* Texture Overlay (adds subtle pattern) */}
        <div className="absolute inset-0 opacity-20 mix-blend-overlay">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <filter id="noise">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
              <feBlend mode="screen" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noise)" />
          </svg>
        </div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 h-full flex flex-col justify-center relative z-10">
        <div className="max-w-3xl" data-aos="fade-up">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Have an  <span className="text-[#d00031] drop-shadow-md">আম</span><br/>on the  <span className="text-[#d00031] drop-shadow-md">GO</span>
          </h1>
          <p className="text-white/90 text-lg md:text-xl mb-8 max-w-2xl">
            Explore our exceptional collection of hand-picked, premium mangoes sourced directly from sustainable orchards around the world.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link 
              href="#product-grid" 
              className="inline-flex items-center bg-white text-[#f57f17] px-8 py-4 rounded-full font-bold hover:bg-[#f8f4e9] transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Explore Our Collection
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
            <Link 
              href="#premium-varieties" 
              className="inline-flex items-center border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-all duration-300"
            >
              Premium Varieties
            </Link>
          </div>
        </div>
      </div>
      
      {/* Animated Scroll Down - Improved animation */}
      <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-center transition-all duration-500 ${isScrolled ? 'opacity-0 translate-y-5' : 'opacity-100'}`}>
        <div className="flex flex-col items-center animate-bounce">
          <span className="text-sm mb-2 font-medium">Scroll Down</span>
          <ChevronDownIcon className="h-6 w-6" />
        </div>
      </div>
      
      {/* Wave Separator - Smoother wave */}
      <div className="absolute bottom-0 left-0 right-0 w-full h-20 overflow-hidden">
        <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="h-full w-full">
          <path d="M0.00,49.98 C150.00,150.00 349.20,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" 
            className="fill-white"></path>
        </svg>
      </div>
    </section>
  );
} 