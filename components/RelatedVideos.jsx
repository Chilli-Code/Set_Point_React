import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, Animated, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';

const relatedVideos = [
  { id: '1', title: 'Prepare for your first skateboard jump', author: 'Jordan Wise', views: '125.9K', timeAgo: '2 days ago', thumbnail: 'https://cdn.nohat.cc/thumb/f/720/3b55eddcfffa4e87897d.jpg' },
  { id: '2', title: 'Mastering advanced tricks', author: 'Alex Turner', views: '98K', timeAgo: '1 week ago', thumbnail: 'https://cdn.nohat.cc/thumb/f/720/3b55eddcfffa4e87897d.jpg' },
  { id: '3', title: 'Landing safely from jumps', author: 'Emily Carter', views: '76.4K', timeAgo: '3 days ago', thumbnail: 'https://cdn.nohat.cc/thumb/f/720/3b55eddcfffa4e87897d.jpg' },
  { id: '4', title: 'New Skating Techniques', author: 'Mike Daniels', views: '54.2K', timeAgo: '5 days ago', thumbnail: 'https://cdn.nohat.cc/thumb/f/720/3b55eddcfffa4e87897d.jpg' },
];

export default function RelatedVideos() {
  const {darkMode, toggleTheme, theme} = useTheme(); // ⬅ Ahora usamos el tema

  const navigation = useNavigation();
  const scrollViewRef = useRef(null); // ✅ Agrega una referencia para ScrollView

  const [expanded, setExpanded] = useState(true);
  const [animation] = useState(new Animated.Value(1));

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1, // ✅ Siempre expandido
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, []);

  const toggleExpand = () => {
    Animated.timing(animation, {
      toValue: expanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setExpanded(!expanded);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleExpand} style={[styles.header, {backgroundColor: theme.RelatedColor}]}>
        <Text style={[styles.title, {color: theme.textBox}]}>Videos Relacionados</Text>
        <Text style={[styles.arrow, {color: theme.textBox}]}>{expanded ? '▼' : '▲'}</Text>
      </TouchableOpacity>

      <Animated.View
        style={[
          styles.animatedContainer,
          {
            maxHeight: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 250],
            }),
            opacity: animation,
          },
        ]}
      >
        {expanded && (
          <ScrollView 
            ref={scrollViewRef} // ✅ Asigna la referencia
            nestedScrollEnabled={true} 
            style={styles.scrollContainer}
          >
            <FlatList
              data={relatedVideos}
              keyExtractor={(item) => item.id}
              scrollEnabled={false} // ✅ Evita conflicto con ScrollView
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.videoWrapper, {backgroundColor: theme.cardVideo}]}
                  onPress={() => navigation.navigate('InfoVideo', { video: item })}
                >
                  <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
                  <View style={styles.videoContent}>
                    <Text style={[styles.videoTitle, {color: theme.text}]} numberOfLines={2}>{item.title}</Text>
                    <Text style={styles.videoAuthor}>{item.author}</Text>
                    <Text style={styles.videoInfo}>{item.views} views • {item.timeAgo}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </ScrollView>
        )}
      </Animated.View>

      {expanded && (
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Ver Más Videos</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

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
  animatedContainer: {
    overflow: 'hidden',
  },
  scrollContainer: {
    maxHeight: 300,
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
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
