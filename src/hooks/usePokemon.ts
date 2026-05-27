import { useQuery } from '@tanstack/react-query';

import { fetchPokemon } from '@/lib/api';

export type Pokemon = {
  id: number;
  name: string;
  types: string[];
  stats: { name: string; value: number }[];
  imageUrl: string;
};

export function usePokemon(name: string) {
  return useQuery({
    queryKey: ['pokemon', name],
    queryFn: () => fetchPokemon(name),
    enabled: !!name,
  });
}
