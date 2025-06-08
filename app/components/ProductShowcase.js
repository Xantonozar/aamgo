import Image from 'next/image';
import Link from 'next/link';

// Sample product data with web image URLs
const featuredProducts = [
  {
    id: 1,
    name: 'Gopalbhog - 12kg',
    description: 'An early-season mango known for its sweet taste and minimal fiber content.',
    price: 1250.00,
    image: '/mangoes/gopal1.jpg',
    badge: 'Stock Ending',
  },
  {
    id: 2,
    name: 'Himsagar - 12kg',
    description: 'A hybrid variety with deep orange flesh, known for its sweetness and longer shelf life.',
    price: 0,
    image: '/mangoes/himsaga1.jpg',
    badge: 'Harvesting',
  },
  {
    id: 3,
    name: 'Langra - 12kg',
    description: 'A mid-season mango with greenish skin even when ripe, offering a unique sweet-sour flavor.',
    price: 0,
    image: '/vercel.png',
    badge: 'coming soon',
  },
  {
    id: 4,
    name: 'Himsagar - 12kg',
    description: 'A popular variety with fiberless, juicy pulp and a rich aroma.',
    price: 1300.00,
    image: '/mangoes/khirsapat1.jpg',
    badge: 'Peak Time',
  }
];

export default function ProductShowcase() {
  return (
    <section className="py-8 md:py-12 bg-[#f8f4e9] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-[#f9a825]/20 blur-xl"></div>
        <div className="absolute top-1/4 right-0 w-40 h-40 rounded-full bg-[#f57f17]/10 blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-52 h-52 rounded-full bg-[#f9a825]/10 blur-2xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        <div className="text-center mb-6 md:mb-8 group">
          <span className="inline-block px-3 py-0.5 rounded-full bg-[#f57f17]/10 text-[#f57f17] font-medium text-xs mb-2 transform transition-transform duration-500 group-hover:scale-110">
            Fresh Selection
          </span>
          <h2 className="text-2xl md:text-2xl lg:text-3xl font-bold mb-2 text-[#333333] relative inline-block">
            Our Premium Mangoes
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#f57f17]/30 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></span>
          </h2>
          <p className="text-[#555555] text-xs md:text-sm max-w-xl mx-auto transition-all duration-500 group-hover:text-[#333333]">
            Discover our selection of hand-picked, farm-fresh mangoes sourced from the finest orchards
          </p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
          {featuredProducts.map((product) => (
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
                  <Link href='https://forms.gle/V5cx17et4QCsR5FZ9'>
                  <button className="bg-[#f9a825] text-[#333333] px-3 py-1.5 rounded-full text-xs font-medium group-hover:bg-[#f57f17] group-hover:text-white transition-all duration-300 relative overflow-hidden shadow-sm">
                    <span className="relative z-10">Add to Cart</span>
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
        
        <div className="text-center mt-6 md:mt-8">
          <Link 
            href="/shop" 
            className="group relative inline-flex items-center justify-center bg-transparent border-2 border-[#f9a825] text-[#333333] font-medium px-5 py-2 rounded-full overflow-hidden transition-all duration-300 hover:text-white touch-manipulation text-sm"
          >
            <span className="absolute inset-0 bg-[#f9a825] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            <span className="relative z-10 flex items-center">
              View All Products
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1.5 transform group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
} 
