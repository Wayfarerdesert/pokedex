import { useState, useEffect } from "react";
import Link from "next/link";

interface PokemonCardProps {
  name: string;
}

export function PokemonCard({ name }: PokemonCardProps) {
  const [pokemonImage, setPokemonImage] = useState<string | null>(null); // State to store the Pokémon image URL

  // Fetch Pokémon data (including image) using the name
  useEffect(() => {
    const fetchPokemonImage = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const data = await response.json();
        setPokemonImage(data.sprites.front_default); // Set the front sprite as the Pokémon image
      } catch (error) {
        console.error("Failed to fetch Pokémon image:", error);
      }
    };

    fetchPokemonImage();
  }, [name]);

  return (
    <Link
      key={name + "Card"}
      href={`/details/${name}`}
      className="group rounded-lg border border-transparent m-3 px-5 py-4 transition-colors dark:border-gray-500 hover:border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 dark:hover:border-gray-600"
      rel="noopener noreferrer"
    >
      <h2 className="text-2xl font-semibold">
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </h2>

      {/* Render the Pokémon image if available */}
      {pokemonImage && (
        <div className="flex justify-center my-4">
          <img
            src={pokemonImage}
            alt={name}
            className="w-30 h-30 object-contain"
          />
        </div>
      )}
    </Link>
  );
}
