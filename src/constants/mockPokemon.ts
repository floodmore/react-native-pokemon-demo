export type MockPokemon = {
  id: number;
  name: string;
  types: string[];
};

export const MOCK_POKEMON: MockPokemon[] = [
  { id: 1, name: 'bulbasaur', types: ['grass', 'poison'] },
  { id: 4, name: 'charmander', types: ['fire'] },
  { id: 7, name: 'squirtle', types: ['water'] },
  { id: 25, name: 'pikachu', types: ['electric'] },
  { id: 39, name: 'jigglypuff', types: ['normal', 'fairy'] },
  { id: 52, name: 'meowth', types: ['normal'] },
  { id: 54, name: 'psyduck', types: ['water'] },
  { id: 94, name: 'gengar', types: ['ghost', 'poison'] },
  { id: 129, name: 'magikarp', types: ['water'] },
  { id: 133, name: 'eevee', types: ['normal'] },
];
