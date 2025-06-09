"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

// Import product data from ProductGrid
const products = [
  {
    "id": 1,
    "name": "Gopalbhog - 12kg",
    "description": "An early-season mango known for its sweet taste and minimal fiber content.",
    "price": 1270.00,
    "image": "/mangoes/gopal1.jpg",
    "badge": "Stock Ending",
    "rating": 4.5,
    "reviews": 120,
    "category": "Seasonal",
    "slug": "gopalbhog-mango-12kg",
    "featured": true,
    "priority": 1,
    "attributes": ["gluten-free"],
    "origin": "Rajshahi",
    "amount": 12
  },
  {
    "id": 2,
    "name": "Gopalbhog - 23kg",
    "description": "An early-season mango known for its sweet taste and minimal fiber content.",
    "price": 2299.00,
    "image": "/mangoes/gopal2.jpg",
    "badge": "Stock Ending",
    "rating": 4.5,
    "reviews": 120,
    "category": "Seasonal",
    "slug": "gopalbhog-mango-23kg",
    "featured": true,
    "priority": 2,
    "attributes": ["gluten-free"],
    "origin": "Rajshahi",
    "amount": 23
  },
  {
    "id": 3,
    "name": "Gopalbhog - 46kg",
    "description": "An early-season mango known for its sweet taste and minimal fiber content.",
    "price": 4349.00,
    "image": "/mangoes/gopal3.jpg",
    "badge": "Stock Ending",
    "rating": 4.5,
    "reviews": 120,
    "category": "Seasonal",
    "slug": "gopalbhog-mango-46kg",
    "featured": true,
    "priority": 3,
    "attributes": ["gluten-free"],
    "origin": "Rajshahi",
    "amount": 46
  },
   {
    "id": 4,
    "name": "Himsagar - 12kg",
    "description": "A popular variety with fiberless, juicy pulp and a rich aroma.",
    "price": 1189.00,
    "image": "/mangoes/himsagar4.jpg",
    "badge": "Peak Hour",
    "rating": 4.9,
    "reviews": 160,
    "category": "Seasonal",
    "slug": "himsagar-mango-12kg",
    "featured": true,
    "priority": 4,
    "attributes": ["gluten-free"],
    "origin": "Chapai Nawabganj",
    "amount": 12
  },
  {
    "id": 5,
    "name": "Himsagar - 23kg",
    "description": "A popular variety with fiberless, juicy pulp and a rich aroma.",
    "price": 2229.00,
    "image": "/mangoes/himsaga1.jpg",
    "badge": "Peak Hour",
    "rating": 4.9,
    "reviews": 160,
    "category": "Seasonal",
    "slug": "himsagar-mango-23kg",
    "featured": true,
    "priority": 5,
    "attributes": ["gluten-free"],
    "origin": "Chapai Nawabganj",
    "amount": 23
  },
  {
    "id": 6,
    "name": "Himsagar - 46kg",
    "description": "A popular variety with fiberless, juicy pulp and a rich aroma.",
    "price": 4279.00,
    "image": "/mangoes/himsagar3.jpg",
    "badge": "Peak Hour",
    "rating": 4.9,
    "reviews": 160,
    "category": "Seasonal",
    "slug": "himsagar-mango-46kg",
    "featured": true,
    "priority": 6,
    "attributes": ["gluten-free"],
    "origin": "Chapai Nawabganj",
    "amount": 46
  },
  {
    "id": 7,
    "name": "Khirsapat - 12kg",
    "description": "Premium Khirsapat mangoes from Chapainawabganj, celebrated for their sweet, fiberless flesh and rich aroma.",
    "price": 1189.00,
    "image": "/mangoes/khirsapat6.jpg",
    "badge": "Peak Hour",
    "rating": 4.8,
    "reviews": 102,
    "category": "Seasonal",
    "slug": "khirsapat-mango-12kg",
    "featured": true,
    "priority": 7,
    "attributes": ["gluten-free"],
    "origin": "Chapai Nawabganj",
    "amount": 12
  },
  {
    "id": 8,
    "name": "Khirsapat - 23kg",
    "description": "Bulk pack of Khirsapat mangoes, perfect for gatherings or sharing. Enjoy the authentic taste of Chapainawabganj's finest.",
    "price": 2229.00,
    "image": "/mangoes/khirsapat4.jpg",
    "badge": "Peak Hour",
    "rating": 4.8,
    "reviews": 102,
    "category": "Seasonal",
    "slug": "khirsapat-mango-23kg",
    "featured": true,
    "priority": 8,
    "attributes": ["gluten-free"],
    "origin": "Chapai Nawabganj",
    "amount": 23
  },
  {
    "id": 9,
    "name": "Khirsapat - 46kg",
    "description": "Family-sized pack of Khirsapat mangoes, ensuring everyone gets a taste of this delightful variety.",
    "price": 4279.00,
    "image": "/mangoes/khirsapat5.jpg",
    "badge": "Peak Hour",
    "rating": 4.8,
    "reviews": 102,
    "category": "Seasonal",
    "slug": "khirsapat-mango-46kg",
    "featured": true,
    "priority": 9,
    "attributes": ["gluten-free"],
    "origin": "Chapai Nawabganj",
    "amount": 46
  },
  {
    "id": 10,
    "name": "Amrupali - 12kg",
    "description": "A hybrid variety with deep orange flesh, known for its sweetness and longer shelf life.",
    "price": 0,
    "image": "/vercel.png",
    "badge": "Harvesting",
    "rating": 4.7,
    "reviews": 150,
    "category": "Seasonal",
    "slug": "amrupali-mango-12kg",
    "featured": true,
    "priority": 14,
    "attributes": ["gluten-free"],
    "origin": "Naogaon",
    "amount": 12
  },
  {
    "id": 11,
    "name": "Amrupali - 23kg",
    "description": "A hybrid variety with deep orange flesh, known for its sweetness and longer shelf life.",
    "price": 0,
    "image": "/vercel.png",
    "badge": "Harvesting",
    "rating": 4.7,
    "reviews": 150,
    "category": "Seasonal",
    "slug": "amrupali-mango-23kg",
    "featured": true,
    "priority": 15,
    "attributes": ["gluten-free"],
    "origin": "Naogaon",
    "amount": 23
  },
  {
    "id": 12,
    "name": "Amrupali - 46kg",
    "description": "A hybrid variety with deep orange flesh, known for its sweetness and longer shelf life.",
    "price": 0,
    "image": "/vercel.png",
    "badge": "Harvesting",
    "rating": 4.7,
    "reviews": 150,
    "category": "Seasonal",
    "slug": "amrupali-mango-46kg",
    "featured": true,
    "priority": 16,
    "attributes": ["gluten-free"],
    "origin": "Naogaon",
    "amount": 46
  },
  {
    "id": 13,
    "name": "Langra - 12kg",
    "description": "A mid-season mango with greenish skin even when ripe, offering a unique sweet-sour flavor.",
    "price": 0,
    "image": "/vercel.png",
    "badge": "coming soon",
    "rating": 4.6,
    "reviews": 110,
    "category": "Seasonal",
    "slug": "langra-mango-12kg",
    "featured": false,
    "priority": 17,
    "attributes": ["gluten-free"],
    "origin": "Chapai Nawabganj",
    "amount": 12
  },
  {
    "id": 14,
    "name": "Langra - 23kg",
    "description": "A mid-season mango with greenish skin even when ripe, offering a unique sweet-sour flavor.",
    "price": 0,
    "image": "/vercel.png",
    "badge": "coming soon",
    "rating": 4.6,
    "reviews": 110,
    "category": "Seasonal",
    "slug": "langra-mango-23kg",
    "featured": false,
    "priority": 18,
    "attributes": ["gluten-free"],
    "origin": "Chapai Nawabganj",
    "amount": 23
  },
  {
    "id": 15,
    "name": "Langra - 46kg",
    "description": "A mid-season mango with greenish skin even when ripe, offering a unique sweet-sour flavor.",
    "price": 0,
    "image": "/vercel.png",
    "badge": "coming soon",
    "rating": 4.6,
    "reviews": 110,
    "category": "Seasonal",
    "slug": "langra-mango-46kg",
    "featured": false,
    "priority": 19,
    "attributes": ["gluten-free"],
    "origin": "Chapai Nawabganj",
    "amount": 46
  }
 
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState('en');
  const [cartCount, setCartCount] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('/');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  // Detect scroll position for navbar background change
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Set active link based on current path
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setActiveLink(window.location.pathname);
    }
  }, []);

  // Handle search functionality
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setSearchResults([]);
      setShowResults(false);
      return;
    }
    
    // Filter products based on search query
    const filtered = products
      .filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) || 
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 3); // Get only top 3 results
    
    setSearchResults(filtered);
    setShowResults(true);
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setShowResults(false);
  };

  // Handle click outside to close search results
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.search-container')) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className={`w-full sticky top-0 z-50 transition-all duration-500 ${
      scrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg' : 'bg-white shadow-md'
    }`}>
      {/* SVG Background Pattern */}
      <div className="absolute inset-0 overflow-hidden opacity-5 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="mango-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M20 5 C25 0, 35 10, 30 20 S20 35, 10 30 S0 15, 10 5 S15 0, 20 5" fill="none" stroke="#FDBE02" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#mango-pattern)" />
        </svg>
      </div>

      <div className="mx-auto w-full px-4 py-3 flex flex-row justify-between items-center relative">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center space-x-2 group">

            {/* Custom Mango SVG Icon */}
             <Image 
      src="/vercel.svg" 
      alt="AmGo Logo" 
      width={98} 
      height={8} 
      className="object-contain"
    />
            {/* Mango highlight */}
         
          
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex space-x-6">
          <Link 
            href="/" 
            className="text-[#d00031] font-bold   transition-all duration-300 py-1 px-3 relative group overflow-hidden"
            onClick={() => setActiveLink('/')}
          >
            <span className="relative z-10 inline-block transition-transform duration-500 group-hover:flip-y group-hover:text-[#d00031]">Home</span>
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#d00031] to-[#d00031] origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 loading-bar"></span>
          </Link>
          <Link 
            href="/shop" 
            className="text-[#d00031] font-bold  transition-all duration-300 py-1 px-3 relative group overflow-hidden"
            onClick={() => setActiveLink('/shop')}
          >
            <span className="relative z-10 inline-block transition-transform duration-500 group-hover:flip-y group-hover:text-[#d00031]">Shop</span>
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#d00031] to-[#d00031] origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 loading-bar"></span>
          </Link>
          <Link 
            href="/about" 
            className="text-[#d00031] font-bold  transition-all duration-300 py-1 px-3 relative group overflow-hidden"
            onClick={() => setActiveLink('/about')}
          >
            <span className="relative z-10 inline-block transition-transform duration-500 group-hover:flip-y group-hover:text-[#d00031]">About</span>
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#d00031] to-[#d00031] origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 loading-bar"></span>
          </Link>
          <Link 
            href="/blog" 
            className="text-[#d00031] font-bold  transition-all duration-300 py-1 px-3 relative group overflow-hidden"
            onClick={() => setActiveLink('/blog')}
          >
            <span className="relative z-10 inline-block transition-transform duration-500 group-hover:flip-y group-hover:text-[#d00031]">Blog/Recipes</span>
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#d00031] to-[#d00031] origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 loading-bar"></span>
          </Link>
          <Link 
            href="/contact" 
            className="text-[#d00031] font-bold  transition-all duration-300 py-1 px-3 relative group overflow-hidden"
            onClick={() => setActiveLink('/contact')}
          >
            <span className="relative z-10 inline-block transition-transform duration-500 group-hover:flip-y group-hover:text-[#d00031]">Contact</span>
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#d00031] to-[#d00031] origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 loading-bar"></span>
          </Link>
        </div>

        {/* Search, User Options, and Mobile Menu */}
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="hidden md:block relative search-container">
            <div className="flex items-center border border-gray-300 rounded-full overflow-hidden px-3 py-1 focus-within:ring-2 focus-within:ring-[#d00031] transition-all duration-300 hover:shadow-md">
              <input 
                type="text" 
                placeholder="Search for mangoes..." 
                className="text-sm outline-none border-none bg-transparent w-32 xl:w-40 placeholder-[#d00031] text-[#d00031] font-medium"
                value={searchQuery}
                onChange={handleSearch}
                onFocus={() => searchResults.length > 0 && setShowResults(true)}
              />
              {searchQuery ? (
                <button 
                  onClick={clearSearch} 
                  className="p-1 text-[#d00031] hover:text-[#d00031] transition-all duration-300"
                >
                  <XMarkIcon className="h-5 w-5 text-[#d00031]" />
                </button>
              ) : (
                <button className="p-1 text-[#d00031] hover:text-[#d00031] transition-all duration-300 hover:rotate-12">
                  <MagnifyingGlassIcon className="h-5 w-5 text-[#d00031]" />
                </button>
              )}
            </div>
            
            {/* Search Results Dropdown */}
            {showResults && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">
                <div className="py-2">
                  {searchResults.map((product) => (
                    <Link 
                      key={product.id} 
                      href={`/shop/${product.slug}`}
                      className="flex items-center px-4 py-2 hover:bg-gray-50 transition-colors"
                      onClick={() => {
                        setShowResults(false);
                        clearSearch();
                      }}
                    >
                      <div className="w-10 h-10 rounded-md overflow-hidden mr-3">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-800">{product.name}</h4>
                        <p className="text-xs text-gray-500 truncate">{product.category}</p>
                      </div>
                      <div className="text-sm font-medium text-[#F57F17]">
                        ৳{product.price}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Account */}
          <button className="p-2 text-[#d00031] hover:text-[#d00031] transition-all duration-300 hover:rotate-6 relative group">
            <span className="absolute inset-0 rounded-full bg-amber-50 scale-0 group-hover:scale-100 transition-transform duration-300"></span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 relative z-10 text-[#d00031]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>

          {/* Cart with Badge */}
          <div className="relative group">
            <button className="p-2 text-[#d00031] hover:text-[#d00031] transition-all duration-300 relative">
              <span className="absolute inset-0 rounded-full bg-amber-50 scale-0 group-hover:scale-100 transition-transform duration-300"></span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 relative z-10 group-hover:scale-110 transition-transform duration-300 text-[#d00031]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </button>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#d00031] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center z-20 animate-pulse">
                {cartCount}
              </span>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="lg:hidden p-2 text-[#d00031] hover:text-[#d00031] transition-all duration-300 focus:outline-none relative group"
          >
            <span className="absolute inset-0 rounded-full bg-amber-50 scale-0 group-hover:scale-100 transition-transform duration-300"></span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 relative z-10 text-[#d00031]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 py-3 space-y-4 bg-white shadow-inner">
          {/* Mobile Search */}
          <div className="relative md:hidden search-container">
            <div className="flex items-center border border-gray-300 rounded-full overflow-hidden px-3 py-2 focus-within:ring-2 focus-within:ring-[#d00031] transition-all duration-300">
              <input 
                type="text" 
                placeholder="Search for mangoes..." 
                className="text-sm outline-none border-none bg-transparent w-full placeholder-[#d00031] text-[#d00031] font-medium"
                value={searchQuery}
                onChange={handleSearch}
                onFocus={() => searchResults.length > 0 && setShowResults(true)}
              />
              {searchQuery ? (
                <button 
                  onClick={clearSearch} 
                  className="p-1 text-[#d00031] hover:text-[#d00031] transition-all duration-300"
                >
                  <XMarkIcon className="h-5 w-5 text-[#d00031]" />
                </button>
              ) : (
                <button className="p-1 text-[#d00031] hover:text-[#d00031] transition-all duration-300">
                  <MagnifyingGlassIcon className="h-5 w-5 text-[#d00031]" />
                </button>
              )}
            </div>
            
            {/* Mobile Search Results */}
            {showResults && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">
                <div className="py-2">
                  {searchResults.map((product) => (
                    <Link 
                      key={product.id} 
                      href={`/shop/${product.slug}`}
                      className="flex items-center px-4 py-2 hover:bg-gray-50 transition-colors"
                      onClick={() => {
                        setShowResults(false);
                        clearSearch();
                        setIsOpen(false);
                      }}
                    >
                      <div className="w-10 h-10 rounded-md overflow-hidden mr-3">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-800">{product.name}</h4>
                        <p className="text-xs text-gray-500 truncate">{product.category}</p>
                      </div>
                      <div className="text-sm font-medium text-[#F57F17]">
                        ৳{product.price}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Mobile Navigation Links */}
          <div className="flex flex-col space-y-2">
            <Link 
              href="/" 
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${activeLink === '/' ? 'bg-[#d00031]/10 text-[#d00031] font-medium' : 'text-[#d00031] hover:bg-gray-100'}`}
              onClick={() => {
                setActiveLink('/');
                setIsOpen(false);
              }}
            >
              Home
            </Link>
            <Link 
              href="/shop" 
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${activeLink === '/shop' ? 'bg-[#d00031]/10 text-[#d00031] font-medium' : 'text-[#d00031] hover:bg-gray-100'}`}
              onClick={() => {
                setActiveLink('/shop');
                setIsOpen(false);
              }}
            >
              Shop
            </Link>
            <Link 
              href="/about" 
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${activeLink === '/about' ? 'bg-[#d00031]/10 text-[#d00031] font-medium' : 'text-[#d00031] hover:bg-gray-100'}`}
              onClick={() => {
                setActiveLink('/about');
                setIsOpen(false);
              }}
            >
              About
            </Link>
            <Link 
              href="/blog" 
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${activeLink === '/blog' ? 'bg-[#d00031]/10 text-[#d00031] font-medium' : 'text-[#d00031] hover:bg-gray-100'}`}
              onClick={() => {
                setActiveLink('/blog');
                setIsOpen(false);
              }}
            >
              Blog/Recipes
            </Link>
            <Link 
              href="/contact" 
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${activeLink === '/contact' ? 'bg-[#d00031]/10 text-[#d00031] font-medium' : 'text-[#d00031] hover:bg-gray-100'}`}
              onClick={() => {
                setActiveLink('/contact');
                setIsOpen(false);
              }}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}