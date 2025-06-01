import Image from 'next/image';
import Link from 'next/link';

// Sample blog posts data (in a real app, this would come from a database or API)
const blogPosts = {
  1: {
    id: 1,
    title: 'The Health Benefits of Mangoes',
    description: 'Discover why mangoes are not just delicious but also packed with essential nutrients and health benefits.',
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=1974',
    date: 'June 15, 2023',
    author: 'Sarah Johnson',
    category: 'Health',
    content: `
      <p>Mangoes are often referred to as the "king of fruits" and for good reason. These juicy, sweet fruits are not only delicious but also packed with nutrients that offer numerous health benefits.</p>
      
      <h2>Rich in Vitamins and Minerals</h2>
      <p>Mangoes are an excellent source of vitamin C, providing about 67% of the daily recommended intake in just one cup. They also contain significant amounts of vitamin A, vitamin E, and several B vitamins, including folate and vitamin B6.</p>
      <p>Additionally, mangoes provide essential minerals such as potassium, copper, and magnesium, which play crucial roles in maintaining proper bodily functions.</p>
      
      <h2>Powerful Antioxidants</h2>
      <p>Mangoes contain various antioxidants, including mangiferin, catechins, anthocyanins, and quercetin. These compounds help protect your cells against damage from free radicals, which are linked to chronic diseases and aging.</p>
      
      <h2>Digestive Health</h2>
      <p>Mangoes are rich in dietary fiber, which promotes digestive health by preventing constipation and supporting a healthy gut microbiome. They also contain enzymes that aid in breaking down proteins and improving digestion.</p>
      
      <h2>Heart Health</h2>
      <p>The fiber, potassium, and vitamins in mangoes all support heart health. Potassium helps regulate blood pressure, while the fiber helps lower cholesterol levels. The antioxidants in mangoes also protect against oxidative stress, which can damage blood vessels.</p>
      
      <h2>Immune System Support</h2>
      <p>The high vitamin C content in mangoes helps strengthen the immune system, making it more effective at fighting infections and diseases. Vitamin A in mangoes also plays a crucial role in maintaining healthy mucous membranes, which are the body's first line of defense against pathogens.</p>
      
      <h2>Eye Health</h2>
      <p>Mangoes are rich in vitamin A and beta-carotene, which are essential for maintaining good vision and preventing age-related macular degeneration. They also contain lutein and zeaxanthin, which protect the retina from harmful blue light.</p>
      
      <h2>Skin and Hair Benefits</h2>
      <p>The vitamins A and C in mangoes promote healthy skin by supporting collagen production and protecting against UV damage. They also contribute to hair health by promoting growth and preventing dryness and dandruff.</p>
      
      <h2>Conclusion</h2>
      <p>Incorporating mangoes into your diet can provide numerous health benefits due to their rich nutrient profile. Whether eaten fresh, added to smoothies, or included in various dishes, mangoes are a delicious way to boost your overall health and well-being.</p>
    `
  },
  2: {
    id: 2,
    title: 'Mango Farming: A Sustainable Approach',
    description: 'Learn about sustainable farming practices that are revolutionizing mango cultivation around the world.',
    image: 'https://images.unsplash.com/photo-1591073113125-e46713c829ed?q=80&w=1974',
    date: 'July 22, 2023',
    author: 'Michael Rodriguez',
    category: 'Farming',
    content: `
      <p>Sustainable mango farming is becoming increasingly important as climate change and environmental concerns reshape agricultural practices worldwide. This article explores innovative approaches to mango cultivation that prioritize environmental stewardship while maintaining productivity and profitability.</p>
      
      <h2>Water Conservation Techniques</h2>
      <p>Water scarcity is a growing concern in many mango-producing regions. Sustainable mango farms are implementing drip irrigation systems that deliver water directly to the root zone, reducing water usage by up to 60% compared to traditional flood irrigation methods.</p>
      <p>Rainwater harvesting systems and soil moisture sensors are also being employed to optimize water usage and ensure that trees receive adequate hydration without waste.</p>
      
      <h2>Organic Pest Management</h2>
      <p>Rather than relying solely on chemical pesticides, sustainable mango farmers are adopting integrated pest management (IPM) strategies. These include introducing beneficial insects that prey on common mango pests, using pheromone traps to monitor and disrupt pest mating cycles, and applying neem-based and other botanical pesticides when necessary.</p>
      
      <h2>Soil Health and Biodiversity</h2>
      <p>Maintaining soil health is fundamental to sustainable mango production. Cover crops, compost application, and minimal tillage practices help preserve soil structure, increase organic matter, and support beneficial soil microorganisms.</p>
      <p>Many sustainable mango orchards also incorporate polyculture systems, growing complementary plants alongside mango trees to enhance biodiversity, attract pollinators, and create more resilient ecosystems.</p>
      
      <h2>Carbon Sequestration</h2>
      <p>Mango trees, like other perennial crops, have significant potential for carbon sequestration. By maintaining healthy orchards and implementing agroforestry practices, mango farmers can contribute to climate change mitigation while producing nutritious food.</p>
      
      <h2>Fair Labor Practices</h2>
      <p>Sustainability extends beyond environmental concerns to include social responsibility. Progressive mango farms are ensuring fair wages, safe working conditions, and opportunities for skill development among their workers.</p>
      
      <h2>Reducing Food Waste</h2>
      <p>A significant portion of mango production is lost due to improper handling, transportation issues, or cosmetic standards. Sustainable mango operations are implementing improved post-harvest handling techniques and finding markets for "imperfect" fruit through processing or direct-to-consumer sales channels.</p>
      
      <h2>Certification Programs</h2>
      <p>Various certification programs, such as Organic, Fair Trade, and Rainforest Alliance, provide frameworks and standards for sustainable mango production. These certifications can help farmers access premium markets and receive better prices for their produce.</p>
      
      <h2>Conclusion</h2>
      <p>Sustainable mango farming represents a holistic approach that balances productivity with environmental stewardship and social responsibility. As consumer demand for sustainably produced food continues to grow, these practices are likely to become increasingly mainstream in the mango industry, benefiting farmers, consumers, and the planet alike.</p>
    `
  },
  3: {
    id: 3,
    title: 'The Cultural Significance of Mangoes in South Asia',
    description: 'Explore the rich cultural history and significance of mangoes across South Asian countries and traditions.',
    image: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?q=80&w=1935',
    date: 'August 10, 2023',
    author: 'Priya Patel',
    category: 'Culture',
    content: `
      <p>In South Asia, the mango is far more than just a fruit—it's a cultural icon deeply embedded in the region's history, literature, art, and daily life. Often referred to as the "king of fruits," mangoes hold a special place in the hearts and traditions of people across India, Pakistan, Bangladesh, Sri Lanka, and beyond.</p>
      
      <h2>Historical Significance</h2>
      <p>The cultivation of mangoes in South Asia dates back over 4,000 years. Ancient texts mention the fruit as a symbol of prosperity and fertility. Mughal emperors were particularly fond of mangoes, with Emperor Akbar reportedly planting an orchard of 100,000 mango trees called Lakhi Bagh.</p>
      <p>During colonial times, the British developed a taste for mangoes and helped introduce them to other parts of the world. The word "mango" itself comes from the Malayalam word "manga" and reached English through Portuguese traders.</p>
      
      <h2>Literary and Artistic Representations</h2>
      <p>Mangoes feature prominently in South Asian literature, poetry, and art. The blossoming of mango trees (known as "mangomel" in Hindi) symbolizes spring and is often associated with love and romance in classical poetry.</p>
      <p>Famous poets like Mirza Ghalib and Rabindranath Tagore have written about mangoes, and the fruit appears in countless folk songs, stories, and paintings throughout the region.</p>
      
      <h2>Religious and Ceremonial Importance</h2>
      <p>Mango leaves are considered auspicious in Hinduism and are used to decorate doorways during festivals and ceremonies. The mango motif, known as "ambi" or "paisley," is a common design element in South Asian textiles and art, representing fertility and abundance.</p>
      <p>In Buddhist tradition, mango groves were revered as places of meditation, with Buddha himself said to have rested under mango trees.</p>
      
      <h2>Social Bonding and Gifting</h2>
      <p>The sharing of mangoes is an important social custom in South Asia. Gifting boxes of premium mangoes to friends, family, and business associates is a common practice, especially during the summer harvest season.</p>
      <p>Mango parties, where people gather to enjoy different varieties of the fruit, foster community bonds and celebrate the season's bounty.</p>
      
      <h2>Culinary Traditions</h2>
      <p>Beyond eating the fresh fruit, South Asian cuisines incorporate mangoes in numerous ways. Raw green mangoes are used in savory dishes like chutneys, pickles, and dals, while ripe mangoes feature in desserts like kulfi, lassi, and various sweet preserves.</p>
      <p>Each region has its own traditional mango preparations, reflecting local tastes and cultural influences.</p>
      
      <h2>Regional Pride and Identity</h2>
      <p>Different regions take immense pride in their local mango varieties. Alphonso from Maharashtra, Langra and Dussehri from Uttar Pradesh, Chaunsa from Pakistan, and Himsagar from Bengal are just a few of the hundreds of varieties cultivated across the subcontinent.</p>
      <p>These regional specialties are a source of cultural identity and often inspire friendly rivalries about which region produces the best mangoes.</p>
      
      <h2>Modern Cultural References</h2>
      <p>The cultural significance of mangoes continues in contemporary South Asian society. They feature in films, television shows, and popular music. The arrival of mango season is still celebrated and anticipated, even in urban areas far removed from agricultural traditions.</p>
      
      <h2>Conclusion</h2>
      <p>The mango's cultural significance in South Asia transcends its status as a mere fruit. It represents history, tradition, seasonal rhythms, and shared experiences that have shaped the region's cultural identity for millennia. As South Asian cultures continue to evolve and spread globally, the mango remains a powerful symbol connecting people to their heritage and to each other.</p>
    `
  },
};

