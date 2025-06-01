import Image from 'next/image';
import Link from 'next/link';

export default function RecipeCard({ recipe }) {
  return (
    <Link href={`/recipes/${recipe.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="relative h-48 w-full">
          <Image
            src={recipe.image}
            alt={recipe.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
          <p className="text-gray-600 mb-4 line-clamp-2">{recipe.description}</p>
          <div className="flex justify-between text-sm text-gray-500">
            <span>Prep: {recipe.prepTime}</span>
            <span>Cook: {recipe.cookTime}</span>
            <span>Level: {recipe.difficulty}</span>
          </div>
        </div>
      </div>
    </Link>
  );
} 