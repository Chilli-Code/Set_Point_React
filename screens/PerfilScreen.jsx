import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Menu from '../components/Menu';

export default function PerfilScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pantalla Perfil Usuario</Text>
      <Menu />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
