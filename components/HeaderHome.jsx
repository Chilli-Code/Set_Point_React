import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Modal, Platform } from "react-native";
import { Appbar } from "react-native-paper"; // 🔹 AppBar nativo
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../context/ThemeContext";

export default function Header() {
  const { theme } = useTheme(); // ⬅ Obtener tema
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      {/* 🔹 AppBar */}
      <Appbar.Header style={styles.header}>
        {/* 🔹 Título centrado */}
        <Text style={[styles.titleHeader, { color: theme.textTittle }]}>Set Points</Text>

        {/* 🔹 Contenedor del usuario */}
        <View style={styles.userContainer}>
          <Text style={[styles.userName, { color: theme.textTittle }]}>User0</Text>
          <View style={{flexDirection:"column",alignItems:"center",marginRight:5,padding:1}}>
          <FontAwesome5 name="coins" size={15} color="#6c5ecf" />
          <Text style={{color:"#6c5ecf", paddingTop:4, fontWeight:"bold"}}>22</Text>
          </View>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Image
              source={{
                uri: "https://i.geekflare.com/cdn-cgi/image/width=1200,height=630,fit=crop,quality=90,format=auto,onerror=redirect,metadata=none/wp-content/uploads/sites/24/2023/06/AI-avatar.jpg",
              }}
              style={styles.avatar}
            />
          </TouchableOpacity>
        </View>
      </Appbar.Header>

      {/* 🔹 Modal para el menú */}
      <Modal transparent={true} animationType="slide" visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <TouchableOpacity style={styles.modalContainer} activeOpacity={1} onPress={() => setModalVisible(false)}>
          <View style={[styles.modalContent]}>
            <TouchableOpacity
              style={styles.option}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate("Settings");
              }}
            >
              <Icon name="cogs" size={24} color="#6c5ecf" style={{ marginRight: 10 }} />
              <Text style={[styles.optionText, {color: theme.text}]}>Configuración</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.option} onPress={() => navigation.replace("Login")}>
              <Icon name="logout" size={24} color="#6c5ecf" style={{ marginRight: 10 }} />
              <Text style={[styles.optionText, {color: theme.text}]}>Cerrar sesión</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "transparent",
    elevation: 0,
    padding:10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    width: "100%",
    height:50,
  },
  titleHeader: {
    fontWeight: "bold",
    fontSize: 22,
    position: "relative",
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  userName: {
    fontSize: 16,
    fontWeight: "600",
    marginRight: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#2A2D3E",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  optionText: {
    fontSize: 16,
    paddingVertical: 5,
    fontWeight: "600",
    // marginLeft: 20,
  },
});
