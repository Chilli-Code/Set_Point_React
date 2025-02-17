import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Menu from '../components/Menu';
import ProfileWithSkills  from '../components/InfoPerfil';
import ClipsPerfil from '../components/ClipsPerfil';

export default function PerfilScreen() {
  return (
    <View style={styles.container}>
      <ProfileWithSkills />
      <ClipsPerfil />
      <Menu />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#1f1d2b',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
