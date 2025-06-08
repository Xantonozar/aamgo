"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useEffect, createContext, useContext } from 'react';
import { StarIcon, HeartIcon, ShoppingCartIcon, EyeIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid, StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

// Create FilterContext to share filter state between components
export const FilterContext = createContext();

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
      className={`${className} w-full h-full object-cover`}
      onError={handleError}
      style={{ aspectRatio: '1/1' }}
    />
  );
};

// Example reviews data for each product
const reviewsData = [
  { name: 'রহিম উদ্দিন', text: 'এই আমটা খুবই মিষ্টি ও রসালো।' },
  { name: 'সাবিনা আক্তার', text: 'খুব ভালো মানের আম, সময়মতো ডেলিভারি পেয়েছি।' },
  { name: 'মোঃ কামরুল', text: 'স্বাদে অসাধারণ, আবার অর্ডার করবো।' },
  { name: 'শারমিন সুলতানা', text: 'পরিবারের সবাই খুব পছন্দ করেছে।' },
  { name: 'তানভীর হাসান', text: 'একদম ফ্রেশ ও টাটকা আম।' },
  { name: 'রুবিনা পারভীন', text: 'দাম অনুযায়ী মান ভালো।' },
  { name: 'মোঃ সোহেল', text: 'খুব দ্রুত ডেলিভারি পেয়েছি।' },
  { name: 'নাজমুল ইসলাম', text: 'খুবই সুস্বাদু ও মজার আম।' },
];

// Sample product data with enhanced details
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
    "name": "Amrapali - 12kg",
    "description": "A hybrid variety with deep orange flesh, known for its sweetness and longer shelf life.",
    "price": 0,
    "image": "/vercel.png",
    "badge": "Harvesting",
    "rating": 4.7,
    "reviews": 150,
    "category": "Seasonal",
    "slug": "amrapali-mango-12kg",
    "featured": true,
    "priority": 14,
    "attributes": ["gluten-free"],
    "origin": "Naogaon",
    "amount": 12
  },
  {
    "id": 11,
    "name": "Amrapali - 23kg",
    "description": "A hybrid variety with deep orange flesh, known for its sweetness and longer shelf life.",
    "price": 0,
    "image": "/vercel.png",
    "badge": "Harvesting",
    "rating": 4.7,
    "reviews": 150,
    "category": "Seasonal",
    "slug": "amrapali-mango-23kg",
    "featured": true,
    "priority": 15,
    "attributes": ["gluten-free"],
    "origin": "Naogaon",
    "amount": 23
  },
  {
    "id": 12,
    "name": "Amrapali - 46kg",
    "description": "A hybrid variety with deep orange flesh, known for its sweetness and longer shelf life.",
    "price": 0,
    "image": "/vercel.png",
    "badge": "Harvesting",
    "rating": 4.7,
    "reviews": 150,
    "category": "Seasonal",
    "slug": "amrapali-mango-46kg",
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
 
].map((product, i) => ({
  ...product,
  reviewsList: [reviewsData[i % reviewsData.length]],
}));

