"use client";

import { PokemonCard } from "@/components/pokemon-card";
import { useState, useEffect } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { getPokemonList } from "@/lib/pokemonAPI";

export function PokemonGrid() {
  const [allPokemonList, setAllPokemonList] = useState<any[]>([]); // Stores all fetched Pokémon
  const [displayedPokemonList, setDisplayedPokemonList] = useState<any[]>([]); // Stores currently displayed Pokémon
  const [searchText, setSearchText] = useState(""); // Search text from user
  const [offset, setOffset] = useState(0); // Tracks the current offset for pagination
  const [loading, setLoading] = useState(false); // Loading state
  const [totalCount, setTotalCount] = useState(0); // Total Pokémon count from API
  const limit = 10; // Number of Pokémon to load per request

  // Load more Pokémon from the API
  const loadMorePokemons = async () => {
    setLoading(true);
    const newPokemons = await getPokemonList(limit, offset);
    setAllPokemonList((prevList) => [...prevList, ...newPokemons]);
    setDisplayedPokemonList((prevList) => [...prevList, ...newPokemons]);
    setOffset((prevOffset) => prevOffset + limit);
    setLoading(false);
  };

  // Initial load of Pokémon when the component mounts
  useEffect(() => {
    loadMorePokemons();
  }, []);

  // Function to fetch all Pokémon matching the search, even beyond the currently loaded ones
  const searchFilter = async () => {
    if (searchText === "") {
      // Reset to show all loaded Pokémon if search text is cleared
      setDisplayedPokemonList(allPokemonList);
    } else {
      // Fetch Pokémon if not yet loaded and filter
      const lowerCasedSearchText = searchText.toLowerCase();
      let filteredPokemons = allPokemonList.filter((pokemon: any) =>
        pokemon.name.toLowerCase().includes(lowerCasedSearchText)
      );

      // If not all Pokémon have been loaded and there are no matches yet, load more Pokémon
      if (filteredPokemons.length === 0 && allPokemonList.length < totalCount) {
        const newPokemons = await getPokemonList(totalCount, 0); // Fetch all Pokémon
        setAllPokemonList(newPokemons);
        filteredPokemons = newPokemons.filter((pokemon: any) =>
          pokemon.name.toLowerCase().includes(lowerCasedSearchText)
        );
      }

      setDisplayedPokemonList(filteredPokemons);
    }
  };

  // When the search text changes, filter the Pokémon
  useEffect(() => {
    searchFilter();
  }, [searchText]);

  return (
    <>
      <div>
        <h3 className="text-2xl py-6 text-center">Search for your Pokémon!</h3>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="pokemonName">Pokémon Name</Label>
          <Input
            type="text"
            value={searchText}
            autoComplete="off"
            id="pokemonName"
            placeholder="Pikachu, Charizard, etc."
            onChange={(e) => setSearchText(e.target.value)} // Update search text on user input
          />
        </div>

        <h3 className="text-3xl pt-12 pb-6 text-center">Pokémon Collection</h3>
      </div>

      {/* Render Pokémon Grid */}
      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-3 lg:text-left">
        {displayedPokemonList.length > 0 ? (
          displayedPokemonList.map((pokemon: any) => (
            <PokemonCard key={pokemon.name} name={pokemon.name} />
          ))
        ) : (
          <p className="text-center">No Pokémon found matching "{searchText}"</p>
        )}
      </div>

      {/* Load More Button */}
      <div className="text-center">
        <button
          className="group rounded-lg border border-transparent m-6 px-5 py-2 transition-colors dark:border-gray-500 dark:bg-gray-800 hover:border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 dark:hover:border-gray-600"
          onClick={loadMorePokemons} // Load more Pokémon when clicked
          disabled={loading}
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      </div>
    </>
  );
}
