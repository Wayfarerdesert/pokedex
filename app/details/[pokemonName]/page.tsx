"use client";

import React, { useEffect, useState } from "react";
import { getPokemon } from "../../../lib/pokemonAPI";
import { PokemonImage } from "../../../components/pokemon-image";
import { Progress } from "@/components/ui/progress";
import RedirectButton from "@/components/redirect-button";
import { PokemonObject } from "@/components/types";

export default function PokemonPage({
  params,
}: {
  params: { pokemonName: string };
}) {
  const { pokemonName } = params;

  // State to track Pokémon data
  const [pokemonObject, setPokemonObject] = useState<PokemonObject | null>(null);

  // Fetch Pokémon data
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const fetchedPokemon = await getPokemon(pokemonName);
        setPokemonObject(fetchedPokemon);
      } catch (error) {
        console.error("Failed to fetch Pokémon data:", error);
      }
    };

    fetchPokemon();
  }, [pokemonName]);

  return (
    <>
      <h1 className="text-4xl font-bold pt-4">
        {pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)}
      </h1>
      <div className="flex flex-col md:flex-row md:justify-between mb-6">
        <div
          className="mr-10 flex justify-center items-center"
          style={{
            position: "relative",
            width: "300px",
            height: "300px",
          }}
        >
          {!pokemonObject ? (
            <l-helix size="65" speed="2.5" color="#61A0EA"></l-helix>
          ) : (
            <PokemonImage
              image={
                pokemonObject.sprites.other["official-artwork"].front_default
              }
              name={pokemonName}
            />
          )}
        </div>

        <div className="flex flex-col md:flex-row justify-between p-8 m-10 md:pt-12 space-x-10 border rounded-lg shadow-lg w-full max-w-screen-xl mx-auto text-center md:text-left">
          {/* Basic Details */}
          <div className="flex flex-col space-y-2">
            {pokemonObject ? (
              [
                { label: "ID Number", value: pokemonObject.id },
                { label: "Weight", value: pokemonObject.weight },
                { label: "Height", value: pokemonObject.height },
                {
                  label: "Type",
                  value: pokemonObject.types
                    .map((typeObj) => typeObj.type.name)
                    .join(", "),
                },
              ].map((item, index) => (
                <h3 key={index} className="text-lg font-semibold">
                  {item.label}: {item.value}
                </h3>
              ))
            ) : (
              <div className="flex flex-row items-end">
                <p className="mr-3">Loading Pokémon details</p>
                <l-dot-pulse size="24" speed="1.3" color="white"></l-dot-pulse>
              </div>
            )}
          </div>

          {/* Abilities */}
          <div className="flex flex-col mt-6 md:mt-0 space-y-2">
            <h3 className="font-bold text-lg">Abilities</h3>
            <ul className="list-disc pl-3">
              {pokemonObject ? (
                pokemonObject.abilities.map((abilityObject) => {
                  const abilityName = abilityObject.ability.name;
                  const formattedAbilityName =
                    abilityName.charAt(0).toUpperCase() + abilityName.slice(1);

                  return (
                    <li key={abilityName} className="p-2 text-lg">
                      {formattedAbilityName}
                    </li>
                  );
                })
              ) : (
                <div className="flex flex-row items-end">
                  <p className="mr-3">Loading abilities</p>
                  <l-dot-pulse
                    size="24"
                    speed="1.3"
                    color="white"
                  ></l-dot-pulse>
                </div>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="flex-col mx-auto">
        <h3 className="font-bold text-lg mt-10">Stat List</h3>
        {pokemonObject ? (
          pokemonObject.stats.map((statObject) => {
            const statName = statObject.stat.name;
            const statValue = statObject.base_stat;

            return (
              <div
                className="flex items-stretch align-middle w-[90vw] md:w-[60vw] xl:w-[40vw]"
                key={statName}
              >
                <h3 className="py-3 w-2/6 md:w-2/4">
                  {statName}: {statValue}
                </h3>
                <Progress
                  className="w-2/6 sm:w-3/6 md:w-2/4 xl:w-3/4 m-auto"
                  value={statValue}
                />
              </div>
            );
          })
        ) : (
          <div className="flex flex-row items-end">
            <p className="mr-3">Loading stats</p>
            <l-dot-pulse size="24" speed="1.3" color="white"></l-dot-pulse>
          </div>
        )}
      </div>

      {/* Redirect Button */}
      <div className="mt-8 w-full md:w-auto">
        <RedirectButton />
      </div>
    </>
  );
}
