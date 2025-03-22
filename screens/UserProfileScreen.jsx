import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  Image,
  Dimensions,
  Animated,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import Material from "react-native-vector-icons/MaterialIcons";
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  Polyline,
  Rect,
  Text as SvgText,
  Image as SvgImage,
  Mask,
  G,
} from "react-native-svg";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/Feather";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import ClipsPerfil from "../components/ClipsPerfil";
import { useRoute, useNavigation } from "@react-navigation/native";

export default function UserProfileScreen({ route }) {
  const { user } = route.params;
  const [isFollowing, setIsFollowing] = useState(false);
  const [isImageFullScreen, setIsImageFullScreen] = useState(false); // Estado para el modal
  const scaleValue = useRef(new Animated.Value(0)).current; // Valor animado para la escala
  const opacityValue = useRef(new Animated.Value(0)).current; // Valor animado para la opacidad

  const handleFollow = () => {
    setIsFollowing(!isFollowing);

    Toast.show({
      type: "success",
      text1: isFollowing ? "Has dejado de seguir a" : "Siguiendo a",
      text2: user.name, // Nombre del usuario
      position: "top",
      visibilityTime: 2000, // 2 segundos
      text1Style: { fontSize: 15, fontWeight: "bold" },
      text2Style: {
        fontSize: 15,
        fontWeight: "bold",
        color: isFollowing ? "#FF3B30" : "#4CAF50",
      },
    });
  };

  const navigation = useNavigation();
  const { theme, darkMode, toggleTheme } = useTheme(); // Usamos el tema
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

  // Animación para abrir la imagen en pantalla completa
  const openImage = () => {
    setIsImageFullScreen(true);
    Animated.parallel([
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacityValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Animación para cerrar la imagen
  const closeImage = () => {
    Animated.parallel([
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacityValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => setIsImageFullScreen(false));
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Título estilizado */}
      {/* Contenedor principal del título */}

      <View style={styles.titleContainer}>
        {/* Botón para regresar */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-left" size={25} color={theme.text} />
        </TouchableOpacity>

        {/* Contenedor para el nombre y los seguidores */}
        <View style={styles.nameAndFollowersContainer}>
          <Text
            style={[styles.title, { color: theme.textSvg }]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {user.name}
          </Text>
          <Text style={styles.followersText}>
            {user.followers || "0"} seguidores
          </Text>
        </View>

        {/* Contenedor para los botones */}
        <View style={styles.buttonsContainer}>
          {/* Botón "Ver Foto" */}
          <TouchableOpacity style={styles.viewPhotoButton} onPress={openImage}>
            <Material name="remove-red-eye" size={22} color="#34bfff" />
          </TouchableOpacity>
          {/* Botón de seguir/dejar de seguir */}
          <TouchableOpacity style={styles.editIcon} onPress={handleFollow}>
            <SimpleLineIcons
              name={isFollowing ? "user-following" : "user-follow"}
              size={25}
              color={isFollowing ? "#4CAF50" : "#34bfff"}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Toast />
      <Svg
        viewBox="-2 -2 506 815"
        width={screenWidth * 0.9}
        height={screenHeight * 0.7}
      >
        <Defs>
          <LinearGradient id="profileGradient" gradientTransform="rotate(90)">
            <Stop offset="5%" stopColor="#60CAFF" />
            <Stop offset="100%" stopColor="rgba(0, 0, 0, 0)" />
          </LinearGradient>
          <LinearGradient id="skillGradient" gradientTransform="rotate(90)">
            <Stop offset="0%" stopColor="#34bfff" />
            <Stop offset="100%" stopColor="#0066ff" />
          </LinearGradient>
        </Defs>

        {/* Marco del perfil */}
        <Polyline
          points="65,170 145,170 145,50 135,40 135,10 125,0 70,0 10,0 0,10 0,160 10,170"
          fill="transparent"
          stroke={theme.lineaSvg}
          strokeWidth="2"
        />
        <Polyline
          points="145,85 250,85 260,95 490,95 500,105 500,135 500,150 490,160 200,160 190,170 145,170"
          fill="transparent"
          stroke={theme.lineaSvg}
          strokeWidth="2"
        />

        {/* Foto de perfil */}
        <Mask id="profileMask">
          <Rect fill="black" x="0" y="0" width="145" height="170" />
          <Polyline
            fill="white"
            points="65,170 145,170 145,50 135,40 135,10 125,0 70,0 10,0 0,10 0,160 10,170"
          />
        </Mask>
        <SvgImage
          href={
            user?.avatar ||
            "https://avatars.githubusercontent.com/u/93390482?v=4"
          }
          width="150"
          height="170"
          x="-5"
          mask="url(#profileMask)"
        />

        {/* Datos del perfil */}

        <G
          transform="translate(170 118)"
          fill={theme.textSvg}
          fontWeight="bold"
        >
          <SvgText x="-9" y="0" fontSize="17">
            Nombre :
          </SvgText>
          <SvgText x="-19" y="25" fontSize="20">
            @{user.username}
          </SvgText>
          <SvgText x="137" y="0" fontSize="17">
            Edad :
          </SvgText>
          <SvgText x="137" y="25" fontSize="20">
            21
          </SvgText>
          <SvgText x="239" y="0" fontSize="17">
            Rol:
          </SvgText>
          <SvgText x="235" y="20" fontSize="20">
            Jugador
          </SvgText>
        </G>

        {/* Sección de estadísticas del jugador */}
        <G transform="translate(0, 200)">
          <Polyline
            points="250,35 200,35 200,10 190,0 10,0 0,10 0,280 10,290 197,290 215,310 215,330 250,330 450,330 460,320 490,320 500,310 500,45 490,35 310,35 300,25"
            fill={theme.background}
            stroke={theme.lineaSvg}
            strokeWidth="3"
          />
          <SvgText
            x="20"
            y="30"
            fontSize="25"
            fontWeight="bold"
            fill={theme.textSvg}
          >
            Datos Jugador
          </SvgText>
          {/* Lista de estadísticas con barras de progreso */}
          <G transform="translate(15, 50)">
            {[
              { name: "Altura (m)", value: "1.95m", width: 195 },
              { name: "Alcance de Ataque", value: "3.20m", width: 220 },
              { name: "Alcance de Bloqueo", value: "3.05m", width: 210 },
              { name: "Fuerza de Saque", value: "90%", width: 180 },
              { name: "Velocidad de Reacción", value: "85%", width: 170 },
            ].map((stat, index) => (
              <G key={index} transform={`translate(0, ${index * 50})`}>
                {/* Nombre de la estadística */}
                <SvgText x="0" y="30" fontSize="19" fill={theme.textSvg}>
                  {stat.name}
                </SvgText>
                {/* Barra de fondo */}
                <Rect
                  x="210"
                  y="20"
                  width="200"
                  height="12"
                  fill={theme.background}
                  rx="5"
                />
                {/* Barra de progreso */}
                <Rect
                  x="210"
                  y="20"
                  width={stat.width}
                  height="12"
                  fill="#34bfffeb"
                  rx="5"
                />
                {/* Valor numérico a la derecha */}
                <SvgText
                  x={220 + stat.width}
                  y="35"
                  fontSize="16"
                  fill={theme.textSvg}
                >
                  {stat.value}
                </SvgText>
              </G>
            ))}
          </G>
        </G>
      </Svg>

      {/* Modal para la imagen en pantalla completa */}
      <Modal
        visible={isImageFullScreen}
        transparent={true}
        onRequestClose={() => setIsImageFullScreen(false)}
      >
        <View style={styles.modalContainer}>
          <Animated.View
            style={[
              styles.animatedImageContainer,
              {
                transform: [
                  {
                    scale: scaleValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.8, 1], // Escala inicial y final
                    }),
                  },
                ],
                opacity: opacityValue,
              },
            ]}
          >
            <TouchableOpacity style={styles.closeButton} onPress={closeImage}>
              <Icon name="x" size={30} color="#fff" />
            </TouchableOpacity>
            <Image
              source={{
                uri:
                  user?.avatar ||
                  "https://avatars.githubusercontent.com/u/93390482?v=4",
              }}
              style={styles.fullScreenImage}
              resizeMode="contain"
            />
          </Animated.View>
        </View>
      </Modal>

      <ClipsPerfil />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f5f5f5",
  },

  titleContainer: {
    flexDirection: "row", // Alinear en fila
    alignItems: "center", // Centrar verticalmente
    justifyContent: "space-between", // Distribuir elementos en la fila
    width: "100%", // Ocupar todo el ancho de la pantalla
    paddingHorizontal: 10, // Espaciado horizontal
    marginTop: 30,
    minHeight: 60, // Altura mínima
    marginBottom: 30,
  },
  backButton: {
    marginLeft: 10, // Margen izquierdo para la flecha
  },
  nameAndFollowersContainer: {
    flex: 1, // Ocupa el espacio restante entre el botón de regreso y los botones
    alignItems: "center", // Centrar horizontalmente
    justifyContent: "center", // Centrar verticalmente
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center", // Centrar el texto
  },
  followersText: {
    fontSize: 14,
    color: "#bbb", // Color secundario
    marginTop: 4, // Espaciado entre el nombre y los seguidores
  },
  buttonsContainer: {
    flexDirection: "row", // Alinear los botones en fila
    alignItems: "center", // Centrar verticalmente
    gap: 10, // Espacio entre los botones
  },
  editIcon: {
    marginRight: 0, // Margen derecho para el botón de seguir
  },
  viewPhotoButton: {
    padding: 5,
    borderRadius: 5,
  },
  viewPhotoContainer: {
    position: "relative", // Posicionamiento absoluto
    zIndex: 1, // Asegura que el botón esté encima del SVG
  },

  modalContainer: {
    flex: 1,
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
  },
  animatedImageContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 1,
  },
  fullScreenImage: {
    width: "100%",
    height: "100%",
  },
  svgContainer: {
    alignItems: "center", // Centra el contenido horizontalmente
    marginTop: 20, // Espacio desde la parte superior
  },
});
