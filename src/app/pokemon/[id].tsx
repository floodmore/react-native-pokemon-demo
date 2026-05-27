import { useLocalSearchParams } from 'expo-router';
import { Image } from 'expo-image';
import * as Haptics from 'expo-haptics';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useCaught } from '@/context/CaughtContext';
import { Colors, TypeColors } from '@/constants/colors';
import { usePokemon } from '@/hooks/usePokemon';

export default function PokemonDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: pokemon, isLoading, isError } = usePokemon(id);
  const { caught, catchPokemon } = useCaught();
  const isCaught = pokemon ? caught.has(pokemon.name) : false;

  function handleCatch() {
    if (!pokemon || isCaught) return;
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    catchPokemon(pokemon.name);
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (isError || !pokemon) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>Failed to load Pokémon</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Image source={{ uri: pokemon.imageUrl }} style={styles.image} contentFit="contain" />

        <Text style={styles.name}>{pokemon.name}</Text>
        <Text style={styles.id}>#{String(pokemon.id).padStart(3, '0')}</Text>

        <View style={styles.types}>
          {pokemon.types.map((type) => (
            <View key={type} style={[styles.badge, { backgroundColor: TypeColors[type] }]}>
              <Text style={styles.badgeText}>{type}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Base Stats</Text>
        {pokemon.stats.map((stat) => (
          <View key={stat.name} style={styles.statRow}>
            <Text style={styles.statName}>{stat.name}</Text>
            <Text style={styles.statValue}>{stat.value}</Text>
            <View style={styles.statBarBg}>
              <View style={[styles.statBar, { width: `${Math.min(stat.value / 255, 1) * 100}%` }]} />
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.catchButton, isCaught && styles.catchButtonCaught]}
          onPress={handleCatch}
          disabled={isCaught}
        >
          <Text style={styles.catchButtonText}>{isCaught ? 'Caught!' : 'Catch Pokémon'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
  },
  content: {
    alignItems: 'center',
    padding: 24,
    paddingBottom: 100,
  },
  image: {
    width: 200,
    height: 200,
  },
  name: {
    fontSize: 32,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    color: Colors.text,
    marginTop: 8,
  },
  id: {
    fontSize: 14,
    color: Colors.textMuted,
    marginBottom: 12,
  },
  types: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 24,
  },
  badge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeText: {
    color: '#fff',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginBottom: 8,
    gap: 8,
  },
  statName: {
    fontSize: 12,
    color: Colors.textMuted,
    textTransform: 'capitalize',
    width: 100,
  },
  statValue: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.text,
    width: 32,
    textAlign: 'right',
  },
  statBarBg: {
    flex: 1,
    height: 6,
    backgroundColor: Colors.border,
    borderRadius: 3,
    overflow: 'hidden',
  },
  statBar: {
    height: 6,
    backgroundColor: Colors.primary,
    borderRadius: 3,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  catchButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  catchButtonCaught: {
    backgroundColor: Colors.textMuted,
  },
  catchButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  error: {
    color: Colors.primary,
    fontSize: 16,
  },
});
