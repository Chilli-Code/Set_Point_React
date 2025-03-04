import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useTheme } from "../context/ThemeContext";
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
import Icon from "react-native-vector-icons/Feather";
import { Dimensions } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

export default function UserProfileScreen({ route }) {
  const { user } = route.params;

  //   return (
  //     <View style={styles.container}>
  //       <Image source={{ uri: user.avatar }} style={styles.avatar} />
  //       <Text style={styles.name}>{user.name}</Text>
  //       <Text>@{user.username}</Text>
  //     </View>
  //   );
  // }
  const navigation = useNavigation();

  const { theme, darkMode, toggleTheme } = useTheme(); // ⬅ Ahora usamos el tema
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* 🔹 Título estilizado */}
      <View style={[styles.titleContainer, { width: screenWidth * 0.9 }]}>
        {/* 🔹 Botón para regresar */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-left" size={25} color={theme.text} />
        </TouchableOpacity>
        <Text style={styles.title}>{user.name}</Text>
        <TouchableOpacity
          style={styles.editIcon}
          onPress={() => console.log("Editar perfil")}
        >
          <Icon name="edit" size={24} color="#34bfff" />
        </TouchableOpacity>
      </View>

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

        {/* 🔹 Marco del perfil */}
        <Polyline
          points="65,170 145,170 145,50 135,40 135,10 125,0 70,0 10,0 0,10 0,160 10,170"
          fill="transparent"
          stroke="#6C5ECF"
          strokeWidth="2"
        />
        <Polyline
          points="145,85 250,85 260,95 490,95 500,105 500,135 500,150 490,160 200,160 190,170 145,170"
          fill="transparent"
          stroke="#6C5ECF"
          strokeWidth="2"
        />

        {/* 🔹 Foto de perfil */}
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

        {/* 🔹 Datos del perfil */}
        <G transform="translate(170 118)" fill="#34bfff" fontWeight="bold">
          <SvgText x="-9" y="0" fontSize="17">
            Nombre :
          </SvgText>
          <SvgText x="-19" y="25" fontSize="20">
            @{user.username}
          </SvgText>
          <SvgText x="120" y="0" fontSize="17">
            Edad :
          </SvgText>
          <SvgText x="120" y="25" fontSize="20">
            21
          </SvgText>
          <SvgText x="220" y="0" fontSize="17">
            Rol:
          </SvgText>
          <SvgText x="220" y="20" fontSize="20">
            Jugador
          </SvgText>
        </G>

        {/* 🔹 Sección de estadísticas del jugador */}
        <G transform="translate(0, 200)">
          <Polyline
            points="250,35 200,35 200,10 190,0 10,0 0,10 0,280 10,290 197,290 215,310 215,330 250,330 450,330 460,320 490,320 500,310 500,45 490,35 310,35 300,25"
            fill={theme.background}
            stroke="#6C5ECF"
            strokeWidth="3"
          />
          <SvgText x="20" y="30" fontSize="25" fontWeight="bold" fill="#34bfff">
            Datos Jugador
          </SvgText>

          {/* 🔹 Lista de estadísticas con barras de progreso */}
          <G transform="translate(15, 50)">
            {[
              { name: "Altura (m)", value: "1.95m", width: 195 },
              { name: "Alcance de Ataque", value: "3.20m", width: 220 },
              { name: "Alcance de Bloqueo", value: "3.05m", width: 210 },
              { name: "Fuerza de Saque", value: "90%", width: 180 },
              { name: "Velocidad de Reacción", value: "85%", width: 170 },
            ].map((stat, index) => (
              <G key={index} transform={`translate(0, ${index * 50})`}>
                {/* 🔹 Nombre de la estadística */}
                <SvgText x="0" y="30" fontSize="19" fill="#34bfff">
                  {stat.name}
                </SvgText>

                {/* 🔹 Barra de fondo */}
                <Rect
                  x="210"
                  y="20"
                  width="200"
                  height="12"
                  fill={theme.background}
                  rx="5"
                />

                {/* 🔹 Barra de progreso */}
                <Rect
                  x="210"
                  y="20"
                  width={stat.width}
                  height="12"
                  fill="#34bfffeb"
                  rx="5"
                />

                {/* 🔹 Valor numérico a la derecha */}
                <SvgText
                  x={220 + stat.width}
                  y="35"
                  fontSize="16"
                  fill="#34bfff"
                >
                  {stat.value}
                </SvgText>
              </G>
            ))}
          </G>
        </G>
      </Svg>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#34bfff",
    textTransform: "uppercase",
    flex: 1, // Permite que el texto ocupe el espacio disponible
    textAlign: "center", // Centrar el texto
  },
  titleContainer: {
    flexDirection: "row", // Alinear en fila
    alignItems: "center", // Centrar verticalmente
    justifyContent: "space-between", // Distribuir elementos en la fila
    width: "100%", // Ajustar ancho del contenedor
    marginTop: 30,
    marginBottom: 40,
  },
  editIcon: {
    marginLeft: 10,
  },
});
