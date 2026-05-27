import { StyleSheet, Text, View } from 'react-native';

export default function PokedexScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello AVL.js</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
