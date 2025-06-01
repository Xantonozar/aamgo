"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function CartPage() {
  // Sample cart data - in a real app, this would come from context/state management
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Alphonso Mango',
      variety: 'Premium Grade',
      weight: '1kg Box',
      price: 24.99,
      quantity: 2,
      image: 'https://images.pexels.com/photos/918643/pexels-photo-918643.jpeg?auto=compress&cs=tinysrgb&w=1000'
    },
    {
      id: 2,
      name: 'Mango Gift Box',
      variety: 'Mixed Varieties',
      weight: '2kg Assorted',
      price: 39.99,
      quantity: 1,
      image: 'https://images.pexels.com/photos/5946081/pexels-photo-5946081.jpeg?auto=compress&cs=tinysrgb&w=1000'
    }
  ]);
  
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState('');
  
  // Calculate cart totals
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 75 ? 0 : 5.99;
  const tax = subtotal * 0.05; // 5% tax rate
  const total = subtotal + shipping + tax - discount;
  
  // Cross-sell suggestions
  const suggestedProducts = [
    {
      id: 3,
      name: 'Dried Mango Slices',
      price: 12.99,
      image: 'https://images.pexels.com/photos/4393436/pexels-photo-4393436.jpeg?auto=compress&cs=tinysrgb&w=1000'
    },
    {
      id: 4,
      name: 'Mango Chutney',
      price: 8.99,
      image: 'https://images.pexels.com/photos/4022220/pexels-photo-4022220.jpeg?auto=compress&cs=tinysrgb&w=1000'
    }
  ];
  
  // Handle quantity change
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(cartItems.map(item => 
      item.id === id ? {...item, quantity: newQuantity} : item
    ));
  };
  
  // Remove item from cart
  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };
  
  // Apply promo code
  const applyPromoCode = () => {
    // Reset previous states
    setError('');
    setPromoApplied(false);
    setDiscount(0);
    
    // Simple promo code example - in a real app, this would validate against a database
    if (promoCode.toUpperCase() === 'MANGO20') {
      setPromoApplied(true);
      setDiscount(subtotal * 0.2); // 20% discount
    } else {
      setError('Invalid promo code. Please try again.');
    }
  };
  
  return (
    <main className="min-h-screen py-8 bg-gradient-to-b from-amber-50 to-white">
      {/* Progress indicator */}
      <div className="container mx-auto px-4 mb-8">
        <div className="flex justify-center items-center">
          <div className="w-full max-w-2xl">
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-[#FDBE02] bg-amber-100">
                  Cart
                </div>
                <div className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-gray-400 bg-gray-200">
                  Checkout
                </div>
                <div className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-gray-400 bg-gray-200">
                  Confirmation
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                <div style={{ width: "33%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-[#FDBE02] to-[#F57F17]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items Section */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="text-[#FDBE02] mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </span>
                Your Cart
                <span className="ml-2 text-sm font-medium text-gray-500">({cartItems.length} items)</span>
              </h2>
              
              {cartItems.length === 0 ? (
                <div className="text-center py-8">
                  <div className="mx-auto w-16 h-16 mb-4 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">Your cart is empty</h3>
                  <p className="text-gray-500 mb-6">Looks like you haven't added any mangoes to your cart yet.</p>
                  <Link 
                    href="/shop" 
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-[#FDBE02] to-[#F57F17] hover:from-[#F57F17] hover:to-[#FDBE02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FDBE02]"
                  >
                    Browse Our Mangoes
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex flex-col sm:flex-row py-6 first:pt-0 last:pb-0">
                      <div className="sm:w-24 sm:h-24 h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 group-hover:border-[#FDBE02] transition-colors duration-300 relative">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, 25vw"
                        />
                      </div>
                      
                      <div className="sm:ml-6 mt-4 sm:mt-0 flex-1 flex flex-col">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="text-lg font-medium text-gray-700">{item.name}</h3>
                            <p className="mt-1 text-sm text-gray-500">{item.variety}</p>
                            <p className="mt-1 text-sm text-gray-500">{item.weight}</p>
                          </div>
                          <p className="text-base font-medium text-[#F57F17]">${item.price.toFixed(2)}</p>
                        </div>
                        
                        <div className="flex-1 flex items-end justify-between mt-4">
                          <div className="flex items-center border border-gray-300 rounded-md">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-3 py-1 text-gray-600 hover:text-[#F57F17] focus:outline-none"
                            >
                              -
                            </button>
                            <span className="px-3 py-1 text-gray-700">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-3 py-1 text-gray-600 hover:text-[#F57F17] focus:outline-none"
                            >
                              +
                            </button>
                          </div>
                          
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="text-sm font-medium text-gray-500 hover:text-red-500 transition-colors focus:outline-none"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Cross-sell section */}
            {cartItems.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">You might also like</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {suggestedProducts.map((product) => (
                    <div key={product.id} className="flex items-center border border-gray-200 rounded-lg p-3 hover:border-[#FDBE02] transition-colors duration-300 group cursor-pointer">
                      <div className="relative w-16 h-16 flex-shrink-0 rounded overflow-hidden">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, 20vw"
                        />
                      </div>
                      <div className="ml-4 flex-1">
                        <h4 className="text-sm font-medium text-gray-700 group-hover:text-[#F57F17] transition-colors">{product.name}</h4>
                        <p className="text-sm font-medium text-[#F57F17]">${product.price.toFixed(2)}</p>
                      </div>
                      <button className="ml-2 p-2 text-gray-400 hover:text-[#FDBE02] focus:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Order Summary Section */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-800 font-medium">${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-800 font-medium">
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (5%)</span>
                  <span className="text-gray-800 font-medium">${tax.toFixed(2)}</span>
                </div>
                
                {promoApplied && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount (MANGO20)</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="border-t border-gray-200 pt-4 flex justify-between">
                  <span className="text-lg font-bold text-gray-800">Total</span>
                  <span className="text-lg font-bold text-[#F57F17]">${total.toFixed(2)}</span>
                </div>
              </div>
              
              {/* Promo code section */}
              <div className="mb-6">
                <label htmlFor="promo-code" className="block text-sm font-medium text-gray-700 mb-2">
                  Promo Code
                </label>
                <div className="flex">
                  <input
                    type="text"
                    id="promo-code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-l-md border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#FDBE02] focus:border-[#FDBE02] sm:text-sm"
                  />
                  <button
                    onClick={applyPromoCode}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-r-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-[#FDBE02] to-[#F57F17] hover:from-[#F57F17] hover:to-[#FDBE02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FDBE02]"
                  >
                    Apply
                  </button>
                </div>
                {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
                {promoApplied && <p className="mt-2 text-sm text-green-600">Promo code applied successfully!</p>}
              </div>
              
              {/* Estimated delivery section */}
              <div className="mb-6 bg-amber-50 p-4 rounded-md">
                <div className="flex items-start">
                  <div className="flex-shrink-0 text-[#FDBE02]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-gray-800">Estimated Delivery</h4>
                    <p className="mt-1 text-sm text-gray-600">
                      {shipping === 0 ? 'Jun 24 - Jun 26' : 'Jun 22 - Jun 24'} 
                      <span className="block mt-1 text-xs">
                        (Free shipping on orders over $75)
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              
              {/* CTA buttons */}
              <div className="space-y-4">
                <Link
                  href="/checkout"
                  className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gradient-to-r from-[#FDBE02] to-[#F57F17] hover:from-[#F57F17] hover:to-[#FDBE02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FDBE02] transition-all duration-300 transform hover:-translate-y-1"
                  aria-disabled={cartItems.length === 0}
                  style={{ opacity: cartItems.length === 0 ? 0.5 : 1, pointerEvents: cartItems.length === 0 ? 'none' : 'auto' }}
                >
                  <span>Proceed to Checkout</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
                
                <Link
                  href="/shop"
                  className="w-full flex justify-center items-center px-6 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FDBE02] transition-colors duration-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span>Continue Shopping</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 