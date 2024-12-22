import { useState, useEffect } from "react";
import Link from "next/link";
import type {} from "ldrs";

interface PokemonCardProps {
  name: string;
}

export function PokemonCard({ name }: PokemonCardProps) {
  const [pokemonImage, setPokemonImage] = useState<string | null>(null); // Pokémon image URL
  const [loading, setLoading] = useState<boolean>(true); // Loading state for the image

  // Fetch Pokémon data (including image) using the name
  useEffect(() => {
    const fetchPokemonImage = async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${name}`
        );
        const data = await response.json();
        setPokemonImage(data.sprites.front_default); // Set the front sprite as the Pokémon image
      } catch (error) {
        console.error("Failed to fetch Pokémon image:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching the image
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

      {/* Image or Loader */}
      <div className="flex justify-center items-center my-4 w-30 h-30">
        {loading ? (
          <l-helix size="35" speed="2.5" color="#61A0EA"></l-helix>
        ) : pokemonImage ? (
          <img
            src={pokemonImage}
            alt={name}
            className="w-30 h-30 object-contain"
          />
        ) : (
          <p className="text-gray-500">Image not available</p>
        )}
      </div>
    </Link>
  );
}
