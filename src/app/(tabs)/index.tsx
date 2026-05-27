import { useRouter } from 'expo-router';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';

import { PokemonCard } from '@/components/PokemonCard';
import { Colors } from '@/constants/colors';
import { usePokemonList } from '@/hooks/usePokemonList';

export default function PokedexScreen() {
  const router = useRouter();
  const { data, isLoading, isError } = usePokemonList();

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>Failed to load Pokémon</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <PokemonCard
            pokemon={item}
            onPress={() => router.push(`/pokemon/${item.name}`)}
          />
        )}
        contentContainerStyle={styles.list}
        ListHeaderComponent={<Text style={styles.header}>Pokédex</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
  },
  list: {
    paddingVertical: 12,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  error: {
    color: Colors.primary,
    fontSize: 16,
  },
});
