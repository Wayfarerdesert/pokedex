import { PokemonGrid } from "@/components/pokemon-grid";
// import { getPokemonList } from "@/lib/pokemonAPI";

export default async function Home() {
  // load Data
  // const pokemonList = await getPokemonList();

  return (
    <>
      {/* <PokemonGrid pokemonList={pokemonList} /> */}
      <PokemonGrid />
    </>
  );
}
