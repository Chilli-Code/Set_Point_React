import React, { useRef } from 'react';
import { View, Text, Image, FlatList, StyleSheet, Animated, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

// 🔹 Lista de jugadores con imágenes de alta calidad
const players = [
  {
    id: '1',
    name: 'Alice',
    image: 'https://images.pexels.com/photos/2889942/pexels-photo-2889942.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  },
  {
    id: '2',
    name: 'Bob',
    image: 'https://images.unsplash.com/photo-1587918842454-870dbd18261a?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=943&q=80',
  },
  {
    id: '3',
    name: 'Charlie',
    image: 'https://images.pexels.com/photos/3370021/pexels-photo-3370021.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  },
];

export default function PlayersSwiper() {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Players</Text>
      <Animated.FlatList
        data={players}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToAlignment="center"
        contentContainerStyle={styles.contentContainer}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        renderItem={({ item, index }) => {
          const scale = scrollX.interpolate({
            inputRange: [
              (index - 1) * width * 0.7,
              index * width * 0.7,
              (index + 1) * width * 0.7,
            ],
            outputRange: [0.85, 1, 0.85],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View style={[styles.card, { transform: [{ scale }] }]}>
              <View style={styles.cardInner}>
                {/* 📌 Imagen del jugador */}
                <Image source={{ uri: item.image }} style={styles.cardImage} />
                
                {/* 📌 Fondo con efecto de rayas para "PLAYER" */}
                <View style={styles.stripedOverlay}>
                  <Text style={styles.cardRole}>PLAYER</Text>
                </View>

                {/* 📌 Nombre con fondo hexagonal */}
                <View style={styles.cardOverlay}>
                  <Text style={styles.name}>{item.name.toUpperCase()}</Text>
                </View>
              </View>
            </Animated.View>
          );
        }}
      />
    </View>
  );
}

// 🔹 **Estilos con gradientes y efectos exactos**
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  contentContainer: {
    alignItems: 'center',
  },
  card: {
    width: width * 0.7,
    height: 450,
    backgroundColor: 'transparent',
    borderRadius: 20,
    padding: 10,
    marginHorizontal: 10,
    shadowColor: '#6A0DAD',
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 10,
  },
  cardInner: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    backgroundColor: '#1f1d2b',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 10,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 3,
    borderColor: 'rgba(138, 43, 226, 0.8)',
  },
  cardImage: {
    width: '100%',
    height: '70%',
    borderRadius: 8,
    position: 'absolute',
    top: 0,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  stripedOverlay: {
    position: 'absolute',
    bottom: 80,
    width: '90%',
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardRole: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textTransform: 'uppercase',
  },
  cardOverlay: {
    position: 'absolute',
    bottom: 0,
    width: '90%',
    height: 60,
    borderRadius: 8,
    backgroundColor: 'rgba(138, 43, 226, 0.8)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: 'rgba(106, 13, 173, 0.8)',
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textTransform: 'uppercase',
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowRadius: 5,
  },
});

