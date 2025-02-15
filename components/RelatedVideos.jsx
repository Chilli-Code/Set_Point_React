import React, { useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// 🔹 Simulación de videos relacionados
const relatedVideos = [
  {
    id: '1',
    title: 'Prepare for your first skateboard jump',
    author: 'Jordan Wise',
    views: '125.9K',
    timeAgo: '2 days ago',
    thumbnail: 'https://cdn.nohat.cc/thumb/f/720/3b55eddcfffa4e87897d.jpg',
  },
  {
    id: '2',
    title: 'Mastering advanced tricks',
    author: 'Alex Turner',
    views: '98K',
    timeAgo: '1 week ago',
    thumbnail: 'https://cdn.nohat.cc/thumb/f/720/3b55eddcfffa4e87897d.jpg',
  },
  {
    id: '3',
    title: 'Landing safely from jumps',
    author: 'Emily Carter',
    views: '76.4K',
    timeAgo: '3 days ago',
    thumbnail: 'https://cdn.nohat.cc/thumb/f/720/3b55eddcfffa4e87897d.jpg',
  },
];

export default function RelatedVideos() {
  const navigation = useNavigation();
  const [expanded, setExpanded] = useState(true);
  const [animation] = useState(new Animated.Value(1));

  // 🔹 Maneja la animación del acordeón
  const toggleExpand = () => {
    Animated.timing(animation, {
      toValue: expanded ? 0 : 1, // Si está expandido, lo colapsa y viceversa
      duration: 300,
      useNativeDriver: false,
    }).start();
    setExpanded(!expanded);
  };

  return (
    <View style={styles.container}>
      {/* 🔹 Sección de "Related Videos" que se puede tocar */}
      <TouchableOpacity onPress={toggleExpand} style={styles.header}>
        <Text style={styles.title}>Videos Relacionados</Text>
        <Text style={styles.arrow}>{expanded ? '▼' : '▲'}</Text>
      </TouchableOpacity>

      {/* 🔹 Contenedor con animación de expansión */}
      <Animated.View style={{ height: animation.interpolate({ 
        inputRange: [0, 1], outputRange: [0, relatedVideos.length * 90] }) }}>
        <FlatList
          data={relatedVideos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.videoWrapper}
              onPress={() => navigation.navigate('InfoVideo', { video: item })}
            >
              <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
              <View style={styles.videoContent}>
                <Text style={styles.videoTitle} numberOfLines={2}>{item.title}</Text>
                <Text style={styles.videoAuthor}>{item.author}</Text>
                <Text style={styles.videoInfo}>{item.views} views • {item.timeAgo}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      {/* 🔹 Botón "See All Related Videos" */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Ver Mas Videos Relacionados</Text>
      </TouchableOpacity>
      </Animated.View>

    </View>
  );
}

// 🔹 **Estilos optimizados**
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#252936',
    borderRadius: 10,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  arrow: {
    color: '#fff',
    fontSize: 18,
  },
  videoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#252936',
    borderRadius: 10,
    padding: 8,
  },
  thumbnail: {
    width: 100,
    height: 80,
    borderRadius: 10,
    marginRight: 16,
  },
  videoContent: {
    flex: 1,
  },
  videoTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  videoAuthor: {
    color: '#aaa',
    fontSize: 13,
    marginBottom: 2,
  },
  videoInfo: {
    color: '#888',
    fontSize: 12,
  },
  button: {
    backgroundColor: '#6C5ECF',
    borderRadius: 10,
    padding: 12,
    marginTop: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
