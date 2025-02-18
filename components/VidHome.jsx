import React, { useRef, useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Video } from 'expo-av';
import Icon from 'react-native-vector-icons/Feather';

// 🔹 Datos simulados iniciales (Solo los primeros 10)
const initialVideoData = [
  {
    id: '1',
    title: 'Cómo hacer saltos básicos y aterrizar de forma segura',
    author: 'Andy William',
    views: '54K',
    time: '8 min',
    imgPreview: 'https://images.pexels.com/photos/30735264/pexels-photo-30735264.jpeg?auto=compress&cs=tinysrgb&w=600',
    avatar: 'https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    videoUrl: 'https://media.istockphoto.com/id/1662281654/video/female-volleyball-player-spiking-the-ball-while-other-team-defending-at-sports-court.mp4?s=mp4-640x640-is&k=20&c=AHQwzk_1VRSIsWhlR5hAQIUJ3CnElqemJ_LtzRWwJ6c=',
  },
  {
    id: '2',
    title: 'Prepare for your first skateboard jump',
    author: 'Gerard Bind',
    views: '42K',
    time: '5 min',
    imgPreview: 'https://images.pexels.com/photos/6203514/pexels-photo-6203514.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    avatar: 'https://images.pexels.com/photos/3370021/pexels-photo-3370021.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    videoUrl: 'https://media.istockphoto.com/id/1479959180/video/ld-blue-female-volleyball-team-striking-a-point-and-celebrating.mp4?s=mp4-640x640-is&k=20&c=C9exPI5XVYxFZgGMVLh_c1BKhfKZiqb88PgqZNLfwn4=',
  },
  {
    id: '3',
    title: 'Domina los trucos avanzados',
    author: 'Jane Doe',
    views: '98K',
    time: '10 min',
    imgPreview: 'https://images.pexels.com/photos/30735264/pexels-photo-30735264.jpeg?auto=compress&cs=tinysrgb&w=600',
    avatar: 'https://images.pexels.com/photos/1024311/pexels-photo-1024311.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    videoUrl: 'https://media.istockphoto.com/id/1452708598/video/female-volleyball-player-spiking-the-ball-while-other-team-defending-at-sports-court.mp4?s=mp4-640x640-is&k=20&c=uvjGRvTeFuYIcAuzR-CZXHnYZ3xA1pOt4wWN4e1pBIo=',
  },
];

// 🔹 Simulación de paginación (Carga de 3 en 3)
const fetchMoreVideos = async (page) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newVideos = Array.from({ length: 3 }).map((_, index) => ({
        id: `${page * 3 + index + 1}`,
        title: `Partido ${page * 3 + index + 1} - Resumen`,
        author: `Equipo ${index % 5 + 1}`,
        views: `${Math.floor(Math.random() * 100)}K`,
        time: `${Math.floor(Math.random() * 10) + 1} min`,
        imgPreview: 'https://images.pexels.com/photos/30735264/pexels-photo-30735264.jpeg?auto=compress&cs=tinysrgb&w=600',
        avatar: 'https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
        // videoUrl: 'https://flutter.github.io/assets-for-api-docs/assets/videos/bee.mp4',
      }));
      resolve(newVideos);
    }, 1500);
  });
};

export default function VideoList() {
  const navigation = useNavigation();
  const videoRefs = useRef({});
  const [videos, setVideos] = useState(initialVideoData);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  // 🔹 Función para cargar más videos cuando se llega al final de la lista
  const loadMoreVideos = async () => {
    if (loadingMore) return;
    setLoadingMore(true);
    const newVideos = await fetchMoreVideos(page);
    setVideos((prev) => [...prev, ...newVideos]);
    setPage((prev) => prev + 1);
    setLoadingMore(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Últimos Partidos <Icon name="video" size={24} color="#fff" />
      </Text>

      <FlatList
        data={videos}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        initialNumToRender={4} // 🔹 Renderiza solo 4 videos inicialmente
        maxToRenderPerBatch={4} // 🔹 Evita que se carguen demasiados videos de golpe
        windowSize={6} // 🔹 Mantiene en memoria los videos cercanos para mejor rendimiento
        onEndReached={loadMoreVideos}
        onEndReachedThreshold={0.3} // 🔹 Carga más videos antes de que el usuario llegue al final
        ListFooterComponent={loadingMore ? <ActivityIndicator size="large" color="#fff" /> : null}
        renderItem={({ item }) => (
          <View style={styles.videoCard}>
            <View style={styles.videoWrapper}>
              <Image source={{ uri: item.imgPreview }} style={styles.video} />
              <View style={styles.videoTime}>
                <Text style={styles.videoTimeText}>{item.time}</Text>
              </View>
              <View style={styles.authorWrapper}>
                <Icon name="check" size={10} color="#fff" style={styles.checkIcon} />
                <Image source={{ uri: item.avatar }} style={styles.avatar} />
              </View>
            </View>

            <Text style={styles.videoAuthor}>{item.author}</Text>
            <Text style={styles.videoTitle}>{item.title}</Text>
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
    </View>
  );
}

// 🔹 **Estilos optimizados**
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 4,
    backgroundColor: 'transparent',
  },
  header: {
    fontSize: 24,
    fontWeight: '500',
    color: '#fff',
    marginVertical: 20,
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
  authorWrapper: {
    position: 'absolute',
    bottom: -15,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkIcon: {
    backgroundColor: '#0aa0f7',
    borderRadius: 50,
    padding: 2,
    marginRight: -10,
    zIndex: 1,
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
