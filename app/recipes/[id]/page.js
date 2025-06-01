import Image from 'next/image';

// This would typically come from a database or API
const recipes = {
  1: {
    id: 1,
    title: 'Classic Chocolate Chip Cookies',
    description: 'Delicious homemade chocolate chip cookies that are soft on the inside and crispy on the outside.',
    image: '/images/recipes/chocolate-chip-cookies.jpg',
    prepTime: '15 mins',
    cookTime: '10 mins',
    difficulty: 'Easy',
    servings: 24,
    ingredients: [
      '2 1/4 cups all-purpose flour',
      '1 tsp baking soda',
      '1 tsp salt',
      '1 cup (2 sticks) butter, softened',
      '3/4 cup granulated sugar',
      '3/4 cup packed brown sugar',
      '2 large eggs',
      '2 tsp vanilla extract',
      '2 cups chocolate chips'
    ],
    instructions: [
      'Preheat oven to 375°F (190°C).',
      'Mix flour, baking soda, and salt in a small bowl.',
      'Beat butter, granulated sugar, and brown sugar until creamy.',
      'Add eggs and vanilla; beat well.',
      'Gradually mix in flour mixture.',
      'Stir in chocolate chips.',
      'Drop rounded tablespoons onto ungreased baking sheets.',
      'Bake for 9 to 11 minutes or until golden brown.',
      'Cool on baking sheets for 2 minutes; remove to wire racks to cool completely.'
    ]
  },
  // Add more recipes as needed
};

export default function RecipePage({ params }) {
  const recipe = recipes[params.id];

  if (!recipe) {
    return <div className="container mx-auto px-4 py-8">Recipe not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{recipe.title}</h1>
        <div className="relative h-96 w-full mb-8 rounded-lg overflow-hidden">
          <Image
            src={recipe.image}
            alt={recipe.title}
            fill
            className="object-cover"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Recipe Details</h2>
            <div className="space-y-2 text-gray-600">
              <p>Prep Time: {recipe.prepTime}</p>
              <p>Cook Time: {recipe.cookTime}</p>
              <p>Difficulty: {recipe.difficulty}</p>
              <p>Servings: {recipe.servings}</p>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
          <ol className="list-decimal list-inside space-y-4 text-gray-600">
            {recipe.instructions.map((instruction, index) => (
              <li key={index} className="pl-4">{instruction}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
} 