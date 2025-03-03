import React from 'react';
import { View, Text, Image, StyleSheet, ImageBackground } from 'react-native';
import Swiper from 'react-native-swiper';

export default function SwiperHome() {
  return (
    <View style={styles.containerSwiper}>
      <Swiper
        autoplay
        autoplayTimeout={3}
        showsPagination={true}
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}
      >
        {/* 🔹 Tarjeta 1 */}
        <ImageBackground source={require('../assets/SliderHome/Slider1.webp')} style={styles.card}>
        {/* Capa de opacidad */}
          <View style={styles.overlay} />
          <Text style={styles.title}>Domina los fundamentos del voleibol</Text>
          <View style={styles.footer}>
          <Text style={styles.subtitle}>Aprende técnicas básicas como el saque, bloqueo y remate.</Text>
          </View>
        </ImageBackground>

        {/* 🔹 Tarjeta 2 */}
        <ImageBackground  source={require('../assets/SliderHome/Slider2.png')} style={[styles.card, { backgroundColor: '#FF8C00' }]}>
          <View style={styles.overlay} />
          <Text style={styles.title}>Lleva tu juego al siguiente nivel</Text>
          <View style={styles.footer}>
          <Text style={styles.subtitle}>Descubre estrategias avanzadas y ejercicios para mejorar tu rendimiento en la cancha.</Text>
          </View>
        </ImageBackground>

        {/* 🔹 Tarjeta 3 */}
        <ImageBackground source={require('../assets/SliderHome/Slider3.png')} style={[styles.card, { backgroundColor: '#28A745' }]}>
          <View style={styles.overlay} />
          <Text style={styles.title}>Únete a nuestros torneos locales</Text>
          <View style={styles.footer}>
          <Text style={styles.subtitle}>Participa en competencias emocionantes y demuestra tu talento frente a otros jugadores.</Text>
          </View>
        </ImageBackground>
      </Swiper>
    </View>
  );
}

const styles = StyleSheet.create({
    containerSwiper: {
    height: 200,
    paddingTop:10, // 🔹 Altura del swiper
  },
  card: {
    flex: 1,
    backgroundColor:'#31abbd',
    borderRadius: 20,
    marginHorizontal: 20,
    position:'relative',
    height:198,
    padding: 16,
    justifyContent: 'space-between',
    resizeMode: 'cover',
    overflow: 'hidden'

  },
  title: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
    zIndex: 1,
  },
    subtitle: {
    color: 'white',
    fontSize: 12,
    marginTop: 4,
    zIndex: 1,
    fontWeight:'600'
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  views: {
    color: 'white',
    fontSize: 12,
  },
  dot: {
    backgroundColor: 'rgba(255,255,255,0.5)',
    width: 8,
    height: 8,
    bottom:-25,
    borderRadius: 4,
    marginHorizontal: 3,
  },
  activeDot: {
    backgroundColor: '#6C5ECF',
    width: 10,
    height: 10,
    bottom:-25,
    borderRadius: 5,
    marginHorizontal: 3,
  },
    overlay: {
    ...StyleSheet.absoluteFillObject, // Cubre todo el contenedor
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Fondo negro con 50% de opacidad
  },
});
