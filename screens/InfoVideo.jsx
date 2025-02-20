import React, { useState, useCallback } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import { useEvent } from 'expo';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import RelatedVideos from '../components/RelatedVideos';
import PlayersList from '../components/CardsPlayers';
import {useTheme} from '../context/ThemeContext';

export default function InfoVideoScreen() {
    const { darkMode, toggleTheme, theme } = useTheme(); // Obtener estado del tema global
  const route = useRoute();
  const navigation = useNavigation();
  const { video } = route.params;

  const [refreshing, setRefreshing] = useState(false);
  const [videoError, setVideoError] = useState(false);

  // 🔹 Configuración del reproductor con expo-video
  const player = useVideoPlayer(video.videoUrl, (player) => {
    player.loop = false;
  });

  // 🔹 Detectar si el video está reproduciéndose o en pausa
  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });

  // 🔹 Función para refrescar la pantalla
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setVideoError(false);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  return (
    <FlatList
      style={[styles.container, {backgroundColor: theme.background}]}
      data={[{ id: '1' }, { id: '2' }]} // Para evitar errores con FlatList vacía
      keyExtractor={(item) => item.id}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      renderItem={({ item }) => {
        if (item.id === '1') {
          return (
            <>
              {/* 🔹 Botón para regresar */}
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Icon name="arrow-left" size={24} color={theme.text} />
                <Text style={[styles.backText, {color: theme.text}]}>Regresar</Text>
              </TouchableOpacity>

              {/* 🔹 Video Principal */}
              {videoError ? (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>⚠️ No se pudo cargar el video.</Text>
                  <TouchableOpacity onPress={onRefresh} style={styles.retryButton}>
                    <Text style={styles.retryText}>Intentar de nuevo</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <VideoView
                  style={styles.video}
                  player={player}
                  allowsFullscreen
                  allowsPictureInPicture
                  onError={() => setVideoError(true)}
                />
              )}

              {/* 🔹 Controles de reproducción */}

            </>
          );
        }

        if (item.id === '2') {
          return (
            <View style={styles.videoDetail}>
              <View style={styles.videoInfo}>
                <Image source={{ uri: video.avatar }} style={styles.avatar} />
                <View style={{ paddingRight: 20 }}>
                  <Text style={[styles.videoTitle, {color: theme.text}]}>{video.title}</Text>
                  <Text style={[styles.videoAuthor, {color: theme.text}]}>{video.author}</Text>
                </View>
              </View>

              {/* 🔹 Botones */}
              <View style={styles.buttonWrapper}>
                <TouchableOpacity style={styles.likeButton}>
                  <Icon name="thumbs-up" size={20} color="#fff" />
                  <Text style={styles.buttonText}>Like</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.shareButton}>
                  <Icon name="share" size={20} color="#fff" />
                  <Text style={styles.buttonText}>Compartir</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buyButton}>
                  <Icon name="dollar-sign" size={20} color="#fff" />
                  <Text style={styles.buttonText}>Comprar</Text>
                </TouchableOpacity>
              </View>

              <Text style={[styles.videoDescription, {color: theme.text}]}>
                📌 Información básica y datos del partido{' '}
                <Icon name="award" size={18} color={theme.text} />
              </Text>

              <Text style={styles.description}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus illum tempora
                consequuntur.
              </Text>
            </View>
          );
        }
      }}
      ListFooterComponent={
        <>
          <RelatedVideos />
          <PlayersList />
        </>
      }
    />
  );
}

// 🔹 **Estilos**
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818',
  },
  video: {
    width: '100%',
    height: 250,
  },
  controlsContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  // controlButton: {
  //   backgroundColor: '#6c5ecf',
  //   paddingVertical: 10,
  //   paddingHorizontal: 20,
  //   borderRadius: 8,
  // },
  controlText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  videoDetail: {
    padding: 16,
  },
  videoInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    marginRight: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  videoAuthor: {
    fontSize: 14,
    color: '#bbb',
  },
  videoDescription: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
  },
  description: {
    fontSize: 14,
    color: '#bbb',
    lineHeight: 20,
    marginTop: 20,
  },
  buttonWrapper: {
    flexDirection: 'row',
    marginTop: 20,
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6c5ecf',
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff7551',
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  buyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0ed640',
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    marginLeft: 5,
    fontSize: 14,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 6,
    marginBottom: 10,
  },
  backText: {
    color: '#fff',
    marginLeft: 5,
    fontSize: 16,
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 250,
  },
  errorText: {
    color: '#ff4444',
    fontSize: 16,
    marginBottom: 10,
  },
  retryButton: {
    backgroundColor: '#ff7551',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  retryText: {
    color: '#fff',
    fontSize: 14,
  },
});
