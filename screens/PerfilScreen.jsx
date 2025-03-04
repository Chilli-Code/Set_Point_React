import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Menu from '../components/Menu';
import ProfileWithSkills  from '../components/InfoPerfil';
import ClipsPerfil from '../components/ClipsPerfil';
import { useTheme } from '../context/ThemeContext';

export default function PerfilScreen() {
  const { theme, darkMode, toggleTheme } = useTheme(); // ⬅ Ahora usamos el tema

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
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
    // backgroundColor: '#1f1d2b',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
