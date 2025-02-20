import React from "react";
import { View, Text, StyleSheet, Switch, ScrollView, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { useTheme } from "../context/ThemeContext"; // 🔹 Importar el contexto del tema

export default function SettingsScreen() {
  const { darkMode, toggleTheme, theme } = useTheme(); // Obtener estado del tema global
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Configuración</Text>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* 🔹 Modo Oscuro */}
        <View style={[styles.settingRow, { backgroundColor: theme.RelatedColor }]}>
          <Icon name="moon" size={22} color={theme.primary} />
          <Text style={[styles.settingText, { color: theme.text }]}>Modo oscuro</Text>
          <Switch value={darkMode} onValueChange={toggleTheme} />
        </View>

        {/* 🔹 Notificaciones */}
        <View style={[styles.settingRow, { backgroundColor: theme.RelatedColor }]}>
          <Icon name="bell" size={22} color={theme.primary} />
          <Text style={[styles.settingText, { color: theme.text }]}>Notificaciones</Text>
          <Switch value={true} onValueChange={() => {}} />
        </View>

        {/* 🔹 Sonidos */}
        <View style={[styles.settingRow, { backgroundColor: theme.RelatedColor }]}>
          <Icon name="volume-2" size={22} color={theme.primary} />
          <Text style={[styles.settingText, { color: theme.text }]}>Sonidos</Text>
          <Switch value={true} onValueChange={() => {}} />
        </View>

        {/* 🔹 Privacidad y Seguridad */}
        <TouchableOpacity style={[styles.settingRow, { backgroundColor: theme.RelatedColor }]}>
          <Icon name="lock" size={22} color={theme.primary} />
          <Text style={[styles.settingText, { color: theme.text }]}>Privacidad y seguridad</Text>
          <Icon name="chevron-right" size={22} color={theme.text} />
        </TouchableOpacity>



        {/* 🔹 Redes Sociales */}
        <TouchableOpacity  style={[styles.settingRow, { backgroundColor: theme.RelatedColor }]}  onPress={() => console.log("Ir a Redes Sociales")}>
          <Icon name="share-2" size={22} color="#34bfff" />
          <Text style={[styles.settingText, { color: theme.text }]}>Redes sociales</Text>
          <Icon name="chevron-right" size={22} color={theme.text} />
        </TouchableOpacity>

        {/* 🔹 Centro de Ayuda */}
        <TouchableOpacity style={[styles.settingRow, { backgroundColor: theme.RelatedColor }]} onPress={() => console.log("Ir al Centro de Ayuda")}>
          <Icon name="help-circle" size={22} color="#34bfff" />
          <Text style={[styles.settingText, { color: theme.text }]}>Centro de ayuda</Text>
          <Icon name="chevron-right" size={22} color={theme.text} />
        </TouchableOpacity>

        {/* 🔹 Términos y Condiciones */}
        <TouchableOpacity style={[styles.settingRow, { backgroundColor: theme.RelatedColor }]} onPress={() => console.log("Ir a Términos y Condiciones")}>
          <Icon name="file-text" size={22} color="#34bfff" />
          <Text style={[styles.settingText, { color: theme.text }]}>Términos y condiciones</Text>
          <Icon name="chevron-right" size={22} color={theme.text} />
        </TouchableOpacity>

      </ScrollView>
        {/* 🔹 Número de Versión */}
        <View style={styles.versionContainer}>
          <Text style={[styles.versionText, { color: theme.text }]}>© Copyright 2025</Text>
          <Text style={{color:"#6c5ecf", paddingLeft:8, fontWeight:'bold'}}>Keku Enterprise</Text>
          <Text style={[styles.versionText, { color: theme.text, paddingLeft:8}]}>Versión 1.0.0</Text>

        </View>
    </View>
  );
}

// 📌 **Estilos**
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  scrollContainer: {
    paddingBottom: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 8,
    marginBottom: 12,
  },
  settingText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 15,
  },
  versionContainer: {
    marginBottom: 20,
    display: "flex",
    flexDirection: "row", // 🔹 Poner los elementos en fila
    width: "100%",
    justifyContent: "center", // 🔹 Centrar los elementos horizontalmente
    alignItems: "center", // 🔹 Alinear en el centro verticalmente
    flexWrap: "wrap", // 🔹 Evita que el texto se salga de la pantalla
  },
  
  versionText: {
    fontSize: 14,
  },
});