export default function ProductGrid() {
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [quickView, setQuickView] = useState(null);
  const [addedToCart, setAddedToCart] = useState(null);
  const [notification, setNotification] = useState(null);
  const notificationTimeoutRef = useRef(null);
  
  // Use the shared FilterContext instead of local state
  const {
    selectedCategories = [],
    selectedPriceRanges = [],
    selectedRatings = [],
    selectedAttributes = [],
    selectedOrigins = [],
    priceRange = [0, 100],
    selectedAmounts = [],
    searchQuery = '',
    sortOption = 'Featured',
    clearAllFilters = () => {}
  } = useContext(FilterContext) || {};
  
  // Filtered products state
  const [filteredProducts, setFilteredProducts] = useState(products);
  
  // Apply filters whenever filter states change
  useEffect(() => {
    let result = [...products];
    
    // Filter by search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query) || 
        product.category.toLowerCase().includes(query) ||
        product.origin.toLowerCase().includes(query) ||
        (product.amount && `${product.amount}kg`.includes(query))
      );
    }
    
    // Filter by categories
    if (selectedCategories.length > 0) {
      result = result.filter(product => 
        selectedCategories.includes(product.category.toLowerCase())
      );
    }
    
    // Filter by price ranges
    if (selectedPriceRanges.length > 0) {
      const priceFiltered = [];
      selectedPriceRanges.forEach(range => {
        let min = 0;
        let max = 1000;
        
        if (range === 'under-1k') {
          min = 0;
          max = 1000;
        } else if (range === '1k-2k') {
          min = 1000;
          max = 2000;
        } else if (range === '2k-3k') {
          min = 2000;
          max = 3000;
        } else if (range === '3k-plus') {
          min = 3000;
          max = 5000;
        }
        
        const filtered = result.filter(
          product => product.price >= min && product.price <= max
        );
        priceFiltered.push(...filtered);
      });
      
      // Remove duplicates
      result = [...new Set(priceFiltered)];
    }
    
    // Filter by custom price range
    result = result.filter(
      product => product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Filter by ratings
    if (selectedRatings.length > 0) {
      result = result.filter(product => 
        selectedRatings.some(rating => product.rating >= rating)
      );
    }
    
    // Filter by attributes
    if (selectedAttributes.length > 0) {
      result = result.filter(product => 
        selectedAttributes.some(attr => product.attributes && product.attributes.includes(attr))
      );
    }
    
    // Filter by origins
    if (selectedOrigins.length > 0) {
      result = result.filter(product => 
        selectedOrigins.includes(product.origin)
      );
    }
    
    // Filter by selected amounts
    if (selectedAmounts.length > 0) {
      result = result.filter(product => selectedAmounts.includes(product.amount));
    }
    
    // Sort products based on selected option
    if (sortOption === 'Newest') {
      // Assuming newer products have higher IDs
      result.sort((a, b) => b.id - a.id);
    } else if (sortOption === 'Price: Low to High') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'Price: High to Low') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'Best Selling') {
      // Assuming reviews count indicates popularity
      result.sort((a, b) => b.reviews - a.reviews);
    } else if (sortOption === 'Amount: Low to High') {
      result.sort((a, b) => a.amount - b.amount);
    } else if (sortOption === 'Amount: High to Low') {
      result.sort((a, b) => b.amount - a.amount);
    } else {
      // Default 'Featured' sorting - by priority and featured status
      result.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return a.priority - b.priority;
      });
    }
    
    setFilteredProducts(result);
  }, [selectedCategories, selectedPriceRanges, selectedRatings, selectedAttributes, selectedOrigins, priceRange, selectedAmounts, searchQuery, sortOption]);
  
  // Toggle wishlist
  const toggleWishlist = (e, productId) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter(id => id !== productId));
      
      // Show feedback when removing
      const product = products.find(p => p.id === productId);
      if (product) {
        showNotification(`${product.name} removed from wishlist`);
      }
    } else {
      setWishlist([...wishlist, productId]);
      
      // Show feedback when adding
      const product = products.find(p => p.id === productId);
      if (product) {
        showNotification(`${product.name} added to wishlist`);
      }
    }
  };
  
  // Toggle quick view modal
  const toggleQuickView = (e, productId = null) => {
    e?.preventDefault();
    e?.stopPropagation();
    
    setQuickView(productId);
    
    // If opening modal, prevent body scroll
    if (productId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };
  
  // Add to cart
  const addToCart = (e, productId) => {
    e.preventDefault();
    e.stopPropagation();
    
    setAddedToCart(productId);
    
    // Reset animation after 1 second
    setTimeout(() => {
      setAddedToCart(null);
    }, 1000);
    
    // Show notification
    const product = products.find(p => p.id === productId);
    if (product) {
      showNotification(`${product.name} added to cart`);
    }
  };
  
  // Show notification toast
  const showNotification = (message) => {
    setNotification(message);
    
    // Clear existing timeout
    if (notificationTimeoutRef.current) {
      clearTimeout(notificationTimeoutRef.current);
    }
    
    // Auto-hide after 3 seconds
    notificationTimeoutRef.current = setTimeout(() => {
      setNotification(null);
    }, 3000);
  };
  
  // Clean up timeouts on unmount
  useEffect(() => {
    return () => {
      if (notificationTimeoutRef.current) {
        clearTimeout(notificationTimeoutRef.current);
      }
    };
  }, []);
  
  // Render star rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<StarIconSolid key={`full-${i}`} className="h-4 w-4 text-[#FDBE02]" />);
    }
    
    // Half star
    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <StarIcon className="h-4 w-4 text-gray-300" />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <StarIconSolid className="h-4 w-4 text-[#FDBE02]" />
          </div>
        </div>
      );
    }
    
    // Empty stars
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<StarIcon key={`empty-${i}`} className="h-4 w-4 text-gray-300" />);
    }
    
    return stars;
  };
  
  // Get grid span for masonry layout
  const getGridSpan = (product) => {
    if (product.featured && product.priority === 1) {
      return 'row-span-2';
    } else if (product.featured) {
      return 'row-span-1 md:row-span-2';
    }
    return '';
  };
  
  return (
    <div className="relative">
      {/* Show message when search is active */}
      {searchQuery.trim() !== '' && (
        <div className="mb-4 text-sm">
          <p className="text-gray-600">
            Showing results for <span className="font-semibold text-gray-800">"{searchQuery}"</span>
            {filteredProducts.length === 0 ? (
              <span className="ml-1">- No products found</span>
            ) : (
              <span className="ml-1">- {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found</span>
            )}
          </p>
        </div>
      )}
      
      {/* No products message */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-16 px-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No products match your filters</h3>
          <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
          <button
            onClick={clearAllFilters}
            className="px-6 py-2 bg-[#f57f17] text-white rounded-full hover:bg-[#f57f17]/90 transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}
      
      {/* Masonry Grid Layout */}
      {filteredProducts.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
             <div 
              key={product.id} 
              className="bg-white rounded-xl overflow-hidden group cursor-pointer transform hover:-translate-y-1 transition-all duration-500 hover:shadow-[0_10px_20px_rgba(249,168,37,0.2)] relative"
            >
              {/* Image container with overlay effect */}
              <div className="relative w-full pb-[75%] overflow-hidden">
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#f57f17]/70 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Quick action buttons that appear on hover */}
            
                
                {/* Product image with zoom effect */}
                <Image 
                  src={product.image}
                  alt={product.name}
                  fill
                  style={{objectFit: 'cover'}}
                  sizes="(max-width: 640px) 45vw, (max-width: 768px) 33vw, 25vw"
                  className="transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Badge with pulse animation */}
                {product.badge && (
                  <span className="absolute top-2 right-2 bg-[#e65100] text-white text-[10px] md:text-xs font-bold px-2 py-0.5 rounded-full z-10 shadow-sm animate-pulse">
                    {product.badge}
                  </span>
                )}
              </div>
              
              {/* Product info with staggered reveal on hover */}
              <div className="p-3 md:p-4">
                <h3 className="font-bold text-sm md:text-base mb-1 text-[#333333] group-hover:text-[#f57f17] transition-colors duration-300 truncate">{product.name}</h3>
                <p className="text-[#555555] text-xs mb-3 line-clamp-2 transition-all duration-300 group-hover:text-[#333333]">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-sm md:text-base text-[#2e7d32] transition-all duration-300 group-hover:scale-110 inline-block">৳{product.price}</span>
                  <Link href="https://forms.gle/V5cx17et4QCsR5FZ9" >
                  <button className="bg-[#f9a825] text-[#333333] px-3 py-1.5 rounded-full text-xs font-medium group-hover:bg-[#f57f17] group-hover:text-white transition-all duration-300 relative overflow-hidden shadow-sm">
                    <span className="relative z-10">Book Now</span>
                    <span className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                  </button>
                </Link>
                </div>
              </div>
              
              {/* Corner decorative element */}
              <div className="absolute -bottom-4 -right-4 w-8 h-8 rounded-full bg-[#f9a825]/10 transition-all duration-500 group-hover:scale-150 group-hover:bg-[#f9a825]/20"></div>
            </div>
          ))}
        </div>
      )}
      
      {/* Quick View Modal */}
      {quickView && (
        <div className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div 
            className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="absolute top-4 right-4 z-10 bg-white rounded-full p-1 hover:bg-gray-100 transition-colors"
              onClick={(e) => toggleQuickView(e)}
            >
              <XMarkIcon className="h-6 w-6 text-gray-700" />
            </button>
            
            <div className="flex flex-col md:flex-row">
              {/* Product Image */}
              <div className="md:w-1/2 relative">
                {/* Product Badge */}
                {products.find(p => p.id === quickView)?.badge && (
                  <div className={`absolute top-3 left-3 z-10 px-3 py-1 rounded-full text-xs font-medium text-white ${
                    products.find(p => p.id === quickView)?.badge === 'Sale' ? 'bg-red-500' :
                    products.find(p => p.id === quickView)?.badge === 'New' ? 'bg-[#f57f17]' :
                    products.find(p => p.id === quickView)?.badge === 'Bestseller' ? 'bg-[#FDBE02]' :
                    products.find(p => p.id === quickView)?.badge === 'Limited' ? 'bg-purple-600' :
                    products.find(p => p.id === quickView)?.badge === 'Organic' ? 'bg-green-600' :
                    products.find(p => p.id === quickView)?.badge === 'Seasonal' ? 'bg-blue-500' :
                    'bg-gray-700'
                  }`}>
                    {products.find(p => p.id === quickView)?.badge}
                  </div>
                )}
                
                <ProductImage 
                  src={products.find(p => p.id === quickView)?.image} 
                  alt={products.find(p => p.id === quickView)?.name}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              
              {/* Product Details */}
              <div className="md:w-1/2 p-6 md:p-8 flex flex-col">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {products.find(p => p.id === quickView)?.name}
                </h2>
                
                <div className="flex items-center mb-4">
                  <div className="flex mr-2">
                    {renderStars(products.find(p => p.id === quickView)?.rating || 0)}
                  </div>
                  <span className="text-sm text-gray-600">
                    {products.find(p => p.id === quickView)?.reviews} reviews
                  </span>
                </div>
                
                <p className="text-gray-700 mb-6">
                  {products.find(p => p.id === quickView)?.description}
                </p>
                
                <div className="mb-6">
                  <div className="flex items-baseline mb-2">
                    {products.find(p => p.id === quickView)?.originalPrice && (
                      <span className="text-gray-400 line-through text-lg mr-3">
                        {products.find(p => p.id === quickView)?.originalPrice ? `৳${products.find(p => p.id === quickView)?.originalPrice.toFixed(2)}` : ''}
                      </span>
                    )}
                    <span className="font-bold text-2xl text-[#f57f17]">
                      ৳{products.find(p => p.id === quickView)?.price.toFixed(2)}
                    </span>
                  </div>
                  <span className="text-sm text-green-600">In Stock</span>
                </div>
                
                <div className="flex flex-wrap gap-4 mb-8">
                  <div className="w-full sm:w-auto">
                    <button 
                      className="w-full bg-[#f57f17] hover:bg-[#FDBE02] text-white py-3 px-8 rounded-full font-medium flex items-center justify-center transition-colors"
                      onClick={(e) => {
                        addToCart(e, quickView);
                        toggleQuickView(e);
                      }}
                    >
                      <ShoppingCartIcon className="h-5 w-5 mr-2" />
                      Add to Cart
                    </button>
                  </div>
                  
                  <div className="w-full sm:w-auto">
                    <button 
                      className={`w-full border border-gray-300 py-3 px-8 rounded-full font-medium flex items-center justify-center transition-colors ${
                        wishlist.includes(quickView) 
                          ? 'bg-[#f57f17]/10 border-[#f57f17] text-[#f57f17]' 
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                      onClick={(e) => toggleWishlist(e, quickView)}
                    >
                      {wishlist.includes(quickView) 
                        ? <HeartIconSolid className="h-5 w-5 mr-2" /> 
                        : <HeartIcon className="h-5 w-5 mr-2" />
                      }
                      {wishlist.includes(quickView) ? 'Added to Wishlist' : 'Add to Wishlist'}
                    </button>
                  </div>
                </div>
                
                <div className="mt-auto">
                  <h4 className="font-medium text-gray-800 mb-2">Product Details</h4>
                  <div className="text-sm text-gray-600">
                    <p className="mb-1">• Category: {products.find(p => p.id === quickView)?.category}</p>
                    <p className="mb-1">• Freshly harvested and shipped</p>
                    <p className="mb-1">• Premium quality guarantee</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Notification Toast */}
      <div 
        className={`fixed bottom-5 right-5 bg-white rounded-lg shadow-lg p-4 transition-all duration-300 transform z-50 ${
          notification ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex items-center">
          <div className="bg-[#FDBE02]/20 rounded-full p-2 mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#f57f17]" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="text-gray-700">{notification}</p>
        </div>
      </div>
    </div>
  );
}