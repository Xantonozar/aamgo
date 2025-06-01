"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

export default function HeroSection() {
  // Carousel item data with corresponding offers and product details
  const carouselItems = [
    {
      image: {
        src: "https://images.pexels.com/photos/2363347/pexels-photo-2363347.jpeg?auto=compress&cs=tinysrgb&w=1600",
        alt: "Fresh mangoes on wooden table"
      },
      offer: {
        label: "Special Offer",
        discount: "20% OFF",
        subtext: "On first order"
      },
      product: {
        name: "Himsagar Mango",
        image: "https://images.pexels.com/photos/918643/pexels-photo-918643.jpeg?auto=compress&cs=tinysrgb&w=1000",
        rating: 5,
        badge: "Sweetest"
      }
    },
    {
      image: {
        src: "https://images.pexels.com/photos/4412924/pexels-photo-4412924.jpeg?auto=compress&cs=tinysrgb&w=1600",
        alt: "Mango slices"
      },
      offer: {
        label: "Limited Time",
        discount: "Few Days Remaining",
        subtext: "This weekend only"
      },
      product: {
        name: "gopalvog Mango",
        image: "https://images.pexels.com/photos/4393436/pexels-photo-4393436.jpeg?auto=compress&cs=tinysrgb&w=1000",
        rating: 4.5,
        badge: "Premium"
      }
    },
    {
      image: {
        src: "https://images.pexels.com/photos/2294471/pexels-photo-2294471.jpeg?auto=compress&cs=tinysrgb&w=1600",
        alt: "Mango farm harvest"
      },
      offer: {
        label: "Prebooking purchase",
        discount: "6KG FREE",
        subtext: "Minimum 40kg order"
      },
      product: {
        name: "Langra Mango",
        image: "https://images.pexels.com/photos/4022220/pexels-photo-4022220.jpeg?auto=compress&cs=tinysrgb&w=1000", 
        rating: 4,
        badge: "Coming Soon"
      }
    },
    {
      image: {
        src: "https://images.pexels.com/photos/918643/pexels-photo-918643.jpeg?auto=compress&cs=tinysrgb&w=1600",
        alt: "Mango close up"
      },
      offer: {
        label: "New Season",
        discount: "Stock Loading",
        subtext: "Please wait"
      },
      product: {
        name: "Amropali Mango",
        image: "https://images.pexels.com/photos/5946081/pexels-photo-5946081.jpeg?auto=compress&cs=tinysrgb&w=1000",
        rating: 5,
        badge: "Harvestinng in Tree"
      }
    }
  ];
  
  // State to track current item index
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // States for mouse position tracking
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const sectionRef = useRef(null);
  
  // Handle mouse movement for background effect
  const handleMouseMove = (e) => {
    if (!sectionRef.current) return;
    
    const rect = sectionRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setMousePosition({ x, y });
  };
  
  // Auto rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change every 5 seconds
    
    return () => clearInterval(interval);
  }, [carouselItems.length]);
  
  // Navigate to previous item
  const prevItem = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? carouselItems.length - 1 : prevIndex - 1
    );
  };
  
  // Navigate to next item
  const nextItem = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Get current item data
  const currentItem = carouselItems[currentIndex];

  return (
    <div 
      ref={sectionRef}
      className="relative min-h-[90vh] w-full overflow-hidden bg-[#fff6e5] transition-all duration-700"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Interactive background gradient that follows mouse */}
      <div 
        className={`absolute inset-0 bg-gradient-radial from-[#f9a825]/30 via-transparent to-transparent pointer-events-none transition-all duration-700 ${isHovering ? 'opacity-100' : 'opacity-0'}`}
        style={{
          backgroundSize: '50% 50%',
          backgroundPosition: `${mousePosition.x}% ${mousePosition.y}%`,
          transform: `scale(${isHovering ? 1.5 : 1})`,
        }}
      ></div>

      {/* CSS-based dot pattern background */}
      <div 
        className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${isHovering ? 'opacity-10' : 'opacity-0'}`}
        style={{
          backgroundImage: 'radial-gradient(#f57f17 2px, transparent 2px), radial-gradient(#f9a825 2px, transparent 2px)',
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0, 20px 20px',
          transition: 'all 0.5s ease-in-out',
          transform: `scale(${isHovering ? 1.1 : 1})`,
        }}
      ></div>

      {/* Glow effect that follows cursor */}
      <div 
        className="absolute pointer-events-none blur-[80px] w-[200px] h-[200px] rounded-full transition-opacity duration-500"
        style={{
          background: 'radial-gradient(circle, rgba(249,168,37,0.5) 0%, rgba(245,127,23,0.2) 70%, transparent 100%)',
          left: `calc(${mousePosition.x}% - 100px)`,
          top: `calc(${mousePosition.y}% - 100px)`,
          opacity: isHovering ? 0.8 : 0,
          transition: 'opacity 0.5s ease-out, transform 0.1s ease-out',
          transform: `scale(${isHovering ? 1.2 : 0.8})`,
        }}
      ></div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-24 h-24 md:w-32 md:h-32 rounded-full bg-[#f9a825]/20 animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-16 h-16 md:w-24 md:h-24 rounded-full bg-[#f57f17]/10 animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#f9a825]/10 animate-bounce duration-1000 hidden sm:block"></div>
      <div className="absolute top-1/3 right-1/3 w-8 h-8 md:w-12 md:h-12 rounded-full bg-[#f57f17]/5 animate-ping duration-700 hidden md:block"></div>
      
      {/* Main container */}
      <div className="container mx-auto px-4 sm:px-6 h-full py-12 md:py-10 relative z-10 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 h-full items-center">
          {/* Left content column */}
          <div className="order-1 lg:order-1 pt-4 lg:pt-0 md:max-w-3xl mx-auto lg:mx-0">
            <div className="inline-block px-4 py-2 rounded-full bg-[#f57f17]/10 text-[#f57f17] font-medium text-sm md:text-base mb-4 md:mb-6 hover:bg-[#f57f17]/20 hover:scale-105 transition-all duration-300 cursor-default">
              Premium Quality Mangoes
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl font-bold text-[#333333] mb-6 md:mb-8 leading-tight tracking-tight">
              Sweet & Juicy <br />
              <span className="text-[#f57f17] mb-4 md:mb-o relative inline-block hover:animate-pulse transition-all duration-300">
                Mangoes
                <span className="absolute -bottom-2 left-0 w-full h-1.5 bg-[#f57f17]/30 transform origin-left hover:scale-x-110 transition-transform duration-300"></span>
              </span> <br/>Delivered <br /> 
              To Your Door
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-[#555555] mb-8 md:mb-10 max-w-2xl hover:text-[#333333] transition-colors duration-300 leading-relaxed">
              Experience the delicious taste of hand-picked, farm-fresh mangoes grown from আমGO.
            </p>
            
            <div className="flex flex-row gap-4 sm:gap-5">
              <Link 
                href="/shop" 
                className="inline-flex items-center justify-center bg-[#f57f17] text-white font-semibold px-6 md:px-8 py-3 md:py-4 rounded-lg hover:bg-[#e65100] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 overflow-hidden group relative text-base md:text-lg whitespace-nowrap"
              >
                <span className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                <span className="relative z-10 flex items-center">
                  Shop Now
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              </Link>
              <Link 
                href="/blog" 
                className="inline-flex items-center justify-center bg-white text-[#333333] font-semibold px-6 md:px-8 py-3 md:py-4 rounded-lg border border-[#e0e0e0] hover:border-[#f57f17] hover:text-[#f57f17] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 hover:scale-105 group text-base md:text-lg whitespace-nowrap"
              >
                <span className="relative z-10 flex items-center">
                 আমGOPEDIA
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 ml-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                </span>
              </Link>
            </div>
            
            {/* Trust indicators */}
            <div className="flex flex-wrap items-center gap-6 md:gap-10 mt-10 md:mt-14">
              <div className="flex items-center transform hover:scale-110 transition-transform duration-300 cursor-pointer hover:text-[#333333]">
                <div className="text-[#f9a825] mr-2 md:mr-3 transform transition-transform duration-300 hover:rotate-12">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                </div>
                <span className="text-xs md:text-sm font-medium text-[#555555] group-hover:text-[#333333] transition-colors duration-300">Premium Quality</span>
              </div>
              <div className="flex items-center transform hover:scale-110 transition-transform duration-300 cursor-pointer">
                <div className="text-[#f9a825] mr-2 md:mr-3 transform transition-transform duration-300 hover:rotate-12">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
                  </svg>
                </div>
                <span className="text-xs md:text-sm font-medium text-[#555555] hover:text-[#333333] transition-colors duration-300">100% Organic</span>
              </div>
              <div className="flex items-center transform hover:scale-110 transition-transform duration-300 cursor-pointer">
                <div className="text-[#f9a825] mr-2 md:mr-3 transform transition-transform duration-300 hover:rotate-12">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z" />
                  </svg>
                </div>
                <span className="text-xs md:text-sm font-medium text-[#555555] hover:text-[#333333] transition-colors duration-300">Fast Delivery</span>
              </div>
            </div>
          </div>
          
          {/* Right image column with carousel */}
          <div className="order-2 lg:order-2 relative mb-4 lg:mb-0 transform transition-all duration-500 hover:scale-[1.02]">
            <div className="relative h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] w-full rounded-xl md:rounded-3xl overflow-hidden shadow-xl md:shadow-2xl transition-all duration-500 hover:shadow-[0_20px_50px_rgba(245,127,23,0.3)]">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#f57f17]/20 z-10 transition-opacity duration-300 hover:opacity-75"></div>
              
              {/* Carousel images */}
              {carouselItems.map((item, index) => (
                <div 
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    index === currentIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{ zIndex: index === currentIndex ? 1 : 0 }}
                >
                  <Image 
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    priority={index === 0}
                    style={{objectFit: 'cover'}}
                    className="transition-transform duration-700 hover:scale-110"
                  />
                </div>
              ))}
              
              {/* Carousel navigation arrows */}
              <button 
                onClick={prevItem} 
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/50 hover:bg-white/80 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none"
                aria-label="Previous image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-6 md:w-6 text-[#333333]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                onClick={nextItem} 
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/50 hover:bg-white/80 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none"
                aria-label="Next image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-6 md:w-6 text-[#333333]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              {/* Carousel indicators */}
              <div className="absolute bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-1 md:space-x-2">
                {carouselItems.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex 
                        ? 'bg-white w-4 md:w-6' 
                        : 'bg-white/50 hover:bg-white/80'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
            
            {/* Floating price badge - dynamically changes with carousel */}
            <div className="absolute top-3 right-3 md:top-10 md:right-10 bg-white p-2 md:p-4 rounded-xl md:rounded-2xl shadow-lg md:shadow-xl z-20 transition-all duration-500 hover:shadow-2xl hover:scale-110 cursor-pointer">
              <div className="text-[10px] md:text-xs text-[#f57f17] font-medium uppercase tracking-wider">{currentItem.offer.label}</div>
              <div className="text-lg md:text-2xl font-bold text-[#333333] group">
                <span className="inline-block transition-transform duration-300 hover:scale-110 hover:text-[#f57f17]">{currentItem.offer.discount}</span>
              </div>
              <div className="text-[8px] md:text-xs text-[#555555]">{currentItem.offer.subtext}</div>
            </div>
            
            {/* Floating product badge - dynamically changes with carousel */}
            <div className="absolute -bottom-4 -left-4 md:-bottom-5 md:-left-5 bg-white p-2 md:p-4 rounded-xl md:rounded-2xl shadow-lg md:shadow-xl z-20 flex items-center transition-all duration-500 hover:shadow-2xl hover:scale-105 cursor-pointer">
              <div className="h-12 w-12 md:h-16 md:w-16 relative rounded-lg md:rounded-xl overflow-hidden mr-2 md:mr-3 transition-transform duration-500 hover:scale-105 group">
                <div className="absolute inset-0 bg-[#f57f17]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                <Image 
                  src={currentItem.product.image}
                  alt={currentItem.product.name}
                  fill
                  style={{objectFit: 'cover'}}
                  className="transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div>
                <div className="text-xs md:text-sm font-medium text-[#333333] hover:text-[#f57f17] transition-colors duration-300">{currentItem.product.name}</div>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      xmlns="http://www.w3.org/2000/svg" 
                      className={`h-2 w-2 md:h-3 md:w-3 ${i < currentItem.product.rating ? 'text-[#f9a825]' : 'text-gray-300'} hover:text-[#f57f17] transition-colors duration-300`} 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-[8px] md:text-xs text-[#555555] ml-1 hover:text-[#f57f17] transition-colors duration-300">{currentItem.product.badge}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 