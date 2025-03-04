import React, { useState } from "react";
import { View, Text, StyleSheet, Switch, ScrollView, TouchableOpacity, Alert } from "react-native";
import Icon from "react-native-vector-icons/Feather"; // Feather
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'; // FontAwesome5
import { useTheme } from "../context/ThemeContext"; // 🔹 Importar el contexto del tema
import * as Notifications from 'expo-notifications';
import { Linking } from 'react-native';
import Modal from "react-native-modal";
import LottieView from 'lottie-react-native';


// Lista de redes sociales con sus URLs e íconos
const socialMediaLinks = [
  {
    name: 'Facebook',
    icon: 'facebook',
    iconType: 'FontAwesome5', // Usar FontAwesome5 para Facebook
    url: 'https://www.facebook.com/profile.php?id=100077299601268', // Reemplaza con tu URL de Facebook
  },
  {
    name: 'Instagram',
    icon: 'instagram',
    iconType: 'FontAwesome5', // Usar FontAwesome5 para Instagram
    url: 'https://www.instagram.com/tucuenta', // Reemplaza con tu URL de Instagram
  },
  {
    name: 'TikTok',
    icon: 'tiktok', // Nombre del ícono en FontAwesome5
    iconType: 'FontAwesome5', // Usar FontAwesome5 para TikTok
    url: 'https://www.tiktok.com/@tucuenta', // Reemplaza con tu URL de TikTok
  },
];

export default function SettingsScreen() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { darkMode, toggleTheme, theme } = useTheme(); // Obtener estado del tema global

  // Estado para controlar si las notificaciones están activadas
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // Estado para controlar si el acordeón de redes sociales está expandido
  const [isSocialExpanded, setIsSocialExpanded] = useState(false);

  // Función para manejar el cambio del Switch de notificaciones
  const handleNotificationToggle = async (value) => {
    if (value) {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status === 'granted') {
        setNotificationsEnabled(true);
        Alert.alert("Notificaciones habilitadas", "Ahora recibirás notificaciones.");
      } else {
        Alert.alert("Permiso denegado", "No se pueden habilitar las notificaciones.");
        setNotificationsEnabled(false);
      }
    } else {
      setNotificationsEnabled(false);
      Alert.alert("Notificaciones deshabilitadas", "Ya no recibirás notificaciones.");
    }
  };

  // Función para abrir un enlace
  const handleOpenLink = (url) => {
    Linking.openURL(url).catch((err) =>
      Alert.alert('Error', 'No se pudo abrir el enlace.')
    );
  };

// MODAL DE SUPPORT
    // Estado para controlar si el modal está visible

  // Función para abrir WhatsApp
  const handleWhatsAppContact = () => {
    const phoneNumber = "+3168351512"; // Reemplaza con tu número de WhatsApp
    const message = "Hola, necesito ayuda con la aplicación.";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    Linking.openURL(url).catch((err) =>
      alert("No se pudo abrir WhatsApp.")
    );
  };


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
          <Switch
            value={notificationsEnabled}
            onValueChange={handleNotificationToggle}
          />
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

        {/* 🔹 Redes Sociales (Acordeón) */}
        <TouchableOpacity
          style={[styles.settingRow, { backgroundColor: theme.RelatedColor }]}
          onPress={() => setIsSocialExpanded(!isSocialExpanded)} // Alternar el estado del acordeón
        >
          <Icon name="share-2" size={22} color="#34bfff" />
          <Text style={[styles.settingText, { color: theme.text }]}>Redes sociales</Text>
          <Icon name={isSocialExpanded ? "chevron-up" : "chevron-down"} size={22} color={theme.text} />
        </TouchableOpacity>

        {/* Contenido del acordeón */}
        {isSocialExpanded && (
          <View style={styles.socialAccordionContent}>
            {socialMediaLinks.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.socialRow, { backgroundColor: theme.RelatedColor }]}
                onPress={() => handleOpenLink(item.url)}
              >
                {item.iconType === 'FontAwesome5' && (
                  <FontAwesome5 name={item.icon} size={24} color="#34bfff" />
                )}
                {item.iconType === 'Feather' && (
                  <Icon name={item.icon} size={24} color="#34bfff" />
                )}
                <Text style={[styles.socialText, { color: theme.text }]}>{item.name}</Text>
                <Icon name="chevron-right" size={22} color="#ccc" />
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* 🔹 Centro de Ayuda */}
      <TouchableOpacity
        style={[styles.settingRow, { backgroundColor: theme.RelatedColor }]}
        onPress={() => setIsModalVisible(true)} // Abrir el modal
      >
        <Icon name="help-circle" size={22} color="#34bfff" />
        <Text style={[styles.settingText, { color: theme.text}]}>Centro de ayuda</Text>
        <Icon name="chevron-right" size={22} color="#ccc" />
      </TouchableOpacity>

      {/* 🔹 Modal */}
      <Modal isVisible={isModalVisible} onBackdropPress={() => setIsModalVisible(false)}>
        <View style={[styles.modalContainer, {backgroundColor: theme.background}]}>
          {/* Animación Lottie */}
          <LottieView
            source={require("../assets/welcome-animation.json")} // Reemplaza con tu archivo Lottie
            autoPlay
            loop
            style={styles.lottieAnimation}
          />

          {/* Título del modal */}
          <Text style={styles.modalTitle}>¿Cómo podemos ayudarte?</Text>

          {/* Botón de contacto */}
          <TouchableOpacity style={styles.whatsappButton} onPress={handleWhatsAppContact}>
            <FontAwesome5 name="whatsapp" size={22} color="#fff" />
            <Text style={styles.whatsappButtonText}>Contactar por WhatsApp</Text>
          </TouchableOpacity>
        </View>
      </Modal>

        {/* 🔹 Términos y Condiciones */}
        <TouchableOpacity
          style={[styles.settingRow, { backgroundColor: theme.RelatedColor }]}
          onPress={() => console.log("Ir a Términos y Condiciones")}
        >
          <Icon name="file-text" size={22} color="#34bfff" />
          <Text style={[styles.settingText, { color: theme.text }]}>Términos y condiciones</Text>
          <Icon name="chevron-right" size={22} color={theme.text} />
        </TouchableOpacity>
      </ScrollView>

      {/* 🔹 Número de Versión */}
      <View style={styles.versionContainer}>
        <Text style={[styles.versionText, { color: theme.text }]}>© Copyright 2025</Text>
        <Text style={{ color: "#6c5ecf", paddingLeft: 8, fontWeight: "bold" }}>Keku Enterprise</Text>
        <Text style={[styles.versionText, { color: theme.text, paddingLeft: 8 }]}>Versión 1.0.0</Text>
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
  socialAccordionContent: {
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  socialRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 8,
    marginBottom: 8,
  },
  socialText: {
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
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  lottieAnimation: {
    width: 200,
    height: 200,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 15,
    textAlign: "center",
    color: "#333",
  },
  whatsappButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#25D366", // Color de WhatsApp
    padding: 12,
    borderRadius: 8,
  },
  whatsappButtonText: {
    color: "#fff",
    marginLeft: 10,
    fontWeight: "bold",
  },
});