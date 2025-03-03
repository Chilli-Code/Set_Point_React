import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TextInput, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Video } from 'expo-av';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Icon from 'react-native-vector-icons/Feather';
import {useTheme } from '../context/ThemeContext';

export default function AllVideos() {
  const { theme, darkMode, toggleTheme } = useTheme(); // ⬅ Ahora usamos el tema

  const navigation = useNavigation();
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // 🔹 Simulación de carga de videos desde un servidor
  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      setTimeout(() => {
const fetchedVideos = [
  {
    id: '1',
    title: 'Gran Final - Leones Vóley vs. Dragones de la Costa',
    author: 'Liga Profesional de Vóley',
    views: '54K',
    time: '8 min',
    imgPreview: 'https://images.pexels.com/photos/6203514/pexels-photo-6203514.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    avatar: 'https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  },
  {
    id: '2',
    title: 'Semifinal - Águilas del Norte vs. Toros del Pacífico',
    author: 'Copa Internacional de Vóley',
    views: '42K',
    time: '5 min',
    imgPreview: 'https://images.pexels.com/photos/30735264/pexels-photo-30735264.jpeg?auto=compress&cs=tinysrgb&w=600',
    avatar: 'https://images.pexels.com/photos/3370021/pexels-photo-3370021.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    videoUrl: 'https://media.istockphoto.com/id/1479959180/video/ld-blue-female-volleyball-team-striking-a-point-and-celebrating.mp4?s=mp4-640x640-is&k=20&c=C9exPI5XVYxFZgGMVLh_c1BKhfKZiqb88PgqZNLfwn4=',
  },
  {
    id: '3',
    title: 'Cuartos de Final - Titanes vs. Jaguares',
    author: 'Campeonato Nacional de Vóley',
    views: '98K',
    time: '10 min',
    imgPreview: 'https://images.pexels.com/photos/30735264/pexels-photo-30735264.jpeg?auto=compress&cs=tinysrgb&w=600',
    avatar: 'https://images.pexels.com/photos/1024311/pexels-photo-1024311.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    videoUrl: 'https://media.istockphoto.com/id/1452708598/video/female-volleyball-player-spiking-the-ball-while-other-team-defending-at-sports-court.mp4?s=mp4-640x640-is&k=20&c=uvjGRvTeFuYIcAuzR-CZXHnYZ3xA1pOt4wWN4e1pBIo=',
  },
];

        setVideos(fetchedVideos);
        setFilteredVideos(fetchedVideos);
        setLoading(false);
      }, 1500);
    };

    fetchVideos();
  }, []);

  // 🔍 Función para filtrar videos
  const handleSearch = (text) => {
    setSearch(text);
    if (text.trim() === '') {
      setFilteredVideos(videos);
    } else {
      const filtered = videos.filter((video) =>
        video.title.toLowerCase().includes(text.toLowerCase()) ||
        video.author.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredVideos(filtered);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* 🔹 Barra de búsqueda */}
      <View style={[styles.searchBar, {backgroundColor: theme.inputColor}]}>
        <Icon name="search" size={18} color="#717790" style={styles.searchIcon} />
        <TextInput
          style={[styles.input, { color: theme.text }]}
          placeholder="Search"
          placeholderTextColor="#717790"
          value={search}
          onChangeText={handleSearch}
        />
      </View>

      {/* 🔹 Indicador de carga */}
      {loading ? (
        <ActivityIndicator size="large" color={theme.text} style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={filteredVideos}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          renderItem={({ item }) => (
            <View style={[styles.videoCard, { backgroundColor: theme.cardVideo }]}>
              <View style={styles.videoWrapper}>
              <Image
  source={{ uri: item.imgPreview }}
  style={styles.video}
  resizeMode="cover"
/>

                <View style={styles.videoTime}>
                  <Text style={styles.videoTimeText}>{item.time}</Text>
                </View>
                <View style={styles.authorWrapper}>
              <Icon name="check" size={10} color="#fff" style={styles.checkIcon} />
                  <Image source={{ uri: item.avatar }} style={styles.avatar} />
                </View>
              </View>

              <Text style={styles.videoAuthor}>{item.author}</Text>
              <Text style={[styles.videoTitle, {color: theme.text}]}>{item.title}</Text>
              <Text style={styles.videoViews}>{item.views} views • 1 week ago</Text>

              {/* 🔹 BOTÓN DE OJO PARA NAVEGAR A INFO VIDEO */}
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => navigation.navigate('InfoVideo', { video: item })}
              >
                <Icon name="eye" size={20} color="#fff" />
                <Text style={styles.eyeButtonText}>Ver más</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

// 🔹 **Estilos optimizados**
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 10,
    backgroundColor: '#1f1d2b',
    marginBottom: 40,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 40,
    backgroundColor: '#252836',
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
    paddingLeft: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  row: {
    justifyContent: 'space-between',
  },
  videoCard: {
    flex: 1,
    backgroundColor: '#252936',
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 20,
    marginHorizontal: 5,
    paddingBottom: 10,
  },
  videoWrapper: {
    position: 'relative',
  },
  video: {
    width: '100%',
    height: 150,
    borderRadius: 15,
  },
  videoTime: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  videoTimeText: {
    color: '#fff',
    fontSize: 12,
  },
  checkIcon: {
    backgroundColor: '#0aa0f7',
    borderRadius: 50,
    padding: 2,
    marginRight: -10,
    zIndex: 1,
  },
  authorWrapper: {
    position: 'absolute',
    bottom: -15,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  videoAuthor: {
    paddingHorizontal: 10,
    paddingTop: 15,
    color: '#bbb',
    fontSize: 14,
  },
  videoTitle: {
    paddingHorizontal: 10,
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    paddingVertical: 5,
  },
  videoViews: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    fontSize: 12,
    color: '#bbb',
  },
  eyeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6C5ECF',
    borderRadius: 10,
    padding: 8,
    marginHorizontal: 10,
    marginTop: 8,
    justifyContent: 'center',
  },
  eyeButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
  },
});
