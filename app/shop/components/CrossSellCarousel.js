"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeftIcon, ChevronRightIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';

// Custom image component with error fallback
const ProductImage = ({ src, alt, className }) => {
  const [imgSrc, setImgSrc] = useState(src);
  
  const handleError = () => {
    setImgSrc('https://images.unsplash.com/photo-1590502593416-80d8c9a3a636?q=80&w=1974');
  };
  
  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
    />
  );
};

// Sample cross-sell products
const crossSellProducts = [
  {
    id: 101,
    name: 'Mango Specialty Box',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1590502593416-80d8c9a3a636?q=80&w=1974',
    category: 'Gift Box',
    slug: 'mango-specialty-box'
  },
  {
    id: 102,
    name: 'Dried Mango Slices',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1581074817932-31075be335f6?q=80&w=1935',
    category: 'Snacks',
    slug: 'dried-mango-slices'
  },
  {
    id: 103,
    name: 'Mango Preserve',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1601392740426-907c7b028119?q=80&w=1974',
    category: 'Preserves',
    slug: 'mango-preserve'
  },
  {
    id: 104,
    name: 'Organic Mango Variety Pack',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?q=80&w=2070',
    category: 'Gift Box',
    slug: 'organic-mango-variety-pack'
  },
  {
    id: 105,
    name: 'Mango Honey',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1600782330374-f0e0113d4776?q=80&w=1974',
    category: 'Spreads',
    slug: 'mango-honey'
  },
  {
    id: 106,
    name: 'Mango Chutney',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1602053245654-2f1ec5ad7c7b?q=80&w=1974',
    category: 'Condiments',
    slug: 'mango-chutney'
  },
];

export default function CrossSellCarousel() {
  const carouselRef = useRef(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);
  const [activeItem, setActiveItem] = useState(null);
  const [addedToCart, setAddedToCart] = useState(null);
  
  // Handle carousel navigation
  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' 
        ? -carouselRef.current.offsetWidth * 0.7 
        : carouselRef.current.offsetWidth * 0.7;
      
      carouselRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };
  
  // Add to cart animation
  const handleAddToCart = (e, productId) => {
    e.preventDefault();
    e.stopPropagation();
    
    setAddedToCart(productId);
    
    // Reset animation after completing
    setTimeout(() => {
      setAddedToCart(null);
    }, 1500);
  };
  
  // Update arrow visibility based on scroll position
  const handleScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      
      // Show left arrow if not at the start
      setShowLeftButton(scrollLeft > 0);
      
      // Show right arrow if not at the end
      setShowRightButton(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };
  
  // Add scroll listener
  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', handleScroll);
      return () => carousel.removeEventListener('scroll', handleScroll);
    }
  }, []);
  
  return (
    <div className="relative">
      {/* Left Arrow */}
      <button 
        className={`absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg z-10 flex items-center justify-center transition-all duration-300 transform ${
          showLeftButton ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8 pointer-events-none'
        }`}
        onClick={() => scrollCarousel('left')}
        aria-label="Scroll left"
      >
        <ChevronLeftIcon className="h-6 w-6 text-gray-700" />
      </button>
      
      {/* Carousel Container */}
      <div 
        ref={carouselRef} 
        className="flex overflow-x-auto hide-scrollbar gap-5 pb-4"
      >
        {crossSellProducts.map((product) => (
          <div 
            key={product.id}
            className="flex-none w-72 h-[400px] rounded-2xl overflow-hidden bg-white border border-gray-200 hover:border-[#FDBE02] hover:shadow-lg transition-all duration-300 flex flex-col"
            onMouseEnter={() => setActiveItem(product.id)}
            onMouseLeave={() => setActiveItem(null)}
          >
            <Link href={`/product/${product.slug}`} className=" h-full flex flex-col">
              {/* Product Image */}
              <div className="relative h-[220px] overflow-hidden bg-gray-100">
                <ProductImage 
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Category Tag */}
                <div className="absolute top-3 left-3 bg-black/20 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded">
                  {product.category}
                </div>
                
                {/* Add to Cart Hover Button */}
                <div 
                  className={`absolute bottom-3 right-3 transition-all duration-300 ${
                    activeItem === product.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                >
                  <button 
                    className={`w-10 h-10 rounded-full bg-[#FDBE02] text-white flex items-center justify-center shadow-md hover:bg-[#f57f17] transition-colors ${
                      addedToCart === product.id ? 'animate-bounce' : ''
                    }`}
                    onClick={(e) => handleAddToCart(e, product.id)}
                  >
                    <ShoppingCartIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              {/* Product Info */}
              <div className="p-4 flex-grow flex flex-col">
                <h3 className="font-semibold text-gray-800 mb-1 hover:text-[#f57f17] transition-colors line-clamp-1">
                  {product.name}
                </h3>
                
                <div className="flex items-center justify-between mt-auto">
                  <span className="font-bold text-lg text-[#f57f17]">
                    ${product.price.toFixed(2)}
                  </span>
                  
                  <span className="text-xs text-gray-500">
                    View Details
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      
      {/* Right Arrow */}
      <button 
        className={`absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg z-10 flex items-center justify-center transition-all duration-300 transform ${
          showRightButton ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8 pointer-events-none'
        }`}
        onClick={() => scrollCarousel('right')}
        aria-label="Scroll right"
      >
        <ChevronRightIcon className="h-6 w-6 text-gray-700" />
      </button>
      
      {/* Hide scrollbar with CSS */}
      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
} 