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
        <ImageBackground source={require('../assets/Slider1.webp')} style={styles.card}>
          <Text style={styles.title}>Cómo hacer saltos básicos y aterrizar de forma segura</Text>
          <View style={styles.footer}>
            <Image
              source={{ uri: 'https://via.placeholder.com/150' }}
              style={styles.avatar}
            />
            <Text style={styles.views}>53K vistas</Text>
          </View>
        </ImageBackground>

        {/* 🔹 Tarjeta 2 */}
        <ImageBackground  source={require('../assets/Slider2.jpg')} style={[styles.card, { backgroundColor: '#FF8C00' }]}>
          <Text style={styles.title}>Consejos de skate que debes saber</Text>
          <View style={styles.footer}>
            <Image
              source={{ uri: 'https://via.placeholder.com/150' }}
              style={styles.avatar}
            />
            <Text style={styles.views}>32K vistas</Text>
          </View>
        </ImageBackground>

        {/* 🔹 Tarjeta 3 */}
        <View style={[styles.card, { backgroundColor: '#28A745' }]}>
          <Text style={styles.title}>Técnicas avanzadas para patinadores expertos</Text>
          <View style={styles.footer}>
            <Image
              source={{ uri: 'https://via.placeholder.com/150' }}
              style={styles.avatar}
            />
            <Text style={styles.views}>75K vistas</Text>
          </View>
        </View>
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
    padding: 16,
    justifyContent: 'space-between',
    resizeMode: 'cover',
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  views: {
    color: 'white',
    fontSize: 12,
  },
  dot: {
    backgroundColor: 'rgba(255,255,255,0.5)',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
  },
  activeDot: {
    backgroundColor: 'white',
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 3,
  },
});
