"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const router = useRouter();
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    country: 'Bangladesh',
    paymentMethod: 'card',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  });
  
  // Error state
  const [errors, setErrors] = useState({});
  
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
  
  // Calculate cart totals
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 75 ? 0 : 5.99;
  const tax = subtotal * 0.05; // 5% tax rate
  const total = subtotal + shipping + tax;
  
  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when field is updated
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };
  
  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'zipCode'];
    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = 'This field is required';
      }
    });
    
    // Validate email format
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Validate phone number (simple validation)
    if (formData.phone && !/^[0-9]{10,15}$/.test(formData.phone.replace(/[^0-9]/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    // Validate credit card fields if card payment selected
    if (formData.paymentMethod === 'card') {
      if (!formData.cardNumber) {
        newErrors.cardNumber = 'Please enter your card number';
      } else if (!/^[0-9]{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
        newErrors.cardNumber = 'Card number must be 16 digits';
      }
      
      if (!formData.cardExpiry) {
        newErrors.cardExpiry = 'Please enter card expiry date';
      } else if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(formData.cardExpiry)) {
        newErrors.cardExpiry = 'Please use MM/YY format';
      }
      
      if (!formData.cardCvc) {
        newErrors.cardCvc = 'Please enter CVC';
      } else if (!/^[0-9]{3,4}$/.test(formData.cardCvc)) {
        newErrors.cardCvc = 'CVC must be 3 or 4 digits';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real app, you would process the payment here
      // For this demo, we'll just redirect to the confirmation page
      
      // Generate a random order number
      const orderNumber = Math.floor(100000 + Math.random() * 900000);
      
      // Navigate to confirmation page with order details
      router.push(`/confirmation?orderId=${orderNumber}`);
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
                <div className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-gray-400 bg-gray-200">
                  Cart
                </div>
                <div className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-[#FDBE02] bg-amber-100">
                  Checkout
                </div>
                <div className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-gray-400 bg-gray-200">
                  Confirmation
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                <div style={{ width: "66%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-[#FDBE02] to-[#F57F17]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Checkout Form */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="text-[#FDBE02] mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </span>
                Shipping Information
              </h2>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {/* First Name */}
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`block w-full rounded-md border ${errors.firstName ? 'border-red-300' : 'border-gray-300'} shadow-sm py-2 px-3 focus:outline-none focus:ring-[#FDBE02] focus:border-[#FDBE02] sm:text-sm`}
                    />
                    {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
                  </div>
                  
                  {/* Last Name */}
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`block w-full rounded-md border ${errors.lastName ? 'border-red-300' : 'border-gray-300'} shadow-sm py-2 px-3 focus:outline-none focus:ring-[#FDBE02] focus:border-[#FDBE02] sm:text-sm`}
                    />
                    {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
                  </div>
                  
                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`block w-full rounded-md border ${errors.email ? 'border-red-300' : 'border-gray-300'} shadow-sm py-2 px-3 focus:outline-none focus:ring-[#FDBE02] focus:border-[#FDBE02] sm:text-sm`}
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                  </div>
                  
                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`block w-full rounded-md border ${errors.phone ? 'border-red-300' : 'border-gray-300'} shadow-sm py-2 px-3 focus:outline-none focus:ring-[#FDBE02] focus:border-[#FDBE02] sm:text-sm`}
                    />
                    {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                  </div>
                  
                  {/* Address */}
                  <div className="md:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                      Address *
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className={`block w-full rounded-md border ${errors.address ? 'border-red-300' : 'border-gray-300'} shadow-sm py-2 px-3 focus:outline-none focus:ring-[#FDBE02] focus:border-[#FDBE02] sm:text-sm`}
                    />
                    {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
                  </div>
                  
                  {/* City */}
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={`block w-full rounded-md border ${errors.city ? 'border-red-300' : 'border-gray-300'} shadow-sm py-2 px-3 focus:outline-none focus:ring-[#FDBE02] focus:border-[#FDBE02] sm:text-sm`}
                    />
                    {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
                  </div>
                  
                  {/* Zip/Postal Code */}
                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                      Postal Code *
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      className={`block w-full rounded-md border ${errors.zipCode ? 'border-red-300' : 'border-gray-300'} shadow-sm py-2 px-3 focus:outline-none focus:ring-[#FDBE02] focus:border-[#FDBE02] sm:text-sm`}
                    />
                    {errors.zipCode && <p className="mt-1 text-sm text-red-600">{errors.zipCode}</p>}
                  </div>
                  
                  {/* Country */}
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                      Country *
                    </label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-[#FDBE02] focus:border-[#FDBE02] sm:text-sm"
                    >
                      <option value="Bangladesh">Bangladesh</option>
                      <option value="India">India</option>
                      <option value="Pakistan">Pakistan</option>
                      <option value="Sri Lanka">Sri Lanka</option>
                    </select>
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <span className="text-[#FDBE02] mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </span>
                  Payment Method
                </h2>
                
                <div className="mb-6">
                  <div className="flex space-x-4 mb-4">
                    <div className="flex items-center">
                      <input
                        id="payment-card"
                        name="paymentMethod"
                        type="radio"
                        value="card"
                        checked={formData.paymentMethod === "card"}
                        onChange={handleChange}
                        className="h-4 w-4 text-[#FDBE02] focus:ring-[#FDBE02] border-gray-300"
                      />
                      <label htmlFor="payment-card" className="ml-2 flex items-center cursor-pointer">
                        <span className="text-sm font-medium text-gray-700 mr-2">Credit Card</span>
                        <span className="flex space-x-1">
                          <span className="w-8 h-5 bg-blue-600 rounded"></span>
                          <span className="w-8 h-5 bg-red-500 rounded"></span>
                          <span className="w-8 h-5 bg-green-500 rounded"></span>
                        </span>
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="payment-cash"
                        name="paymentMethod"
                        type="radio"
                        value="cash"
                        checked={formData.paymentMethod === "cash"}
                        onChange={handleChange}
                        className="h-4 w-4 text-[#FDBE02] focus:ring-[#FDBE02] border-gray-300"
                      />
                      <label htmlFor="payment-cash" className="ml-2 text-sm font-medium text-gray-700 cursor-pointer">
                        Cash on Delivery
                      </label>
                    </div>
                  </div>
                  
                  {/* Credit Card Details */}
                  {formData.paymentMethod === "card" && (
                    <div className="border border-gray-200 rounded-md p-4 bg-gray-50">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Card Number */}
                        <div className="md:col-span-2">
                          <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                            Card Number *
                          </label>
                          <input
                            type="text"
                            id="cardNumber"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleChange}
                            placeholder="1234 5678 9012 3456"
                            className={`block w-full rounded-md border ${errors.cardNumber ? 'border-red-300' : 'border-gray-300'} shadow-sm py-2 px-3 focus:outline-none focus:ring-[#FDBE02] focus:border-[#FDBE02] sm:text-sm`}
                          />
                          {errors.cardNumber && <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>}
                        </div>
                        
                        {/* Expiry Date */}
                        <div>
                          <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700 mb-1">
                            Expiry Date *
                          </label>
                          <input
                            type="text"
                            id="cardExpiry"
                            name="cardExpiry"
                            value={formData.cardExpiry}
                            onChange={handleChange}
                            placeholder="MM/YY"
                            className={`block w-full rounded-md border ${errors.cardExpiry ? 'border-red-300' : 'border-gray-300'} shadow-sm py-2 px-3 focus:outline-none focus:ring-[#FDBE02] focus:border-[#FDBE02] sm:text-sm`}
                          />
                          {errors.cardExpiry && <p className="mt-1 text-sm text-red-600">{errors.cardExpiry}</p>}
                        </div>
                        
                        {/* CVC */}
                        <div>
                          <label htmlFor="cardCvc" className="block text-sm font-medium text-gray-700 mb-1">
                            CVC/CVV *
                          </label>
                          <input
                            type="text"
                            id="cardCvc"
                            name="cardCvc"
                            value={formData.cardCvc}
                            onChange={handleChange}
                            placeholder="123"
                            className={`block w-full rounded-md border ${errors.cardCvc ? 'border-red-300' : 'border-gray-300'} shadow-sm py-2 px-3 focus:outline-none focus:ring-[#FDBE02] focus:border-[#FDBE02] sm:text-sm`}
                          />
                          {errors.cardCvc && <p className="mt-1 text-sm text-red-600">{errors.cardCvc}</p>}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
          
          {/* Order Summary Section */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>
              
              {/* Items in cart */}
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center py-2">
                    <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 768px) 100vw, 25vw"
                      />
                    </div>
                    <div className="ml-4 flex-1 flex justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-700">{item.name}</h4>
                        <p className="text-xs text-gray-500">{item.weight} x {item.quantity}</p>
                      </div>
                      <p className="text-sm font-medium text-[#F57F17]">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Pricing breakdown */}
              <div className="border-t border-gray-200 pt-4 space-y-4">
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
                
                <div className="border-t border-gray-200 pt-4 flex justify-between">
                  <span className="text-lg font-bold text-gray-800">Total</span>
                  <span className="text-lg font-bold text-[#F57F17]">${total.toFixed(2)}</span>
                </div>
              </div>
              
              {/* Delivery info */}
              <div className="mt-6 mb-6 bg-amber-50 p-4 rounded-md">
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
                    </p>
                  </div>
                </div>
              </div>
              
              {/* CTA buttons */}
              <div className="space-y-4">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gradient-to-r from-[#FDBE02] to-[#F57F17] hover:from-[#F57F17] hover:to-[#FDBE02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FDBE02] transition-all duration-300 transform hover:-translate-y-1"
                >
                  <span>Place Order</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </button>
                
                <Link
                  href="/cart"
                  className="w-full flex justify-center items-center px-6 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FDBE02] transition-colors duration-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span>Return to Cart</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 