import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

import Icon from "react-native-vector-icons/Feather";

export default function ClipsPerfil() {
  return (
    <View style={styles.container}>
      {/* 🔹 Título estilizado */}
      <View style={styles.titleContainer}>
  <Text style={styles.title}>Clips Destacados</Text>
  <TouchableOpacity style={styles.editIcon} onPress={() => console.log("Editar perfil")}>
    <Icon name="edit" size={24} color="#ffffffcc" />
  </TouchableOpacity>
</View>
</View>

  );
}

// 📌 **Estilos generales**
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1f1d2b",
    alignItems:"center",
    flex: 1,
    marginTop: 150,
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
    width: "90%", // Ajustar ancho del contenedor
    marginTop: 30,
    marginBottom: 10,
  },
  editIcon: {
    marginLeft:10,
    
  },

});
