import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Menu from '../components/Menu';
import Header from '../components/HeaderHome';
import AllVideos from '../components/AllVideos';

export default function VideosScreen() {
  const [search, setSearch] = useState('');

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.title}>Todos Nuestros Videos</Text>
      <AllVideos />
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
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    height: 40,
    backgroundColor: '#252836',
    borderRadius: 8,
    marginTop: 10,
    paddingHorizontal: 12,
    elevation: 2, // Sombra para resaltar
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
    paddingLeft: 8,
  },
  searchIcon: {
    marginRight: 8, // Espaciado entre el icono y el texto
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
});
