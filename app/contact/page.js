"use client";

import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const GlobalStyles = () => (
  <style jsx global>{`
    /* Styles moved to globals.css */
  `}</style>
);

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }, 1500);
  };

  return (
    <div className="min-h-screen">
      {/* <GlobalStyles /> */}{/* GlobalStyles component is no longer needed here as keyframes are in globals.css */}
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-[#fff9e6] to-white py-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="mango-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M20 5 C25 0, 35 10, 30 20 S20 35, 10 30 S0 15, 10 5 S15 0, 20 5" fill="none" stroke="#FDBE02" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#mango-pattern)" />
          </svg>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#333333] relative inline-block">
              Contact Us
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#FDBE02] to-[#F57F17]"></span>
            </h1>
            <p className="text-lg text-[#555555] mb-8">
              Have questions about our mangoes or need assistance with your order? We're here to help!
            </p>
          </div>
        </div>
      </section>
      
      {/* Contact Form Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-6 text-[#333333]">Send Us a Message</h2>
              
              {submitStatus === 'success' && (
                <div className="bg-green-100 border border-green-200 text-green-700 px-4 py-3 rounded mb-6 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Your message has been sent successfully! We'll get back to you soon.</span>
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-[#555555] mb-2">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FDBE02] focus:border-transparent transition-all duration-300"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-[#555555] mb-2">Your Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FDBE02] focus:border-transparent transition-all duration-300"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="subject" className="block text-[#555555] mb-2">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FDBE02] focus:border-transparent transition-all duration-300"
                    placeholder="How can we help you?"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-[#555555] mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FDBE02] focus:border-transparent transition-all duration-300"
                    placeholder="Your message here..."
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-[#f57f17] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#e65100] transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-[1.02] ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : 'Send Message'}
                </button>
              </form>
            </div>
            
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold mb-6 text-[#333333]">Get in Touch</h2>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-[#fff9e6] flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#f57f17]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-[#333333] mb-1">Our Location</h3>
                    <p className="text-[#555555]">123 Mango Grove Lane<br />Fruitville, CA 90210<br />United States</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-[#fff9e6] flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#f57f17]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-[#333333] mb-1">Email Us</h3>
                    <p className="text-[#555555]">info@amgomangoes.com<br />support@amgomangoes.com</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-[#fff9e6] flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#f57f17]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-[#333333] mb-1">Call Us</h3>
                    <p className="text-[#555555]">+1 (800) MANGO-GO<br />+1 (800) 626-4646</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-[#fff9e6] flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#f57f17]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-[#333333] mb-1">Business Hours</h3>
                    <p className="text-[#555555]">Monday - Friday: 9am - 5pm<br />Saturday: 10am - 4pm<br />Sunday: Closed</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10">
                <h3 className="font-semibold text-lg text-[#333333] mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 rounded-full bg-[#f0f0f0] flex items-center justify-center hover:bg-[#FDBE02] hover:text-white transition-colors duration-300">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-[#f0f0f0] flex items-center justify-center hover:bg-[#FDBE02] hover:text-white transition-colors duration-300">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-[#f0f0f0] flex items-center justify-center hover:bg-[#FDBE02] hover:text-white transition-colors duration-300">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-[#f0f0f0] flex items-center justify-center hover:bg-[#FDBE02] hover:text-white transition-colors duration-300">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Online-Only Banner Section */}
      <section className="py-16 bg-gradient-to-br from-[#FDBE02] to-[#F57F17] text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-20">
          {/* Animated background elements - e.g., floating mango shapes or abstract patterns */}
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full animate-pulse delay-100"></div>
          <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-white/10 rounded-lg animate-bounce delay-300"></div>
          <div className="absolute top-1/3 right-1/5 w-20 h-20 bg-white/5 rounded-full animate-float"></div>
          <div className="absolute bottom-1/3 left-1/5 w-28 h-28 bg-white/5 rounded-lg animate-float-reverse delay-500"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-block bg-white/20 text-sm font-semibold px-4 py-2 rounded-full mb-6 backdrop-blur-sm shadow-lg">
              Important Update
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 relative">
              We're Currently Online Only!
              <svg className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-2" viewBox="0 0 100 4" preserveAspectRatio="none">
                <path d="M0 2 Q 25 0, 50 2 T 100 2" stroke="white" strokeWidth="3" fill="transparent" strokeDasharray="5,5" className="animate-draw-line"/>
              </svg>
            </h2>
            <p className="text-lg md:text-xl mb-10 leading-relaxed">
              Our physical store is temporarily unavailable. But don't worry! You can still get your favorite fresh mangoes delivered straight to your doorstep. Explore our delicious range online!
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-12">
              {[ 
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  ),
                  title: "Shop Online 24/7",
                  desc: "Browse and order anytime, anywhere."
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2-2h8zm6-11l-1-5H2l2 11h11l2-7h2zM13 16h2m4-11h4" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                  ),
                  title: "Nationwide Delivery",
                  desc: "Fresh mangoes delivered to your home."
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  ),
                  title: "Global Reach, Local Taste",
                  desc: "Experience the best, wherever you are."
                }
              ].map((item, index) => (
                <div key={index} className="group bg-white/10 p-6 rounded-xl shadow-lg hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer backdrop-blur-md">
                  <div className="flex justify-center mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm opacity-80">{item.desc}</p>
                </div>
              ))}
            </div>
            <a 
              href="/shop"
              className="inline-block bg-white text-[#F57F17] font-bold py-3 px-8 rounded-lg text-lg hover:bg-gray-100 transition-colors duration-300 shadow-md hover:shadow-xl transform hover:scale-105"
            >
              Shop Our Mangoes Online
            </a>
          </div>
        </div>
      </section>

  
      <Footer />
    </div>
  );
}