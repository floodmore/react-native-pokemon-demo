import type { Pokemon } from '@/hooks/usePokemon';

export async function fetchPokemon(nameOrUrl: string): Promise<Pokemon> {
  const url = nameOrUrl.startsWith('http')
    ? nameOrUrl
    : `https://pokeapi.co/api/v2/pokemon/${nameOrUrl}`;

  const res = await fetch(url);
  const data = await res.json();

  return {
    id: data.id,
    name: data.name,
    types: data.types.map((t: { type: { name: string } }) => t.type.name),
    stats: data.stats.map((s: { base_stat: number; stat: { name: string } }) => ({
      name: s.stat.name,
      value: s.base_stat,
    })),
    imageUrl:
      data.sprites?.other?.['official-artwork']?.front_default ??
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`,
  };
}
