import { useRouter } from 'expo-router';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { PokemonCard } from '@/components/PokemonCard';
import { Colors } from '@/constants/colors';
import { MOCK_POKEMON } from '@/constants/mockPokemon';

export default function PokedexScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <FlatList
        data={MOCK_POKEMON}
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
});
