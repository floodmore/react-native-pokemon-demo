import { useRouter } from 'expo-router';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useCaught } from '@/context/CaughtContext';
import { Colors } from '@/constants/colors';

export default function FavoritesScreen() {
  const { caught } = useCaught();
  const router = useRouter();
  const caughtList = Array.from(caught);

  if (caughtList.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>No caught Pokémon yet</Text>
        <Text style={styles.emptyHint}>Tap "Catch Pokémon" on a detail screen</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={caughtList}
        keyExtractor={(name) => name}
        renderItem={({ item: name }) => (
          <TouchableOpacity
            style={styles.row}
            onPress={() => router.push(`/pokemon/${name}`)}
          >
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.badge}>Caught ✓</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.list}
        ListHeaderComponent={<Text style={styles.header}>Caught Pokémon</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
    gap: 8,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  emptyHint: {
    fontSize: 14,
    color: Colors.textMuted,
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
  row: {
    backgroundColor: Colors.card,
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    textTransform: 'capitalize',
  },
  badge: {
    fontSize: 13,
    color: Colors.textMuted,
  },
});
