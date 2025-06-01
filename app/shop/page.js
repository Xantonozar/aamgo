"use client";

import { Suspense, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Link from 'next/link';
import ProductGrid, { FilterContext } from './components/ProductGrid';
import FilterPanel from './components/FilterPanel';
import VideoHero from './components/VideoHero';
import CrossSellCarousel from './components/CrossSellCarousel';
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon, ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

// Banner component with error handling
const PromotionalBanner = () => {
  return (
    <div className="rounded-3xl overflow-hidden relative">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#f57f17]/90 to-[#FDBE02]/90 mix-blend-multiply"></div>
        <Image
          src="https://images.unsplash.com/photo-1591073113125-e46713c829ed?q=80&w=2069"
          alt="Mango orchard"
          fill
          className="object-cover"
          priority
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?q=80&w=2070";
          }}
        />
      </div>
      <div className="relative py-16 px-8 md:px-16 flex flex-col items-start">
        <span className="bg-white/20 text-white text-sm font-medium px-4 py-1 rounded-full mb-6">Limited Time Offer</span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white max-w-xl mb-6">20% Off Premium Mango Varieties</h2>
        <p className="text-white/90 text-lg max-w-xl mb-8">
          Experience the finest mangoes handpicked from our orchards. Limited stock available for this season!
        </p>
        <Link 
          href="#premium-collection" 
          className="inline-flex items-center bg-white text-[#f57f17] px-8 py-4 rounded-full font-bold hover:bg-[#f8f4e9] transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-transform"
        >
          Shop Now
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default function ShopPage() {
  // Filter states for context
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [selectedOrigins, setSelectedOrigins] = useState([]);
  const [selectedAmounts, setSelectedAmounts] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 50000]);
  
  // Search and sort states
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('Featured');
  
  // Clear all filters function
  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedPriceRanges([]);
    setSelectedRatings([]);
    setSelectedAttributes([]);
    setSelectedOrigins([]);
    setSelectedAmounts([]);
    setPriceRange([0, 50000]);
    setSearchQuery('');
  };
  
  // Filter context value
  const filterContextValue = {
    selectedCategories,
    setSelectedCategories,
    selectedPriceRanges,
    setSelectedPriceRanges,
    selectedRatings,
    setSelectedRatings,
    selectedAttributes,
    setSelectedAttributes,
    selectedOrigins,
    setSelectedOrigins,
    selectedAmounts,
    setSelectedAmounts,
    priceRange,
    setPriceRange,
    searchQuery,
    setSearchQuery,
    sortOption,
    setSortOption,
    clearAllFilters
  };

  useEffect(() => {
    const filterToggle = document.querySelector('[data-filter-toggle]');
    const filterPanel = document.querySelector('[data-filter-panel]');
    const filterOverlay = document.querySelector('[data-filter-overlay]');
    const filterClose = document.querySelector('[data-filter-close]');
    
    if (filterToggle && filterPanel && filterOverlay && filterClose) {
      const toggleFilterPanel = () => {
        filterPanel.classList.toggle('translate-x-full');
        filterOverlay.classList.toggle('opacity-0');
        filterOverlay.classList.toggle('pointer-events-none');
        document.body.classList.toggle('overflow-hidden');
      };
      
      const closeFilterPanel = () => {
        filterPanel.classList.add('translate-x-full');
        filterOverlay.classList.add('opacity-0');
        filterOverlay.classList.add('pointer-events-none');
        document.body.classList.remove('overflow-hidden');
      };
      
      filterToggle.addEventListener('click', toggleFilterPanel);
      filterClose.addEventListener('click', closeFilterPanel);
      filterOverlay.addEventListener('click', closeFilterPanel);
      
      return () => {
        filterToggle.removeEventListener('click', toggleFilterPanel);
        filterClose.removeEventListener('click', closeFilterPanel);
        filterOverlay.removeEventListener('click', closeFilterPanel);
      };
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Transparent/Sticky Navbar will be handled by the Navbar component */}
      <Navbar />
      
      <main>
        {/* Full-width Video Hero Section */}
        <VideoHero />
        
        {/* Shop Content Section */}
        <section className="relative bg-white">
          {/* Wave separator */}
          <div className="absolute top-0 left-0 right-0 w-full h-16 overflow-hidden">
            <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="h-full w-full">
              <path d="M0.00,49.98 C150.00,150.00 349.20,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" 
                className="fill-white"></path>
            </svg>
          </div>
          
          <div className="container mx-auto px-4 pt-20 pb-24">
            {/* Shop Header with search, filter toggle and sort options */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-1">Our Mango Collection</h1>
                <p className="text-gray-500">Discover and shop our premium mangoes</p>
              </div>
              
              <div className="flex flex-col md:flex-row items-start md:items-center mt-4 md:mt-0 gap-3">
                {/* Search Bar */}
                <div className="relative w-full md:w-64">
                  <input
                    type="text"
                    placeholder="Search mangoes..."
                    className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FDBE02] focus:border-transparent transition-all text-gray-800 font-medium"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  {searchQuery.trim() !== '' && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 hover:text-gray-600"
                      aria-label="Clear search"
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  )}
                </div>
                
                {/* Filter Toggle Button */}
                <button 
                  className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  data-filter-toggle
                >
                  <AdjustmentsHorizontalIcon className="h-5 w-5" />
                  <span>Filters</span>
                </button>
                
                {/* Sort Dropdown */}
                <div className="relative group">
                  <button className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                    <span>Sort By: {sortOption}</span>
                    <ChevronDownIcon className="h-4 w-4 transition-transform group-hover:rotate-180" />
                  </button>
                  
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right scale-95 group-hover:scale-100">
                    <div className="py-1">
                      {['Featured', 'Newest', 'Price: Low to High', 'Price: High to Low', 'Amount: Low to High', 'Amount: High to Low', 'Best Selling'].map((option) => (
                        <button 
                          key={option} 
                          className={`block px-4 py-2 text-sm w-full text-left transition-colors ${sortOption === option ? 'bg-[#f57f17]/10 text-[#f57f17]' : 'text-gray-700 hover:bg-gray-50 hover:text-[#f57f17]'}`}
                          onClick={() => setSortOption(option)}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main Content with Slide-out Filter Panel */}
            <FilterContext.Provider value={filterContextValue}>
              <div className="relative">
                {/* Overlay for when filter panel is open (mobile) */}
                <div className="fixed inset-0 bg-black/30 opacity-0 pointer-events-none transition-opacity z-40" data-filter-overlay></div>
                
                {/* Slide-out Filter Panel */}
                <div className="fixed top-0 right-0 h-full w-[320px] bg-white shadow-2xl z-50 transform translate-x-full transition-transform duration-300 ease-in-out" data-filter-panel>
                  <div className="h-full overflow-y-auto">
                    <div className="p-5">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-gray-900">Filters</h3>
                        <button className="text-gray-500 hover:text-gray-900" data-filter-close>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      
                      <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading filters...</div>}>
                        <FilterPanel />
                      </Suspense>
                    </div>
                  </div>
                </div>
                
                {/* Active Filters Chips */}
                <div className="flex flex-wrap gap-2 mb-6" data-active-filters>
                  {/* These will be populated dynamically with JavaScript */}
                </div>
                
                {/* Product Grid */}
                <div className="relative" id="product-grid">
                  <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading products...</div>}>
                    <ProductGrid />
                  </Suspense>
                  
                  {/* Load More Button */}
                  <div className="mt-12 text-center">
                    <button className="inline-flex items-center justify-center bg-[#f8f4e9] hover:bg-[#f9a825]/10 text-[#f57f17] font-medium px-8 py-3 rounded-full transition-all duration-300 group">
                      <span className="mr-2">Load More</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-y-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </FilterContext.Provider>
          </div>
        </section>
        
        {/* Cross-sell Carousel */}
        <section className="py-16 bg-gradient-to-br from-[#f8f4e9] to-white" id="premium-varieties">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">You May Also Like</h2>
            {/* <CrossSellCarousel /> */}
          </div>
        </section>
        
        {/* Promotional Banner */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <PromotionalBanner />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}