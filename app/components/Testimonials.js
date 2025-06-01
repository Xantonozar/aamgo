export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: 'রহিম উদ্দিন',
      role: 'ঢাকা',
      quote: 'এই আমটা খুবই মিষ্টি ও রসালো। পরিবারের সবাই খুব পছন্দ করেছে।',
      rating: 5,
    },
    {
      id: 2,
      name: 'সাবিনা আক্তার',
      role: 'চট্টগ্রাম',
      quote: 'খুব ভালো মানের আম, সময়মতো ডেলিভারি পেয়েছি। আবার অর্ডার করবো।',
      rating: 5,
    },
    {
      id: 3,
      name: 'মোঃ কামরুল',
      role: 'রাজশাহী',
      quote: 'স্বাদে অসাধারণ, একদম ফ্রেশ ও টাটকা আম।',
      rating: 4,
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-[#333333]">What Our Customers Say</h2>
          <p className="text-[#555555] max-w-2xl mx-auto">
            Don't just take our word for it - see what mango lovers have to say about our products
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-[#f8f4e9] rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 ${i < testimonial.rating ? 'text-[#f57f17]' : 'text-gray-300'}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                ))}
              </div>
              
              <blockquote className="text-[#555555] italic mb-4">"{testimonial.quote}"</blockquote>
              
              <div className="flex items-center">
                <div className="w-10 h-10 bg-[#f9a825] rounded-full flex items-center justify-center text-white font-bold">
                  {testimonial.name.charAt(0)}
                </div>
                <div className="ml-3">
                  <p className="font-bold text-[#333333]">{testimonial.name}</p>
                  <p className="text-[#666666] text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a 
            href="#"
            className="text-[#2e7d32] font-medium hover:underline"
          >
            Read more reviews →
          </a>
        </div>
      </div>
    </section>
  );
} 