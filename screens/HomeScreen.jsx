import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import SwiperHome from '../components/SwiperHome';
import Header from '../components/HeaderHome';
import VideoList from '../components/VidHome';
import Menu from '../components/Menu';
import { useTheme } from '../context/ThemeContext';

export default function HomeScreen({ navigation }) {
  const {theme } = useTheme();
  return (
    <View  style={[styles.container, { backgroundColor: theme.background }]}>
        <Header />
      {/* <Text style={styles.welcomeText}>¡Bienvenido al Home!</Text> */}
      <SwiperHome />
      <VideoList />
      <Menu />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#1f1d2b',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  logoutText: {
    color: '#6C5ECF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
