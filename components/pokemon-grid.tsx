"use client";

import { PokemonCard } from "@/components/pokemon-card";
import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

export function PokemonGrid() {
  const [searchText, setSearchText] = useState("");

  return (
    <>
      <div>
        <h3 className="text-2xl py-6 text-center">Search for your Pokémon!</h3>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="Pokémon Name">Pokémon Name</Label>
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
        <PokemonCard name="pikachu" />
        <PokemonCard name="pikachu" />
        <PokemonCard name="pikachu" />
      </div>
    </>
  );
}
