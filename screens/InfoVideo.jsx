import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Video } from 'expo-av';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import RelatedVideos from '../components/RelatedVideos'
import PlayersList from '../components/CardsPlayers'

export default function InfoVideoScreen() {
  const route = useRoute(); // 🔹 Obtiene los datos pasados por navegación
  const navigation = useNavigation();
  const { video } = route.params; // 🔹 Extrae el video recibido

  return (
    <ScrollView style={styles.container}>
        {/* 🔹 Botón para regresar */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrow-left" size={24} color="#fff" />
            <Text style={styles.backText}>Regresar</Text>
        </TouchableOpacity>
      {/* 🔹 Video Principal */}
      <Video
        source={{ uri: video.videoUrl }}
        style={styles.video}
        resizeMode="cover"
        useNativeControls
        shouldPlay
      />
      
      {/* 🔹 Información del Video */}
      <View style={styles.videoDetail}>
        <View style={styles.videoInfo}>
          <Image source={{ uri: video.avatar }} style={styles.avatar} />
          <View>
            <Text style={styles.videoTitle}>{video.title}</Text>
            <Text style={styles.videoAuthor}>{video.author}</Text>
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


        <Text style={styles.videoDescription}>
          📌 Informacion basica y datos de el partido{' '}
          <Icon name="award" size={18} color="#fff" />
        </Text>

        <Text style={styles.description}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus illum 
          tempora consequuntur. Lorem ipsum dolor sit amet consectetur adipisicing elit. 
          Debitis earum velit accusantium maiores qui sit quas, laborum voluptatibus vero 
          quidem tempore facilis voluptate tempora deserunt!
        </Text>
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus illum 
          tempora consequuntur. Lorem ipsum dolor sit amet consectetur adipisicing elit. 
          Debitis earum velit accusantium maiores qui sit quas, laborum voluptatibus vero 
          quidem tempore facilis voluptate tempora deserunt!
        </Text>
      </View>

      <RelatedVideos />
      <PlayersList />
    </ScrollView>
  );
}

// 🔹 Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818',
  },
  video: {
    width: '100%',
    height: 250,
  },
  videoDetail: {
    padding: 16,
  },
  videoInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
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
  buyButton:{
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
  },
  backText: {
    color: '#fff',
    marginLeft: 5,
    fontSize: 16,
  },
});
