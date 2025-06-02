import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Blog & Recipes - AmGo Mangoes',
  description: 'Explore our collection of mango-inspired recipes and insightful articles about the world\'s most beloved fruit.',
};

export default function BlogLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>
        {children}
      </main>
      <Footer />
    </>
  );
}