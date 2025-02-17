import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Switch, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Feather";

export default function SettingsScreen() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [sounds, setSounds] = useState(true);

  return (
    <View style={[styles.container, darkMode && styles.darkBackground]}>
      <Text style={styles.title}>Configuración</Text>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* 🔹 Modo Oscuro */}
        <View style={styles.settingRow}>
          <Icon name="moon" size={22} color="#34bfff" />
          <Text style={styles.settingText}>Modo oscuro</Text>
          <Switch value={darkMode} onValueChange={() => setDarkMode(!darkMode)} />
        </View>

        {/* 🔹 Notificaciones */}
        <View style={styles.settingRow}>
          <Icon name="bell" size={22} color="#34bfff" />
          <Text style={styles.settingText}>Notificaciones</Text>
          <Switch value={notifications} onValueChange={() => setNotifications(!notifications)} />
        </View>

        {/* 🔹 Sonidos */}
        <View style={styles.settingRow}>
          <Icon name="volume-2" size={22} color="#34bfff" />
          <Text style={styles.settingText}>Sonidos</Text>
          <Switch value={sounds} onValueChange={() => setSounds(!sounds)} />
        </View>

        {/* 🔹 Privacidad y Seguridad */}
        <TouchableOpacity style={styles.settingRow} onPress={() => console.log("Ir a Privacidad")}>
          <Icon name="lock" size={22} color="#34bfff" />
          <Text style={styles.settingText}>Privacidad y seguridad</Text>
          <Icon name="chevron-right" size={22} color="#717790" />
        </TouchableOpacity>

        {/* 🔹 Redes Sociales */}
        <TouchableOpacity style={styles.settingRow} onPress={() => console.log("Ir a Redes Sociales")}>
          <Icon name="share-2" size={22} color="#34bfff" />
          <Text style={styles.settingText}>Redes sociales</Text>
          <Icon name="chevron-right" size={22} color="#717790" />
        </TouchableOpacity>

        {/* 🔹 Centro de Ayuda */}
        <TouchableOpacity style={styles.settingRow} onPress={() => console.log("Ir al Centro de Ayuda")}>
          <Icon name="help-circle" size={22} color="#34bfff" />
          <Text style={styles.settingText}>Centro de ayuda</Text>
          <Icon name="chevron-right" size={22} color="#717790" />
        </TouchableOpacity>

        {/* 🔹 Términos y Condiciones */}
        <TouchableOpacity style={styles.settingRow} onPress={() => console.log("Ir a Términos y Condiciones")}>
          <Icon name="file-text" size={22} color="#34bfff" />
          <Text style={styles.settingText}>Términos y condiciones</Text>
          <Icon name="chevron-right" size={22} color="#717790" />
        </TouchableOpacity>

        {/* 🔹 Número de Versión */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Versión 1.0.0</Text>
        </View>
      </ScrollView>
    </View>
  );
}

// 📌 **Estilos**
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1f1d2b",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  darkBackground: {
    backgroundColor: "#121212",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#34bfff",
    marginBottom: 20,
    textAlign: "center",
  },
  scrollContainer: {
    paddingBottom: 30,
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#252936",
    padding: 15,
    borderRadius: 8,
    marginBottom: 12,
  },
  settingText: {
    flex: 1,
    fontSize: 16,
    color: "#fff",
    marginLeft: 15,
  },
  versionContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  versionText: {
    color: "#717790",
    fontSize: 14,
  },
});

