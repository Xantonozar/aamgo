"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import RecipeCard from '../components/RecipeCard';

// Sample blog posts data
const blogPosts = [
  {
    id: 1,
    title: 'The Health Benefits of Mangoes',
    description: 'Discover why mangoes are not just delicious but also packed with essential nutrients and health benefits.',
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=1974',
    date: 'June 15, 2023',
    author: 'Sarah Johnson',
    category: 'Health'
  },
  {
    id: 2,
    title: 'Mango Farming: A Sustainable Approach',
    description: 'Learn about sustainable farming practices that are revolutionizing mango cultivation around the world.',
    image: 'https://images.unsplash.com/photo-1591073113125-e46713c829ed?q=80&w=1974',
    date: 'July 22, 2023',
    author: 'Michael Rodriguez',
    category: 'Farming'
  },
  {
    id: 3,
    title: 'The Cultural Significance of Mangoes in South Asia',
    description: 'Explore the rich cultural history and significance of mangoes across South Asian countries and traditions.',
    image: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?q=80&w=1935',
    date: 'August 10, 2023',
    author: 'Priya Patel',
    category: 'Culture'
  },
];

// Sample recipes data (using the same structure as in recipes/page.js)
const recipes = [
  {
    id: 1,
    title: 'Mango Sticky Rice',
    description: 'A delicious Thai dessert featuring sweet sticky rice topped with fresh mango slices and coconut cream.',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=2012',
    prepTime: '15 mins',
    cookTime: '20 mins',
    difficulty: 'Medium'
  },
  {
    id: 2,
    title: 'Mango Salsa',
    description: 'Fresh and vibrant salsa made with ripe mangoes, perfect for serving with chips or grilled fish.',
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?q=80&w=1987',
    prepTime: '10 mins',
    cookTime: '0 mins',
    difficulty: 'Easy'
  },
  {
    id: 3,
    title: 'Mango Lassi',
    description: 'A refreshing yogurt-based drink blended with sweet mangoes and a hint of cardamom.',
    image: 'https://images.unsplash.com/photo-1527583426476-fd5d7a0ae1cf?q=80&w=1974',
    prepTime: '5 mins',
    cookTime: '0 mins',
    difficulty: 'Easy'
  },
];

// Blog post card component
function BlogPostCard({ post }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 w-full">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-[#F57F17] font-medium">{post.category}</span>
          <span className="text-xs text-gray-500">{post.date}</span>
        </div>
        <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
        <p className="text-gray-600 mb-4 line-clamp-2">{post.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">By {post.author}</span>
          <Link href={`/blog/${post.id}`} className="text-[#F57F17] hover:text-[#FDBE02] font-medium text-sm transition-colors">
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function BlogPage() {
  const [activeTab, setActiveTab] = useState('blog'); // 'blog' or 'recipes'

  return (
    <div className="min-h-screen bg-orange-200">
      {/* Hero Section with Decorative Elements */}
      <div className="relative bg-gradient-to-r from-[#FDBE02]/20 to-[#F57F17]/50 py-16">
        <div className="absolute inset-0 overflow-hidden opacity-20">
          {/* Decorative SVG Pattern */}
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="mango-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M20 5 C25 0, 35 10, 30 20 S20 35, 10 30 S0 15, 10 5 S15 0, 20 5" fill="none" stroke="#ffffff" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#mango-pattern)" />
          </svg>
        </div>
        
        {/* Floating Mango SVG Elements */}
        <div className="absolute top-10 left-10 animate-float opacity-30">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="#ffffff">
            <path d="M12 3C16.5 3 20 6.5 20 11C20 15.5 17 20 12 21C7 22 4 17.5 4 13C4 8.5 7.5 3 12 3Z" />
          </svg>
        </div>
        <div className="absolute bottom-10 right-10 animate-float-reverse opacity-30">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="#ffffff">
            <path d="M12 3C16.5 3 20 6.5 20 11C20 15.5 17 20 12 21C7 22 4 17.5 4 13C4 8.5 7.5 3 12 3Z" />
          </svg>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-4">Our Blog & Recipes</h1>
          <p className="text-green-900/90 text-lg max-w-2xl mx-auto">
            Explore our collection of mango-inspired recipes and insightful articles about the world's most beloved fruit.
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-full shadow-md p-1 inline-flex">
            <button
              onClick={() => setActiveTab('blog')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === 'blog'
                  ? 'bg-gradient-to-r from-[#FDBE02] to-[#F57F17] text-white shadow-md'
                  : 'text-gray-600 hover:text-[#F57F17]'
              }`}
            >
              Blog Posts
            </button>
            <button
              onClick={() => setActiveTab('recipes')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === 'recipes'
                  ? 'bg-gradient-to-r from-[#FDBE02] to-[#F57F17] text-white shadow-md'
                  : 'text-gray-600 hover:text-[#F57F17]'
              }`}
            >
              Recipes
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="mb-12">
          {/* Blog Posts Tab */}
          {activeTab === 'blog' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
          )}

          {/* Recipes Tab */}
          {activeTab === 'recipes' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          )}
        </div>

      
      </div>
    </div>
  );
}