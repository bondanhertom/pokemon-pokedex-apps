import axios from 'axios';

export interface Pokemon {
  name: string;
  id: number;
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  types: {
    slot: number;
    type: {
      name: string;
    };
  }[];
}

export interface PokemonResult {
  count: number;
  next: string;
  previous?: string;
  results: {
    name: string;
    url: string;
  }[];
}

export interface Species {
  flavor_text_entries: {
    flavor_text: string;
  }[];
}

export async function fetchFn(endpoint: string) {
  try {
    const response = await axios.get(endpoint);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllPokemon({pageParam}: {pageParam?: string}) {
  try {
    const response = await axios.get(
      pageParam || 'https://pokeapi.co/api/v2/pokemon/?limit=25',
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
