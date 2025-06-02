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
      
      {/* ...other sections remain unchanged... */}

      {/* Sustainable Farming Section (Optimized, Images Removed) */}
      <section 
        id="farming" 
        ref={sectionRefs.farming}
        className={`py-20 bg-[#fff9e6] ${isVisible.farming ? `animate-${animationVariant.farming}` : 'opacity-0'}`}
      >
        <div className="container mx-auto px-4 relative">
          {/* Decorative elements */}
          <div className="absolute top-10 right-10 w-40 h-40 opacity-10 animate-float">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="text-[#F57F17] w-full h-full">
              <path fill="currentColor" d="M47.7,-51.2C59.5,-40.6,65.8,-23.1,67.3,-5.8C68.8,11.6,65.5,28.8,55.3,40.8C45.1,52.8,28,59.6,10.1,63.5C-7.8,67.4,-26.5,68.3,-40.9,60.1C-55.3,51.9,-65.3,34.5,-[...]
            </svg>
          </div>
          <div className="absolute bottom-10 left-10 w-32 h-32 opacity-10 animate-float-reverse">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="text-[#FDBE02] w-full h-full">
              <path fill="currentColor" d="M42.8,-65.2C56.9,-56.3,70.8,-46.6,75.4,-33.4C80,-20.2,75.3,-3.5,71.1,12.2C66.9,27.9,63.2,42.6,53.5,52.8C43.8,63,28.2,68.6,12.8,69.8C-2.6,71,-17.8,67.8,-32.5,[...]
            </svg>
          </div>

          <div className="flex flex-col items-center justify-center gap-12 lg:gap-16">
            <div className="w-full md:w-3/4 lg:w-2/3 mx-auto">
              <div className="relative mb-8 text-center">
                <span className="inline-block px-4 py-1 bg-white text-[#F57F17] text-sm font-medium rounded-md mb-3 shadow-sm transform hover:scale-105 transition-transform duration-300">
                  ECO-FRIENDLY APPROACH
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-[#333333] relative inline-block group">
                  Sustainable Farming
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-[#FDBE02] to-[#F57F17] group-hover:w-full transition-all duration-700 ease-out"></div>
                </h2>
              </div>
              
              <p className="text-[#555555] mb-8 text-center max-w-2xl mx-auto">
                At আমGO, sustainability isn't just a buzzword—it's at the core of everything we do. Our business practices are designed to supply the highest quality mangoes while protecting the environment and supporting our local communities.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
                {/* Feature 1 - Organic Cultivation */}
                <div className="flex flex-col items-center bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group animate-stagger">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FDBE02]/20 to-[#F57F17]/20 flex items-center justify-center mb-4 group-hover:bg-[#FDBE02] transition-colors duration-300">
                    <svg className="h-8 w-8 text-[#F57F17] group-hover:text-white transition-colors duration-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path className="leaf-path" d="M6 3V15C6 16.0609 6.42143 17.0783 7.17157 17.8284C7.92172 18.5786 8.93913 19 10 19C11.0609 19 12.0783 18.5786 12.8284 17.8284C13.5786 17.0783 14 16.0609 14 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path className="leaf-stem" d="M12 19V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-lg text-[#333333] group-hover:text-[#F57F17] transition-colors duration-300 mb-2">Organic Cultivation</h4>
                  <p className="text-[#555555] text-center">We use natural fertilizers and pest control methods to ensure our mangoes are free from harmful chemicals.</p>
                </div>
                
                {/* Feature 2 - Water Conservation */}
                <div className="flex flex-col items-center bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group animate-stagger" style={{ animationDelay: '0.2s' }}>
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FDBE02]/20 to-[#F57F17]/20 flex items-center justify-center mb-4 group-hover:bg-[#FDBE02] transition-colors duration-300">
                    <svg className="h-8 w-8 text-[#F57F17] group-hover:text-white transition-colors duration-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path className="water-drop" d="M12 22C16.4183 22 20 18.4183 20 14C20 9.58172 12 2 12 2C12 2 4 9.58172 4 14C4 18.4183 7.58172 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path className="water-wave" d="M8 15C8 15 9 17 12 17C15 17 16 15 16 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-lg text-[#333333] group-hover:text-[#F57F17] transition-colors duration-300 mb-2">Water Conservation</h4>
                  <p className="text-[#555555] text-center">Our drip irrigation systems ensure our mango trees receive optimal hydration.</p>
                </div>
                
                {/* Feature 3 - Safety (formerly Biodiversity) */}
                <div className="flex flex-col items-center bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group animate-stagger" style={{ animationDelay: '0.4s' }}>
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FDBE02]/20 to-[#F57F17]/20 flex items-center justify-center mb-4 group-hover:bg-[#FDBE02] transition-colors duration-300">
                    <svg className="h-8 w-8 text-[#F57F17] group-hover:text-white transition-colors duration-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path className="tree-trunk" d="M12 22V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path className="tree-branch-1" d="M8 9L12 5L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path className="tree-branch-2" d="M6 13L12 7L18 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path className="tree-branch-3" d="M4 17L12 9L20 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-lg text-[#333333] group-hover:text-[#F57F17] transition-colors duration-300 mb-2">Safety</h4>
                  <p className="text-[#555555] text-center">We maintain high quality packaging to ensure your mangoes remain safe and fresh during delivery.</p>
                </div>
              </div>
              
              <div className="flex justify-center mt-8">
                <a 
                  href="#" 
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#FDBE02] to-[#F57F17] text-white font-medium rounded-lg hover:shadow-lg transition-all duration-500 transform hover:-translate-y-1"
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
        </div>
      </section>

      {/* ...other sections remain unchanged... */}
      
      <Footer />
      
      {/* Add custom styles for animations */}
      <style jsx global>{`
        /* ...animation styles remain unchanged... */
      `}</style>
    </div>
  );
}
