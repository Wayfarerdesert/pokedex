"use client";

import { PokemonCard } from "@/components/pokemon-card";
import { useState, useEffect } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { getPokemonList } from "@/lib/pokemonAPI";
import type {} from "ldrs";

interface Pokemon {
  name: string;
  // Add other Pokemon properties as needed
}

export function PokemonGrid({
  initialPokemonList = [],
}: {
  initialPokemonList?: Pokemon[];
}) {
  const [allPokemonList, setAllPokemonList] =
    useState<Pokemon[]>(initialPokemonList);
  const [displayedPokemonList, setDisplayedPokemonList] =
    useState<Pokemon[]>(initialPokemonList);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasLoadedAll, setHasLoadedAll] = useState(false);

  // Function to fetch and filter Pokémon based on search
  const searchFilter = async () => {
    setLoading(true);
    try {
      const lowerCasedSearchText = searchText.toLowerCase();

      if (searchText === "") {
        // Reset to default view when search is cleared
        setDisplayedPokemonList(allPokemonList.slice(0, 20));
        setHasLoadedAll(false); // Allow "Load More" to appear
      } else {
        // If not all Pokémon are loaded, fetch all for searching
        if (!hasLoadedAll) {
          const allPokemons = await getPokemonList(1500, 0);
          setAllPokemonList(allPokemons);
          setHasLoadedAll(true);

          const filteredPokemons = allPokemons.filter((pokemon: Pokemon) =>
            pokemon.name.toLowerCase().includes(lowerCasedSearchText)
          );
          setDisplayedPokemonList(filteredPokemons);
        } else {
          // Filter already loaded Pokémon
          const filteredPokemons = allPokemonList.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(lowerCasedSearchText)
          );
          setDisplayedPokemonList(filteredPokemons);
        }
      }
    } catch (error) {
      console.error("Failed to search Pokémon:", error);
    }
    setLoading(false);
  };

  // Load more Pokémon
  const loadMorePokemons = async () => {
    if (loading || hasLoadedAll) return;

    setLoading(true);
    try {
      const newPokemons = await getPokemonList(20, allPokemonList.length);
      if (newPokemons.length === 0) {
        setHasLoadedAll(true); // No more Pokémon to load
      } else {
        const updatedList = [...allPokemonList, ...newPokemons];
        setAllPokemonList(updatedList);
        setDisplayedPokemonList(
          updatedList.slice(0, displayedPokemonList.length + 20)
        );
      }
    } catch (error) {
      console.error("Failed to load more Pokémon:", error);
    }
    setLoading(false);
  };

  // Initial load of Pokémon
  useEffect(() => {
    if (initialPokemonList.length === 0) {
      loadMorePokemons();
    }
  }, []);

  // Handle search text changes
  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      searchFilter();

      loadMorePokemons();
    }, 300); // Debounce search for better performance

    return () => clearTimeout(debounceTimeout);
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
            onChange={(e) => setSearchText(e.target.value)}
            // disabled={loading}
          />
        </div>

        <h3 className="text-3xl pt-12 pb-6 text-center">Pokémon Collection</h3>
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 md:grid-cols-2 w-full max-w-screen-xl mx-auto">
        {displayedPokemonList.length > 0 ? (
          displayedPokemonList.map((pokemon) => (
            <PokemonCard key={pokemon.name} name={pokemon.name} />
          ))
        ) : (
          <p className="text-center">
            {loading
              ? "Loading..."
              : `No Pokémon found matching "${searchText}"`}
          </p>
        )}
      </div>

      {!hasLoadedAll && (
        <div className="text-center w-full md:w-auto">
          <button
            className="group rounded-lg border border-transparent md:m-5 px-5 py-2 transition-colors dark:border-gray-500 dark:bg-gray-800 hover:border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 dark:hover:border-gray-600 w-full md:w-auto flex items-center justify-center gap-2"
            onClick={loadMorePokemons}
            disabled={loading}
          >
            {loading ? (
              <>
                <span>Loading</span>
                <l-dot-pulse size="24" speed="1.3" color="white"></l-dot-pulse>
              </>
            ) : (
              "Load More"
            )}
          </button>
        </div>
      )}
    </>
  );
}