export default function BlogPostPage({ params }) {
  const post = blogPosts[params.id];

  if (!post) {
    return <div className="container mx-auto px-4 py-8">Blog post not found</div>;
  }

  return (
    <div className="min-h-screen bg-[#fff9e6]/30">
      {/* Hero Section with Featured Image */}
      <div className="relative h-[40vh] md:h-[50vh] w-full">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <div className="container mx-auto px-4 pb-8 md:pb-12">
            <div className="max-w-4xl">
              <div className="flex items-center space-x-2 mb-2">
                <span className="bg-[#F57F17] text-white px-3 py-1 rounded-full text-xs font-medium">
                  {post.category}
                </span>
                <span className="text-white/80 text-sm">{post.date}</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                {post.title}
              </h1>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-[#FDBE02] flex items-center justify-center text-white font-bold text-lg">
                  {post.author.charAt(0)}
                </div>
                <span className="ml-2 text-white">{post.author}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-md p-6 md:p-8 lg:p-10">
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          {/* Author Bio */}
          <div className="mt-12 bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#FDBE02] to-[#F57F17] flex items-center justify-center text-white font-bold text-2xl">
              {post.author.charAt(0)}
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">About {post.author}</h3>
              <p className="text-gray-600 mb-4">
                {post.author} is a passionate writer and food enthusiast with expertise in {post.category.toLowerCase()} topics. 
                With years of experience in the field, they bring valuable insights and knowledge to our readers.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-[#F57F17] hover:text-[#FDBE02] transition-colors">
                  Twitter
                </a>
                <a href="#" className="text-[#F57F17] hover:text-[#FDBE02] transition-colors">
                  LinkedIn
                </a>
                <a href="#" className="text-[#F57F17] hover:text-[#FDBE02] transition-colors">
                  Website
                </a>
              </div>
            </div>
          </div>

          {/* Back to Blog Link */}
          <div className="mt-8 text-center">
            <Link 
              href="/blog" 
              className="inline-flex items-center text-[#F57F17] hover:text-[#FDBE02] font-medium transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Blog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}