const POKEMON_API = "https://pokeapi.co/api/v2/";

export async function getPokemonList(limit = 20, offset = 0) {
  const response = await fetch(POKEMON_API + `pokemon/?limit=${limit}&offset=${offset}`);
  const data = await response.json();
  return data.results;
}

// getPokemon => get the information of the selected pokemon
