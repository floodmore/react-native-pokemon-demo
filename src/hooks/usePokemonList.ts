import { useQuery } from '@tanstack/react-query';

import { fetchPokemon } from '@/lib/api';

type RawListItem = {
  name: string;
  url: string;
};

export type PokemonListItem = {
  id: number;
  name: string;
  types: string[];
};

async function fetchPokemonList(): Promise<PokemonListItem[]> {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
  const data = await res.json();

  return Promise.all(
    data.results.map((item: RawListItem) => fetchPokemon(item.url)),
  );
}

export function usePokemonList() {
  return useQuery({
    queryKey: ['pokemon-list'],
    queryFn: fetchPokemonList,
  });
}
