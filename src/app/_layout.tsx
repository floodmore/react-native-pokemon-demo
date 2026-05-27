import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";

import { CaughtProvider } from "@/context/CaughtContext";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <CaughtProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="pokemon/[id]"
            options={{ title: "Details", headerBackTitle: "Pokédex" }}
          />
        </Stack>
      </CaughtProvider>
    </QueryClientProvider>
  );
}
