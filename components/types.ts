export interface PokemonObject {
    id: number;
    weight: number;
    height: number;
    types: { type: { name: string } }[];
    abilities: { ability: { name: string } }[];
    stats: { stat: { name: string }; base_stat: number }[];
    sprites: {
      other: {
        "official-artwork": {
          front_default: string;
        };
      };
    };
  }
  