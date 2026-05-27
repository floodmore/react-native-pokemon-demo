import { createContext, useContext, useState } from 'react';

type CaughtContextValue = {
  caught: Set<string>;
  catchPokemon: (name: string) => void;
};

const CaughtContext = createContext<CaughtContextValue | null>(null);

export function CaughtProvider({ children }: { children: React.ReactNode }) {
  const [caught, setCaught] = useState<Set<string>>(new Set());

  function catchPokemon(name: string) {
    setCaught((prev) => new Set(prev).add(name));
  }

  return (
    <CaughtContext.Provider value={{ caught, catchPokemon }}>
      {children}
    </CaughtContext.Provider>
  );
}

export function useCaught() {
  const ctx = useContext(CaughtContext);
  if (!ctx) throw new Error('useCaught must be used inside CaughtProvider');
  return ctx;
}
