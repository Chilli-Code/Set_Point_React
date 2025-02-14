import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Appbar } from 'react-native-paper'; // 🔹 AppBar nativo
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

export default function Header() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  // 🔹 Función para cerrar sesión
  const handleLogout = () => {
    setModalVisible(false);
    navigation.replace('Login'); // 🔹 Navega al Login y elimina la pila
  };

  return (
    <>
      {/* 🔹 AppBar */}
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="Set Points" titleStyle={styles.title} />

        {/* 🔹 Nombre de usuario y avatar */}
        <View style={styles.userContainer}>
          <Text style={styles.titleHeader}>Inicio</Text>
          <Text style={styles.userName}>User0</Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Image
              source={{ uri: 'https://i.geekflare.com/cdn-cgi/image/width=1200,height=630,fit=crop,quality=90,format=auto,onerror=redirect,metadata=none/wp-content/uploads/sites/24/2023/06/AI-avatar.jpg' }}
              style={styles.avatar}
            />
          </TouchableOpacity>
        </View>
      </Appbar.Header>

      {/* 🔹 Modal para el menú */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.option} onPress={() => setModalVisible(false)}>
              <Icon name="account-circle" size={24} color="#fff" />
              <Text style={styles.optionText}>Perfil</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.option} onPress={handleLogout}>
              <Icon name="logout" size={24} color="#fff" />
              <Text style={styles.optionText}>Cerrar sesión</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'transparent',
    elevation: 0,
},
title: {
    color: '#fff',
    fontWeight: 'bold',
},
titleHeader: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 25,
    flex: 1, 
},
userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10, 
    justifyContent: 'space-between', 
},
  userName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight:6,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 🔹 Fondo semitransparente
  },
  modalContent: {
    backgroundColor: '#2A2D3E',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  optionText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
});
