import RecipeCard from '../components/RecipeCard';

const recipes = [
  {
    id: 1,
    title: 'Classic Chocolate Chip Cookies',
    description: 'Delicious homemade chocolate chip cookies that are soft on the inside and crispy on the outside.',
    image: '/images/recipes/chocolate-chip-cookies.jpg',
    prepTime: '15 mins',
    cookTime: '10 mins',
    difficulty: 'Easy'
  },
  {
    id: 2,
    title: 'Creamy Tomato Pasta',
    description: 'A quick and easy pasta dish with a rich tomato cream sauce.',
    image: '/images/recipes/tomato-pasta.jpg',
    prepTime: '10 mins',
    cookTime: '20 mins',
    difficulty: 'Medium'
  },
  // Add more recipes as needed
];

export default function RecipesPage() {
  return (
    <div className="container bg-green-300 mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Recipe Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
} 