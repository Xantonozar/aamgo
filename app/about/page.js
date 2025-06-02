"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function AboutPage() {
  // Animation on scroll effect with Intersection Observer
  const [isVisible, setIsVisible] = useState({
    history: false,
    mission: false,
    team: false,
    farming: false,
    stats: false
  });
  
  // Animation variants for different sections
  const [animationVariant, setAnimationVariant] = useState({
    history: 'fadeIn',
    mission: 'slideUp',
    team: 'fadeScale',
    farming: 'slideRight',
    stats: 'popIn'
  });
  
  // Scroll progress indicator
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Refs for sections
  const sectionRefs = {
    history: useRef(null),
    mission: useRef(null),
    team: useRef(null),
    farming: useRef(null),
    stats: useRef(null)
  };

  useEffect(() => {
    // Scroll progress handler
    const handleScrollProgress = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    
    // Create intersection observers for each section
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15 // Trigger when 15% of the element is visible
    };
    
    const observers = [];
    const sections = ['history', 'mission', 'team', 'farming', 'stats'];
    
    sections.forEach(section => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [section]: true
            }));
            // Add staggered animation for child elements
            const childElements = entry.target.querySelectorAll('.animate-stagger');
            childElements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add('animated');
              }, 150 * index);
            });
          }
        });
      }, observerOptions);
      
      const element = document.getElementById(section);
      if (element) {
        observer.observe(element);
        observers.push(observer);
      }
    });
    
    // Add scroll event listener for progress bar
    window.addEventListener('scroll', handleScrollProgress);
    // Trigger once on load
    handleScrollProgress();
    
    return () => {
      observers.forEach(observer => observer.disconnect());
      window.removeEventListener('scroll', handleScrollProgress);
    };
  }, []);
  
  // Mouse position effect for hero section
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      setMousePosition({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  

  // Team members data
  const teamMembers = [
    {
      id: 1,
      name: 'Motasim MIsbah Mredul',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1000',
      bio: 'Misbah founded আমGO with a vision to bring premium mangoes to customers worldwide.',
    },
    {
      id: 2,
      name: 'Salman Ahmed Zadid',
      role: 'CO founder and Oparation Asssistant ',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000',
      bio: 'Salman oensure our website , content remain qualityfull.',
    },
    {
      id: 3,
      name: 'Md Shuvo Hasan JOy',
      role: 'Quality Assurance Manager',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000',
      bio: 'Shuvo ensures that only the finest mangoes make it to your doorstep, maintaining our high standards of quality.',
    },
    {
      id: 4,
      name: 'Imtiaz  Ahmed',
      role: 'Overall Oparator ',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000',
      bio: 'Imtiaz take lead where we need aid and look after the overall missing pieces.',
    },
  ];

  // Stats data
  const stats = [
    { id: 1, value: '1+', label: 'Years of Experience', icon: '🌱' },
    { id: 2, value: '5', label: 'Mango Varieties', icon: '🥭' },
    { id: 3, value: '10+', label: 'Happy Customers', icon: '😊' },
    { id: 4, value: '2+', label: 'District Served', icon: '🌎' },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Scroll Progress Indicator */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-[#FDBE02] to-[#F57F17] z-50 transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      ></div>
      
      {/* Hero Section */}
      <section className="relative min-h-[100vh] w-full overflow-hidden bg-gradient-to-b from-[#fff6e5] to-white transition-all duration-700">
        {/* Modern geometric background */}
        <div className="absolute inset-0 pointer-events-none">
          <svg className="w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="grid-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f57f17" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#FDBE02" stopOpacity="0.3" />
              </linearGradient>
              <pattern id="grid-pattern" width="8" height="8" patternUnits="userSpaceOnUse">
                <path d="M 8 0 L 0 0 0 8" fill="none" stroke="url(#grid-gradient)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid-pattern)" />
          </svg>
        </div>
        
        {/* Animated shapes */}
        <div 
          className="absolute top-20 right-20 w-32 h-32 md:w-40 md:h-40 opacity-20"
          style={{
            transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        >
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#F57F17" d="M40.8,-62.5C52.1,-55.1,60.3,-42.3,65.7,-28.5C71.1,-14.7,73.7,0.1,70.8,13.8C67.9,27.5,59.5,40.1,48.2,49.6C36.9,59.1,22.7,65.5,7.8,69.1C-7.1,72.7,-22.7,73.5,-35.6,67.6C-48.5,61.7,-58.7,49.1,-65.2,35.2C-71.7,21.3,-74.5,6.1,-72.2,-8.1C-69.9,-22.3,-62.5,-35.5,-51.9,-43.5C-41.3,-51.5,-27.5,-54.3,-14.6,-57.9C-1.7,-61.5,10.3,-65.9,22.9,-66.1C35.5,-66.3,48.7,-62.3,60.3,-54.1Z" transform="translate(100 100)" className="animate-morph">
              <animateTransform attributeName="transform" type="rotate" from="0 100 100" to="360 100 100" dur="60s" repeatCount="indefinite" />
            </path>
          </svg>
        </div>
        
        <div 
          className="absolute bottom-20 left-20 w-24 h-24 md:w-32 md:h-32 opacity-20"
          style={{
            transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        >
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#FDBE02" d="M47.7,-73.2C59.5,-65.3,65.9,-48.5,70.4,-32.5C74.9,-16.5,77.5,-1.3,74.2,12.3C70.9,25.9,61.8,37.9,50.6,47.4C39.4,56.9,26.1,63.8,11.4,68.1C-3.3,72.3,-19.4,73.9,-33.2,68.7C-47,63.5,-58.5,51.5,-65.7,37.5C-72.9,23.5,-75.8,7.5,-73.2,-7.5C-70.6,-22.5,-62.5,-36.5,-51.2,-44.9C-39.9,-53.3,-25.4,-56.1,-11.1,-61.1C3.2,-66.1,17.4,-73.3,31.9,-74.8C46.5,-76.3,61.3,-72.1,76.1,-62.1Z" transform="translate(100 100)" className="animate-morph-reverse">
              <animateTransform attributeName="transform" type="rotate" from="360 100 100" to="0 100 100" dur="50s" repeatCount="indefinite" />
            </path>
          </svg>
        </div>
        
        {/* Main container */}
        <div className="container mx-auto px-4 sm:px-6 h-full py-16 md:py-24 relative z-10 max-w-7xl flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 h-full items-center">
            {/* Left content column */}
            <div className="order-1 lg:order-1 pt-8 lg:pt-0">
              <div 
                className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-[#f57f17]/10 to-[#FDBE02]/10 text-[#f57f17] font-medium text-sm md:text-base mb-6 md:mb-8 hover:bg-[#f57f17]/20 hover:scale-105 transition-all duration-300 cursor-default animate-fadeIn"
                style={{ animationDelay: '0.2s' }}
              >
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-2 animate-spin-slow" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="1 3" />
                  </svg>
                  Our Mango Story
                </span>
              </div>
              
              <h1 
                className="text-4xl sm:text-5xl md:text-5xl font-bold text-[#333333] mb-6 md:mb-8 leading-tight tracking-tight animate-slideUp"
                style={{ animationDelay: '0.4s' }}
              >
                <span className="block">Passion for</span>
                <span className="text-[#f57f17] relative inline-block group">
                  Quality
                  <span className="absolute -bottom-2 left-0 w-0 h-1.5 bg-[#f57f17] group-hover:w-full transition-all duration-700 ease-out"> </span> 
                </span> <span/>&
                <span className="block"></span>
                <span className="relative inline-block overflow-hidden">
                  <span className="block transform transition-transform duration-700 hover:translate-y-[-100%]">Sustainability</span>
                  <span className="absolute top-full transform transition-transform duration-700 text-[#FDBE02] hover:translate-y-[-100%]">Innovation</span>
                </span>
              </h1>
              
              <p 
                className="text-lg sm:text-xl text-[#555555] mb-8 md:mb-10 max-w-2xl hover:text-[#333333] transition-colors duration-300 leading-relaxed animate-fadeIn"
                style={{ animationDelay: '0.6s' }}
              >
                Discover the passion and dedication behind AmGo's premium mangoes, from our sustainable farms to your table.
              </p>
              
              <div 
                className="flex flex-row gap-4 sm:gap-5 animate-slideUp"
                style={{ animationDelay: '0.8s' }}
              >
                <Link 
                  href="/contact" 
                  className="inline-flex items-center justify-center bg-[#f57f17] text-white font-semibold px-6 md:px-8 py-3 md:py-4 rounded-lg hover:bg-[#e65100] transition-all duration-500 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 overflow-hidden group relative text-base md:text-lg whitespace-nowrap"
                >
                  <span className="relative z-10 flex items-center">
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 4H4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V6C22 4.89543 21.1046 4 20 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Contact Us
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-[#f9a825] to-[#f57f17] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                </Link>
                
                <Link 
                  href="#history" 
                  className="inline-flex items-center justify-center bg-white text-[#f57f17] border-2 border-[#f57f17] font-semibold px-6 md:px-8 py-3 md:py-4 rounded-lg hover:bg-[#fff9e6] transition-all duration-500 shadow-md hover:shadow-lg transform hover:-translate-y-1 hover:scale-105 text-base md:text-lg whitespace-nowrap group"
                >
                  <span className="flex items-center">
                    Learn More
                    <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
            
            {/* Right image column */}
            <div 
              className="order-2 lg:order-2 relative animate-fadeIn"
              style={{ animationDelay: '0.6s' }}
            >
              <div 
                className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-all duration-500 aspect-w-4 aspect-h-3"
                style={{
                  transform: `perspective(1000px) rotateY(${mousePosition.x * 5}deg) rotateX(${mousePosition.y * -5}deg)`,
                  transition: 'transform 0.5s ease-out'
                }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1591073113125-e46713c829ed?q=80&w=1974" 
                  alt="Mango orchard" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 flex items-end">
                  <div className="p-6 text-white transform translate-y-4 hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-2xl font-bold">Our Mango Orchards</h3>
                    <p className="text-white/80 mt-2 max-h-0 group-hover:max-h-20 overflow-hidden transition-all duration-500">Where quality and sustainability meet</p>
                  </div>
                </div>
              </div>
              
              {/* Animated SVG mango icon */}
              <div 
                className="absolute -top-10 -right-10 w-24 h-24 transform rotate-12 animate-float"
                style={{
                  transform: `rotate(12deg) translate(${mousePosition.x * -15}px, ${mousePosition.y * -15}px)`,
                  transition: 'transform 0.3s ease-out'
                }}
              >
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <defs>
                    <radialGradient id="mango-gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                      <stop offset="0%" stopColor="#FDBE02" />
                      <stop offset="100%" stopColor="#F57F17" />
                    </radialGradient>
                  </defs>
                  <g className="animate-spin-slow">
                    <path d="M50,15 C65,5 85,15 90,35 C95,55 85,80 65,90 C45,100 20,90 10,70 C0,50 10,25 30,15 C40,10 45,10 50,15 Z" fill="url(#mango-gradient)" />
                    <path d="M50,25 C45,25 40,35 40,45 C40,55 45,65 50,65 C55,65 60,55 60,45 C60,35 55,25 50,25 Z" fill="#FFFFFF" fillOpacity="0.2" />
                    <path d="M30,40 C25,45 25,55 30,60" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" fill="none" />
                  </g>
                </svg>
              </div>
              
              {/* Animated SVG leaf icon */}
              <div 
                className="absolute -bottom-8 -left-8 w-20 h-20 transform -rotate-12 animate-float-reverse"
                style={{
                  transform: `rotate(-12deg) translate(${mousePosition.x * 15}px, ${mousePosition.y * 15}px)`,
                  transition: 'transform 0.3s ease-out'
                }}
              >
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <defs>
                    <linearGradient id="leaf-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#4CAF50" />
                      <stop offset="100%" stopColor="#8BC34A" />
                    </linearGradient>
                  </defs>
                  <path d="M50,10 C70,10 90,30 90,50 C90,70 70,90 50,90 C30,90 10,70 10,50 C10,30 30,10 50,10 Z" fill="none" />
                  <path d="M50,20 C65,20 80,35 80,50 C80,65 65,80 50,80 C50,65 50,35 50,20 Z" fill="url(#leaf-gradient)" className="animate-pulse-slow" />
                  <path d="M50,20 C35,20 20,35 20,50 C20,65 35,80 50,80 C50,65 50,35 50,20 Z" fill="url(#leaf-gradient)" className="animate-pulse-slow" style={{ animationDelay: '0.5s' }} />
                  <path d="M50,20 C50,35 50,65 50,80 C35,80 20,65 20,50 C20,35 35,20 50,20 Z" stroke="#FFFFFF" strokeWidth="1" fill="none" />
                </svg>
              </div>
              
              {/* Modern quality badge */}
              <div className="absolute top-5 right-5 bg-white/90 backdrop-blur-md rounded-full px-4 py-2 shadow-lg flex items-center gap-2 transform rotate-3 hover:rotate-0 transition-all duration-300 group cursor-pointer">
                <svg className="w-5 h-5 text-[#f57f17] transform group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 4L12 14.01L9 11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="font-semibold text-[#333333] group-hover:text-[#f57f17] transition-colors duration-300">Premium Quality</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our History Section */}
      <section 
        id="history" 
        ref={sectionRefs.history}
        className={`py-20 bg-white ${isVisible.history ? `animate-${animationVariant.history}` : 'opacity-0'}`}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-16">
            <div className="md:w-1/2">
              <div className="relative mb-8">
                <span className="inline-block px-3 py-1 bg-[#fff9e6] text-[#f57f17] text-sm font-medium rounded-md mb-2 animate-stagger">
                  SINCE 2024
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-[#333333] relative inline-block animate-stagger">
                  Our History
                  <div className="absolute -bottom-2 left-0 w-0 h-1 bg-gradient-to-r from-[#FDBE02] to-[#F57F17] group-hover:w-full transition-all duration-700 ease-out history-underline"></div>
                </h2>
              </div>
              
              <div className="space-y-6">
                <p className="text-[#555555] animate-stagger">
                  Founded in 2024, আমGO began as a small f-commerce buisness. 
                </p>
                <p className="text-[#555555] animate-stagger">
                  Our journey has been guided by a simple principle: work for nature and commitment to quality. Over the years, we've expanded our team, refined our supplies, and built relationships with mango lovers around the country.
                </p>
              </div>
              
              <div className="mt-8 flex items-center space-x-4 animate-stagger">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#fff9e6] to-[#FDBE02]/20 flex items-center justify-center group transition-all duration-500 hover:bg-[#FDBE02] hover:shadow-lg transform hover:rotate-12">
                  <svg className="w-7 h-7 text-[#F57F17] group-hover:text-white transition-colors duration-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-[#333333] text-lg">Est. 2024</h4>
                  <p className="text-[#555555]">Over a year of excellence</p>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2 ml-6  relative">
              <div className="relative rounded-xl overflow-hidden shadow-xl transform hover:scale-[1.03] transition-all duration-500 group animate-stagger">
                <img 
                  src="https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=1974" 
                  alt="AmGo history" 
                  className="w-full  h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
                  <div className="p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-2xl font-bold">Our Beginnings</h3>
                    <p className="text-white/80 mt-2"> আমGO started at 2024</p>
                  </div>
                </div>
              </div>
              
              {/* Interactive timeline */}
              <div className="absolute top-0 -left-5 h-full flex flex-col   justify-between items-center">
                <div className="h-full w-1 bg-gradient-to-b from-[#FDBE02] via-[#F57F17] to-[#FF3D00] rounded-full"></div>
                
                <div className="absolute top-1/4 -translate-y-1/2 -left-4 animate-stagger">
                  <div className="w-8 h-8 rounded-full bg-[#FDBE02] shadow-lg flex items-center justify-center transform hover:scale-125 transition-all duration-300 cursor-pointer group relative">
                    <span className="text-white font-bold group-hover:scale-110 transition-transform duration-300">1</span>
                    <div className="absolute left-full ml-4 bg-white p-3 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none w-48">
                      <h5 className="font-semibold text-[#333333]">2010: Foundation</h5>
                      <p className="text-sm text-[#555555]">আমGO was founded with few members</p>
                    </div>
                  </div>
                </div>
                
                <div className="absolute top-1/2 -translate-y-1/2 -left-4 animate-stagger" style={{ animationDelay: '0.2s' }}>
                  <div className="w-8 h-8 rounded-full bg-[#F57F17] shadow-lg flex items-center justify-center transform hover:scale-125 transition-all duration-300 cursor-pointer group relative">
                    <span className="text-white font-bold group-hover:scale-110 transition-transform duration-300">2</span>
                    <div className="absolute left-full ml-4 bg-white p-3 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none w-48">
                      <h5 className="font-semibold text-[#333333]">2025: Inovation</h5>
                      <p className="text-sm text-[#555555]">Launced their own website</p>
                    </div>
                  </div>
                </div>
                
                <div className="absolute bottom-1/4 translate-y-1/2 -left-4 animate-stagger" style={{ animationDelay: '0.4s' }}>
                  <div className="w-8 h-8 rounded-full bg-[#FF3D00] shadow-lg flex items-center justify-center transform hover:scale-125 transition-all duration-300 cursor-pointer group relative">
                    <span className="text-white font-bold group-hover:scale-110 transition-transform duration-300">3</span>
                    <div className="absolute left-full ml-4 bg-white p-3 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none w-48">
                      <h5 className="font-semibold text-[#333333]">2026: Expension</h5>
                      <p className="text-sm text-[#555555]">Planned to bring mangoes in your nearest market</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Mission Section */}
      <section 
        id="mission" 
        ref={sectionRefs.mission}
        className={`py-20 bg-[#fff9e6] ${isVisible.mission ? `animate-${animationVariant.mission}` : 'opacity-0'}`}
      >
        <div className="container mx-auto px-4 relative">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-40 h-40 opacity-10">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="text-[#F57F17] w-full h-full">
              <path fill="currentColor" d="M47.5,-57.2C59.9,-45.8,67.3,-29.2,70.3,-11.9C73.3,5.5,71.9,23.5,63.1,37.7C54.3,51.9,38.2,62.2,20.7,68.5C3.3,74.8,-15.6,77.1,-33.1,71.2C-50.7,65.3,-67,51.2,-74.8,33.3C-82.6,15.3,-81.9,-6.5,-74.1,-24.8C-66.3,-43.2,-51.4,-58.1,-35,-65.3C-18.6,-72.6,-0.7,-72.2,15.4,-67.5C31.4,-62.8,35.1,-68.7,47.5,-57.2Z" transform="translate(100 100)" />
            </svg>
          </div>
          <div className="absolute bottom-0 left-0 w-32 h-32 opacity-10">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="text-[#FDBE02] w-full h-full">
              <path fill="currentColor" d="M47.7,-51.2C59.5,-40.6,65.8,-23.1,67.3,-5.8C68.8,11.6,65.5,28.8,55.3,40.8C45.1,52.8,28,59.6,10.1,63.5C-7.8,67.4,-26.5,68.3,-40.9,60.1C-55.3,51.9,-65.3,34.5,-69.2,15.8C-73,-2.9,-70.7,-23,-61.1,-37.5C-51.5,-52,-34.6,-61,-17.8,-63.3C-1,-65.6,15.7,-61.2,29.9,-54.5C44.1,-47.8,55.8,-38.9,47.7,-51.2Z" transform="translate(100 100)" />
            </svg>
          </div>
          
          <div className="text-center mb-16 relative">
            <span className="inline-block px-4 py-1 bg-white text-[#f57f17] text-sm font-medium rounded-md mb-3 animate-stagger">
              OUR PURPOSE
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#333333] relative inline-block animate-stagger">
              Our Mission
              <div className="absolute -bottom-2 left-0 w-0 h-1 bg-gradient-to-r from-[#FDBE02] to-[#F57F17] group-hover:w-full transition-all duration-700 ease-out mission-underline"></div>
            </h2>
            <p className="text-[#555555] max-w-2xl mx-auto animate-stagger">
              At আমGO, we're committed to bringing the finest mangoes to your table while thinking about your health and supporting our farming communities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {/* Quality Card */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group animate-stagger">
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-[#fff9e6] rounded-full transform scale-0 group-hover:scale-[2.5] transition-transform duration-500 ease-out"></div>
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#fff9e6] to-[#FDBE02]/20 flex items-center justify-center relative z-10 group-hover:bg-transparent transition-all duration-500">
                  <svg className="w-10 h-10 text-[#F57F17] group-hover:text-[#F57F17] transition-colors duration-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path className="checkmark-path" d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <circle className="checkmark-circle" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeDasharray="62.83" strokeDashoffset="62.83" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-[#333333] group-hover:text-[#F57F17] transition-colors duration-300">Quality</h3>
              <p className="text-[#555555] mb-6">
                We select only the finest mangoes, ensuring  fruit meets our strict quality standards for flavor, texture, and appearance.
              </p>
              <div className="h-1 w-16 bg-gradient-to-r from-[#FDBE02] to-[#F57F17] rounded-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></div>
            </div>
            
            {/* Sustainability Card */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group animate-stagger" style={{ animationDelay: '0.2s' }}>
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-[#fff9e6] rounded-full transform scale-0 group-hover:scale-[2.5] transition-transform duration-500 ease-out"></div>
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#fff9e6] to-[#FDBE02]/20 flex items-center justify-center relative z-10 group-hover:bg-transparent transition-all duration-500">
                  <svg className="w-10 h-10 text-[#F57F17] group-hover:text-[#F57F17] transition-colors duration-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path className="sustainability-path" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="currentColor" strokeWidth="2" />
                    <path className="leaf-path" d="M8 14s1.5 2 4 2 4-2 4-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path className="leaf-stem" d="M12 16v-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path className="leaf-left" d="M9 10s0-3 3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path className="leaf-right" d="M15 10s0-3-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-[#333333] group-hover:text-[#F57F17] transition-colors duration-300">Sustainability</h3>
              <p className="text-[#555555] mb-6">
                Our farming practices prioritize environmental sustainability, from water conservation to biodiversity preservation.
              </p>
              <div className="h-1 w-16 bg-gradient-to-r from-[#FDBE02] to-[#F57F17] rounded-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></div>
            </div>
            
            {/* Community Card */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group animate-stagger" style={{ animationDelay: '0.4s' }}>
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-[#fff9e6] rounded-full transform scale-0 group-hover:scale-[2.5] transition-transform duration-500 ease-out"></div>
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#fff9e6] to-[#FDBE02]/20 flex items-center justify-center relative z-10 group-hover:bg-transparent transition-all duration-500">
                  <svg className="w-10 h-10 text-[#F57F17] group-hover:text-[#F57F17] transition-colors duration-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path className="community-circle-1" d="M9 11a3 3 0 100-6 3 3 0 000 6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path className="community-circle-2" d="M17 9a2 2 0 100-4 2 2 0 000 4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path className="community-path-1" d="M3 19v-2a4 4 0 014-4h4a4 4 0 014 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path className="community-path-2" d="M19 19v-1a3 3 0 00-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-[#333333] group-hover:text-[#F57F17] transition-colors duration-300">Community</h3>
              <p className="text-[#555555] mb-6">
                We support our farming communities through fair wages
              </p>
              <div className="h-1 w-16 bg-gradient-to-r from-[#FDBE02] to-[#F57F17] rounded-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Team Section */}
      <section 
        id="team" 
        ref={sectionRefs.team}
        className={`py-20 bg-white ${isVisible.team ? `animate-${animationVariant.team}` : 'opacity-0'}`}
      >
        <div className="container mx-auto px-4 relative">
          {/* Decorative elements */}
          <div className="absolute top-20 left-0 w-32 h-32 opacity-10 animate-float">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="text-[#FDBE02] w-full h-full">
              <path fill="currentColor" d="M39.9,-65.7C51.1,-58.4,59.2,-46.6,63.5,-34.1C67.8,-21.5,68.2,-8.3,67.4,5.1C66.5,18.5,64.3,32.1,56.9,42.1C49.5,52.1,36.9,58.5,23.8,62.7C10.7,66.9,-2.9,69,-16.4,67.2C-29.9,65.5,-43.3,59.9,-53.8,50.4C-64.3,40.9,-71.9,27.5,-74.8,12.8C-77.7,-1.9,-75.9,-17.9,-69.2,-31.2C-62.5,-44.5,-51,-55.1,-38.3,-61.5C-25.6,-67.9,-12.8,-70.1,0.8,-71.4C14.4,-72.7,28.7,-73,39.9,-65.7Z" transform="translate(100 100)" />
            </svg>
          </div>
          <div className="absolute bottom-20 right-0 w-40 h-40 opacity-10 animate-float-delayed">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="text-[#F57F17] w-full h-full">
              <path fill="currentColor" d="M45.3,-77.5C58.3,-71.2,68.3,-57.9,74.3,-43.5C80.3,-29.1,82.3,-13.6,81.1,1.2C79.9,16,75.5,30,67.8,42.1C60.1,54.2,49.1,64.3,36.5,70.7C23.9,77.1,9.7,79.8,-3.9,76.9C-17.5,74,-35,65.5,-47.2,54.2C-59.4,42.9,-66.3,28.8,-71.2,13.5C-76.1,-1.8,-79,-18.3,-74.4,-32.2C-69.8,-46.1,-57.7,-57.4,-44.1,-63.5C-30.5,-69.6,-15.2,-70.5,0.8,-71.8C16.8,-73.1,33.7,-74.8,45.3,-77.5Z" transform="translate(100 100)" />
            </svg>
          </div>
          
          <div className="text-center mb-16 relative">
            <span className="inline-block px-4 py-1 bg-[#fff9e6] text-[#f57f17] text-sm font-medium rounded-md mb-3 animate-stagger">
              THE PEOPLE BEHIND আমGO
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#333333] relative inline-block animate-stagger">
              Meet Our Team
              <div className="absolute -bottom-2 left-0 w-0 h-1 bg-gradient-to-r from-[#FDBE02] to-[#F57F17] group-hover:w-full transition-all duration-700 ease-out team-underline"></div>
            </h2>
            <p className="text-[#555555] max-w-2xl mx-auto animate-stagger">
              The passionate individuals behind আমGO's success, dedicated to bringing you the finest mangoes.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {teamMembers.map((member, index) => (
              <div 
                key={member.id || index} 
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group animate-stagger"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden">
                  <div className="absolute top-4 right-4 z-10">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm text-[#F57F17] transform rotate-0 group-hover:rotate-[360deg] transition-all duration-700">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M3 16V8C3 5.23858 5.23858 3 8 3H16C18.7614 3 21 5.23858 21 8V16C21 18.7614 18.7614 21 16 21H8C5.23858 21 3 18.7614 3 16Z" stroke="currentColor" strokeWidth="2"/>
                        <path d="M17.5 6.5H17.51" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </div>
                  
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-64 object-cover object-center transform group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                      <p className="text-white/90 text-sm mb-4">{member.bio}</p>
                      <div className="flex space-x-3">
                        <a 
                          href="#" 
                          className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center hover:bg-[#FDBE02] transition-all duration-300 transform hover:scale-110"
                          aria-label="Twitter"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                          </svg>
                        </a>
                        <a 
                          href="#" 
                          className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center hover:bg-[#FDBE02] transition-all duration-300 transform hover:scale-110"
                          aria-label="LinkedIn"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                          </svg>
                        </a>
                        <a 
                          href="#" 
                          className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center hover:bg-[#FDBE02] transition-all duration-300 transform hover:scale-110"
                          aria-label="Instagram"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 relative">
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
                    <div className="w-10 h-10 bg-gradient-to-r from-[#FDBE02] to-[#F57F17] rounded-full flex items-center justify-center shadow-lg">
                      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-xl text-center text-[#333333] mt-2 group-hover:text-[#F57F17] transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="text-[#F57F17] text-sm text-center mb-2">{member.role}</p>
                  <div className="h-0.5 w-12 bg-gradient-to-r from-[#FDBE02] to-[#F57F17] rounded-full mx-auto transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Sustainable Farming Section */}
      <section 
        id="farming" 
        ref={sectionRefs.farming}
        className={`py-20 bg-[#fff9e6] ${isVisible.farming ? `animate-${animationVariant.farming}` : 'opacity-0'}`}
      >
        <div className="container mx-auto px-4 relative">
          {/* Decorative elements */}
          <div className="absolute top-10 right-10 w-40 h-40 opacity-10 animate-float">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="text-[#F57F17] w-full h-full">
              <path fill="currentColor" d="M47.7,-51.2C59.5,-40.6,65.8,-23.1,67.3,-5.8C68.8,11.6,65.5,28.8,55.3,40.8C45.1,52.8,28,59.6,10.1,63.5C-7.8,67.4,-26.5,68.3,-40.9,60.1C-55.3,51.9,-65.3,34.5,-69.2,15.8C-73,-2.9,-70.7,-23,-61.1,-37.5C-51.5,-52,-34.6,-61,-17.8,-63.3C-1,-65.6,15.7,-61.2,29.9,-54.5C44.1,-47.8,55.8,-38.9,47.7,-51.2Z" transform="translate(100 100)" />
            </svg>
          </div>
          
          <div className="absolute bottom-10 left-10 w-32 h-32 opacity-10 animate-float-reverse">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="text-[#FDBE02] w-full h-full">
              <path fill="currentColor" d="M42.8,-65.2C56.9,-56.3,70.8,-46.6,75.4,-33.4C80,-20.2,75.3,-3.5,71.1,12.2C66.9,27.9,63.2,42.6,53.5,52.8C43.8,63,28.2,68.6,12.8,69.8C-2.6,71,-17.8,67.8,-32.5,61.7C-47.2,55.6,-61.3,46.6,-69.8,33.5C-78.3,20.4,-81.1,3.2,-77.2,-12.2C-73.3,-27.5,-62.7,-41,-49.6,-50C-36.5,-59,-18.2,-63.5,-1.7,-61.1C14.9,-58.7,29.8,-49.4,42.8,-65.2Z" transform="translate(100 100)" />
            </svg>
          </div>
 <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-16">
            <div className="md:w-1/2 order-2 md:order-1">
              <div className="grid grid-cols-2 gap-4 lg:gap-6">
                {/* Image 1 */}
                <div className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 group">
                  <div className="relative overflow-hidden">
                    <img 
                      src="/mangoes/gopal3.jpg" 
                      alt="Sustainable farming" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
                      <div className="p-3 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <h4 className="text-sm font-medium">Eco-friendly Practices</h4>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Image 2 */}
                <div className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 mt-8 group">
                  <div className="relative overflow-hidden">
                    <img 
                      src="/mangoes/gopal3.jpg" 
                      alt="Organic mangoes" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
                      <div className="p-3 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <h4 className="text-sm font-medium">Organic Cultivation</h4>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Image 3 */}
                <div className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 group">
                  <div className="relative overflow-hidden">
                    <img 
                      src="/mangoes/himsagar2.jpg" 
                      alt="Mango harvest" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
                      <div className="p-3 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <h4 className="text-sm font-medium">Careful Harvesting</h4>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Image 4 */}
                <div className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 mt-8 group">
                  <div className="relative overflow-hidden">
                    <img 
                      src="/mangoes/himsagar2.jpg" 
                      alt="Mango trees" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
                      <div className="p-3 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <h4 className="text-sm font-medium">Sustainable Orchards</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          
         
            <div className="md:w-1/2 order-1 md:order-2">
              <div className="relative mb-8">
                <span className="inline-block px-4 py-1 bg-white text-[#F57F17] text-sm font-medium rounded-md mb-3 shadow-sm transform hover:scale-105 transition-transform duration-300">
                  ECO-FRIENDLY APPROACH
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-[#333333] relative inline-block group">
                  Sustainable Farming
                  <div className="absolute -bottom-2 left-0 w-0 h-1 bg-gradient-to-r from-[#FDBE02] to-[#F57F17] group-hover:w-full transition-all duration-700 ease-out"></div>
                </h2>
              </div>
              
              <p className="text-[#555555] mb-8">
                At আমGO, sustainability isn't just a buzzword—it's at the core of everything we do. Our buisness practices are designed to supply the highest quality mangoes.
              </p>
              
              <div className="space-y-6 mb-8">
                {/* Feature 1 - Organic Cultivation */}
                <div className="flex items-start space-x-4 group transform hover:translate-x-2 transition-transform duration-300">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FDBE02]/20 to-[#F57F17]/20 flex items-center justify-center mt-1 flex-shrink-0 group-hover:bg-[#FDBE02] transition-colors duration-500">
                    <svg className="h-6 w-6 text-[#F57F17] group-hover:text-white transition-colors duration-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path className="leaf-path" d="M6 3V15C6 16.0609 6.42143 17.0783 7.17157 17.8284C7.92172 18.5786 8.93913 19 10 19C11.0609 19 12.0783 18.5786 12.8284 17.8284C13.5786 17.0783 14 16.0609 14 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path className="leaf-stem" d="M12 19V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-[#333333] group-hover:text-[#F57F17] transition-colors duration-300">Organic Cultivation</h4>
                    <p className="text-[#555555]">We use natural fertilizers and pest control methods to ensure our mangoes are free from harmful chemicals.</p>
                  </div>
                </div>
                
                {/* Feature 2 - Water Conservation */}
                <div className="flex items-start space-x-4 group transform hover:translate-x-2 transition-transform duration-300">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FDBE02]/20 to-[#F57F17]/20 flex items-center justify-center mt-1 flex-shrink-0 group-hover:bg-[#FDBE02] transition-colors duration-500">
                    <svg className="h-6 w-6 text-[#F57F17] group-hover:text-white transition-colors duration-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path className="water-drop" d="M12 22C16.4183 22 20 18.4183 20 14C20 9.58172 12 2 12 2C12 2 4 9.58172 4 14C4 18.4183 7.58172 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path className="water-wave" d="M8 15C8 15 9 17 12 17C15 17 16 15 16 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-[#333333] group-hover:text-[#F57F17] transition-colors duration-300">Water Conservation</h4>
                    <p className="text-[#555555]">Our drip irrigation systems  ensure our mango trees receive optimal hydration.</p>
                  </div>
                </div>
                
                {/* Feature 3 - Biodiversity */}
                <div className="flex items-start space-x-4 group transform hover:translate-x-2 transition-transform duration-300">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FDBE02]/20 to-[#F57F17]/20 flex items-center justify-center mt-1 flex-shrink-0 group-hover:bg-[#FDBE02] transition-colors duration-500">
                    <svg className="h-6 w-6 text-[#F57F17] group-hover:text-white transition-colors duration-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path className="tree-trunk" d="M12 22V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path className="tree-branch-1" d="M8 9L12 5L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path className="tree-branch-2" d="M6 13L12 7L18 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path className="tree-branch-3" d="M4 17L12 9L20 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-[#333333] group-hover:text-[#F57F17] transition-colors duration-300">Safety</h4>
                    <p className="text-[#555555]">We maintain high quality packeging for ensure your mangoes remain safe</p>
                  </div>
                </div>
              </div>
              
              <a 
                href="#" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#FDBE02] to-[#F57F17] text-white font-medium rounded-lg hover:shadow-lg transition-all duration-500 transform hover:-translate-y-1 group"
              >
                <span>Learn More About Our Practices</span>
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section 
        id="stats" 
        ref={sectionRefs.stats}
        className={`py-24 bg-white ${isVisible.stats ? `animate-${animationVariant.stats}` : 'opacity-0'}`}
      >
        <div className="container mx-auto px-4 relative">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-20 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-r from-[#FDBE02]/10 to-[#F57F17]/10 transform -skew-y-3"></div>
          </div>
          
          <div className="absolute bottom-0 right-0 w-full h-20 overflow-hidden">
            <div className="absolute bottom-0 right-0 w-full h-20 bg-gradient-to-r from-[#F57F17]/10 to-[#FDBE02]/10 transform skew-y-3"></div>
          </div>
          
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-[#fff9e6] text-[#F57F17] text-sm font-medium rounded-md mb-3 shadow-sm transform hover:scale-105 transition-transform duration-300">
              OUR IMPACT
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#333333] relative inline-block group">
              আমGO By The Numbers
              <div className="absolute -bottom-2 left-0 w-0 h-1 bg-gradient-to-r from-[#FDBE02] to-[#F57F17] group-hover:w-full transition-all duration-700 ease-out"></div>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={stat.id} 
                className="relative bg-gradient-to-br from-white to-[#fff9e6] rounded-xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group animate-stagger"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-[#FDBE02] to-[#F57F17] rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                
                <div className="relative w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#FDBE02]/20 to-[#F57F17]/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <div className="text-3xl text-[#F57F17] group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="48" 
                      fill="none" 
                      stroke="#FDBE02" 
                      strokeWidth="1" 
                      strokeDasharray="0 1" 
                      className="group-hover:animate-circle-draw" 
                    />
                  </svg>
                </div>
                
                <div className="text-4xl font-bold bg-gradient-to-r from-[#FDBE02] to-[#F57F17] bg-clip-text text-transparent mb-2 counter-value">
                  {stat.value}
                </div>
                
                <div className="text-[#555555] font-medium group-hover:text-[#333333] transition-colors duration-300">
                  {stat.label}
                </div>
                
                <div className="h-1 w-12 bg-gradient-to-r from-[#FDBE02] to-[#F57F17] rounded-full mx-auto mt-4 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FDBE02] to-[#F57F17] transform skew-y-3 origin-top-right"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full opacity-10 animate-float"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-white rounded-full opacity-10 animate-float-reverse"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full opacity-10 animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-white rounded-full opacity-10 animate-float"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-sm rounded-2xl p-10 shadow-2xl border border-white/20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white drop-shadow-md">
              Experience the আমGO Difference
            </h2>
            
            <div className="w-24 h-1 bg-white mx-auto mb-8 rounded-full"></div>
            
            <p className="text-lg md:text-xl mb-10 text-white/90 max-w-2xl mx-auto">
              Ready to taste the country's finest mangoes? Explore our selection of premium mangoes and discover the perfect variety for you.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/shop" 
                className="inline-flex items-center justify-center gap-2 bg-white text-[#F57F17] font-bold py-4 px-8 rounded-lg hover:bg-[#333333] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 group"
              >
                <span>Shop Now</span>
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white font-bold py-4 px-8 rounded-lg hover:bg-white hover:text-[#F57F17] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 group"
              >
                <span>Contact Us</span>
                <svg className="w-5 h-5 transform group-hover:rotate-45 transition-transform duration-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 17L17 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7 7H17V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
      
      {/* Add custom styles for animations */}
      <style jsx global>{`
        /* Base animations */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeScale {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        
        @keyframes slideUp {
          from { transform: translateY(100px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes slideDown {
          from { transform: translateY(-100px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes slideLeft {
          from { transform: translateX(-100px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideRight {
          from { transform: translateX(100px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes popIn {
          0% { transform: scale(0); opacity: 0; }
          60% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        
        /* Element animations */
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0) rotate(-12deg); }
          50% { transform: translateY(-10px) rotate(-12deg); }
        }
        
        @keyframes float {
          0% { transform: translateY(0) translateX(0); }
          33% { transform: translateY(-10px) translateX(5px); }
          66% { transform: translateY(5px) translateX(-5px); }
          100% { transform: translateY(0) translateX(0); }
        }
        
        @keyframes float-reverse {
          0% { transform: translateY(0) translateX(0); }
          33% { transform: translateY(10px) translateX(-5px); }
          66% { transform: translateY(-5px) translateX(5px); }
          100% { transform: translateY(0) translateX(0); }
        }
        
        @keyframes circle-draw {
          to { stroke-dasharray: 302; }
        }
        
        /* Animation classes */
        .animate-fadeIn {
          animation: fadeIn 1s ease forwards;
        }
        
        .animate-fadeInLeft {
          animation: fadeInLeft 1s ease forwards;
        }
        
        .animate-fadeInRight {
          animation: fadeInRight 1s ease forwards;
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 1s ease forwards;
        }
        
        .animate-fadeScale {
          animation: fadeScale 1s ease forwards;
        }
        
        .animate-slideUp {
          animation: slideUp 1s ease forwards;
        }
        
        .animate-slideDown {
          animation: slideDown 1s ease forwards;
        }
        
        .animate-slideLeft {
          animation: slideLeft 1s ease forwards;
        }
        
        .animate-slideRight {
          animation: slideRight 1s ease forwards;
        }
        
        .animate-popIn {
          animation: popIn 0.6s ease forwards;
        }
        
        .animate-pulse {
          animation: pulse 3s infinite ease-in-out;
        }
        
        .animate-bounce {
          animation: bounce 4s infinite ease-in-out;
        }
        
        .animate-float {
          animation: float 8s infinite ease-in-out;
        }
        
        .animate-float-reverse {
          animation: float-reverse 8s infinite ease-in-out;
        }
        
        .group-hover\:animate-circle-draw:hover circle {
          animation: circle-draw 1.5s ease forwards;
        }
        
        /* Staggered animations */
        .animate-stagger > * {
          opacity: 0;
          animation: fadeIn 0.5s ease forwards;
        }
        
        .animate-stagger > *:nth-child(1) { animation-delay: 0.1s; }
        .animate-stagger > *:nth-child(2) { animation-delay: 0.2s; }
        .animate-stagger > *:nth-child(3) { animation-delay: 0.3s; }
        .animate-stagger > *:nth-child(4) { animation-delay: 0.4s; }
        .animate-stagger > *:nth-child(5) { animation-delay: 0.5s; }
        
        /* Hover effects */
        .group:hover .group-hover\:flip-y {
          transform: rotateX(360deg);
          transition: transform 0.5s;
        }
        
        .farming-underline {
          width: 0;
        }
        
        .group:hover .farming-underline {
          width: 100%;
        }
        
        /* Scroll progress */
        .loading-bar {
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </div>
  );
}
