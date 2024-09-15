"use client";

import { PokemonCard } from "@/components/pokemon-card";
import { useState, useEffect } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { getPokemonList } from "@/lib/pokemonAPI";

// interface PokemonCardProps {
//   pokemonList: any;
// }

export function PokemonGrid() {
  const [pokemonList, setPokemonList] = useState<any[]>([]);
  const [searchText, setSearchText] = useState("");
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const limit = 10;

  const loadMorePokemons = async () => {
    setLoading(true);
    const newPokemons = await getPokemonList(limit, offset);
    setPokemonList((prevList) => [...prevList, ...newPokemons]);
    setOffset((prevOffset) => prevOffset + limit);
    setLoading(false);
  };

  useEffect(() => {
    loadMorePokemons();
  }, []);

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
          />
        </div>

        <h3 className="text-3xl pt-12 pb-6 text-center">Pokémon Collection</h3>
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-3 lg:text-left">
        {pokemonList.map((pokemon: any) => (
          <PokemonCard key={pokemon.name} name={pokemon.name} />
        ))}
      </div>

      <div className="text-center">
        <button
          className="group rounded-lg border border-transparent m-6 px-5 py-2 transition-colors dark:border-gray-500 dark:bg-gray-800 hover:border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 dark:hover:border-gray-600"
          onClick={loadMorePokemons}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Load More'}
        </button>
      </div>
    </>
  );
}
