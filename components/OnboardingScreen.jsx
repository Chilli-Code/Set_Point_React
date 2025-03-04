import { StyleSheet, useWindowDimensions, View, ScrollView, Image, Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
} from "react-native-reanimated";

export default function OnboardingScreen({ navigation }) { // Agrega `navigation` como prop
  const { width } = useWindowDimensions();
  const [active, setActive] = useState(0);
  const slideValue = useSharedValue(0); // Valor compartido para el desplazamiento

  const data = [
    {
      id: '1',
      title: 'Bienvenido',
      description: 'Gracias por registrarte en nuestra aplicación.',
      icon: 'volleyball-ball',
      url: 'https://i.ibb.co/m4JZ7YD/picture-Four.png', // URL corregida
    },
    {
      id: '2',
      title: 'Encuentra Partidos',
      description: 'Únete a partidos cerca de ti y mejora tus habilidades.',
      icon: 'map-marker-alt',
      url: 'https://i.ibb.co/m4JZ7YD/picture-Four.png', // URL corregida
    },
    {
      id: '3',
      title: 'Disfruta del Juego',
      description: '¡Diviértete jugando al voleibol!',
      icon: 'trophy',
      url: 'https://i.ibb.co/m4JZ7YD/picture-Four.png', // URL corregida
    },
  ];

  // Actualiza el índice activo cuando termina el desplazamiento
  const onScrollEnd = ({ nativeEvent }) => {
    const slideIndex = Math.round(nativeEvent.contentOffset.x / width);
    setActive(slideIndex);
  };

  // Animación del título (headerStyle)
  const headerStyle = (index) => {
    return useAnimatedStyle(() => {
      const translateX = interpolate(
        slideValue.value,
        [(index - 1) * width, index * width, (index + 1) * width],
        [width + 500, 0, -(width + 500)],
        Extrapolation.CLAMP
      );
      return {
        transform: [{ translateX }],
      };
    });
  };

  // Animación de la imagen (imageStyle)
  const imageStyle = (index) => {
    return useAnimatedStyle(() => {
      const translateX = interpolate(
        slideValue.value,
        [(index - 1) * width, index * width, (index + 1) * width],
        [width, 0, -width],
        Extrapolation.CLAMP
      );
      return {
        transform: [{ translateX }],
      };
    });
  };

  // Animación del pie de página (FooterStyle)
  const FooterStyle = (index) => {
    return useAnimatedStyle(() => {
      const translateX = interpolate(
        slideValue.value,
        [(index - 1) * width, index * width, (index + 1) * width],
        [width + 1000, 0, -(width + 1000)],
        Extrapolation.CLAMP
      );
      return {
        transform: [{ translateX }],
      };
    });
  };

  return (
    <View style={styles.container}>
      {/* ScrollView para mostrar las pantallas */}
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onScroll={(event) => {
          slideValue.value = event.nativeEvent.contentOffset.x; // Actualiza slideValue
        }}
        onMomentumScrollEnd={onScrollEnd}
        scrollEventThrottle={16} // Necesario para capturar eventos de desplazamiento
      >
        {data.map((x, i) => (
          <View
            key={x.id}
            style={{ height: 'auto', width, justifyContent: 'center', alignItems: 'center' }}
          >
            <View style={{ flex: 1 }} />

            {/* Imagen animada */}
            <Animated.Image
              source={{ uri: x.url }}
              style={[
                { height: 325, width: 250 },
                imageStyle(i), // Aplica la animación a la imagen
              ]}
              resizeMode="contain"
            />

            {/* Título animado */}
            <Animated.View
              style={[
                { height: 'auto', width, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 25 },
                headerStyle(i), // Aplica la animación al título
              ]}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: '#6c63ff',
                  marginBottom: 10,
                }}
              >
                {x.title}
              </Text>
            </Animated.View>

            {/* Descripción animada */}
            <Animated.View
              style={[
                { height: 'auto', width, justifyContent: 'center', alignItems: 'center' },
                FooterStyle(i), // Aplica la animación al pie de página
              ]}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: '#888',
                  fontWeight: '500',
                }}
              >
                {x.description}
              </Text>
            </Animated.View>

            <View style={{ flex: 1 }} />
          </View>
        ))}
      </ScrollView>

      {/* Indicadores de página */}
      <View style={{ height: 50, width, flexDirection: 'row', position: 'absolute', bottom: 50 }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
          {data.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                active === index && styles.activeIndicator,
              ]}
            />
          ))}
        </View>

        {/* Botón Finalizar */}
        <TouchableOpacity
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          onPress={() => {
            if (active === data.length - 1) {
              navigation.navigate('Home'); // Navega a Home solo si está en el último slide
            }
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: active === data.length - 1 ? '#6c63ff' : '#888', // Cambia el color según el estado
            }}
          >
            Finalizar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: '#6c63ff',
  },
});