import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Colors, TypeColors } from '@/constants/colors';

type Props = {
  pokemon: { id: number; name: string; types: string[] };
  onPress: () => void;
};

export function PokemonCard({ pokemon, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <Text style={styles.id}>#{String(pokemon.id).padStart(3, '0')}</Text>
      <Text style={styles.name}>{pokemon.name}</Text>
      <View style={styles.types}>
        {(pokemon.types ?? []).map((type) => (
          <View key={type} style={[styles.badge, { backgroundColor: TypeColors[type] }]}>
            <Text style={styles.badgeText}>{type}</Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  id: {
    fontSize: 12,
    color: Colors.textMuted,
    marginBottom: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    textTransform: 'capitalize',
    marginBottom: 8,
  },
  types: {
    flexDirection: 'row',
    gap: 6,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
});
