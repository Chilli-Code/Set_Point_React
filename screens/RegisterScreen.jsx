import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet, Animated, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // 🔹 Importar iconos
import { Picker } from '@react-native-picker/picker'; // 🔹 Importar Picker
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'; // FontAwesome5
import OnboardingScreen from '../components/OnboardingScreen';



export default function RegisterScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [nameUser, setnameUser] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [playerType, setPlayerType] = useState(''); // Estado para el tipo de jugador
  const [password, setPassword] = useState('');

  // Animación del rebote
  const bounceAnim = new Animated.Value(0);

  useEffect(() => {
    const bounce = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(bounceAnim, {
            toValue: -20, // Sube 20 píxeles
            duration: 300, // Duración de la subida
            easing: Easing.ease,
            useNativeDriver: true,
          }),
          Animated.timing(bounceAnim, {
            toValue: 0, // Vuelve a la posición original
            duration: 300, // Duración de la bajada
            easing: Easing.bounce, // Efecto de rebote
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    bounce();
  }, []);

  const handleRegister = () => {
    console.log(`Nombre: ${name}`);
    console.log(`Apellido: ${lastName}`);
    console.log(`Nombre Usuario: ${nameUser}`);
    console.log(`Email: ${email}`);
    console.log(`Teléfono: ${phone}`);
    console.log(`Tipo de Jugador: ${playerType}`);
    console.log(`Password: ${password}`);
    alert("Registro exitoso!"); // ⚡ Muestra un alert para probar

    navigation.navigate('Onboarding');
  };

  return (
    <ImageBackground source={require('../assets/Fondo_Login.jpg')} style={styles.background}>
      <View style={styles.overlay} />
      <Text style={styles.formTitle}>
      <Animated.View // Contenedor animado para el ícono
          style={{
            transform: [{ translateY: bounceAnim }], // Aplica la animación de traslación vertical
          }}
        >
      <FontAwesome5 name="volleyball-ball" size={30} color="#6C5ECF" />
          </Animated.View>
          {' '}Registrate{' '}
        <Animated.View // Contenedor animado para el ícono
          style={{
            transform: [{ translateY: bounceAnim }], // Aplica la animación de traslación vertical
          }}
        >
          <FontAwesome5 name="volleyball-ball" size={30} color="#6b5ecf" />
        </Animated.View>
      </Text>

      {/* 🔹 Formulario en la parte inferior */}
      <View style={styles.formContainer}>
        {/* 📌 TÍTULO DEL FORMULARIO */}

        {/* 📌 CAMPOS DEL FORMULARIO */}
        <View style={styles.inputContainer}>
          <Icon name="account" size={24} color="#fff" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            placeholderTextColor="#fff"
            onChangeText={setName}
            value={name}
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="account" size={24} color="#fff" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Apellido"
            placeholderTextColor="#fff"
            onChangeText={setLastName}
            value={lastName}
          />
        </View>
        <View style={styles.inputContainer}>
          <FontAwesome5 name="user-astronaut" size={24} color="#fff" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Nombre de Usuario"
            placeholderTextColor="#fff"
            onChangeText={setnameUser}
            value={nameUser}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="email" size={24} color="#fff" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#fff"
            onChangeText={setEmail}
            value={email}
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="phone" size={24} color="#fff" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Teléfono"
            placeholderTextColor="#fff"
            onChangeText={setPhone}
            value={phone}
            keyboardType="phone-pad"
          />
        </View>

        {/* 📌 SELECTOR DE TIPO DE JUGADOR */}
        <View style={styles.pickerContainer}>
          <Icon name="volleyball" size={24} color="#fff" style={styles.inputIcon} />
          <Picker
            selectedValue={playerType}
            onValueChange={(itemValue) => setPlayerType(itemValue)}
            style={styles.picker}
            dropdownIconColor="#fff" // Cambia el color del icono del selector
          >
            <Picker.Item label="Jugador" value="" color="#aaa" />
            {/* <Picker.Item label="Tipo de jugador" value="" color="#aaa" />
            <Picker.Item label="Atacante" value="Atacante" color="#000" />
            <Picker.Item label="Defensa" value="Defensa" color="#fff" />
            <Picker.Item label="Pasador" value="Pasador" color="#fff" />
            <Picker.Item label="Libero" value="Libero" color="#fff" /> */}
          </Picker>
        </View>

        <View style={styles.inputContainer}>
          <Icon name="lock" size={24} color="#fff" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="#fff"
            secureTextEntry
            onChangeText={setPassword}
            value={password}
          />
        </View>

        {/* 📌 BOTÓN DE REGISTRO */}
        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.registerText}>Registrarse</Text>
        </TouchableOpacity>

        {/* 📌 YA TIENES CUENTA */}
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>¿Ya tienes una cuenta?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}> Iniciar sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end', // 🔹 Mantiene el formulario abajo
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // 🔹 Oscurece el fondo para mejor visibilidad
  },
  formContainer: {
    width: '100%',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
  formTitle: {
    fontSize: 40, // 🔹 Tamaño grande
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    position: 'absolute', // 🔹 Lo saca del flujo normal
    top: 20, // 🔹 Ajusta la posición en la parte superior
    width: '100%', // 🔹 Ocupa todo el ancho
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 30,
    width: '90%',
    paddingHorizontal: 10,
    marginBottom: 14,
  },
  inputIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    color: '#fff',
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 30,
    width: '90%',
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  picker: {
    flex: 1,
    color: '#fff', // Cambia el color del texto del Picker
  },
  registerButton: {
    backgroundColor: '#6C5ECF',
    paddingVertical: 15,
    borderRadius: 30,
    width: '90%',
    alignItems: 'center',
  },
  registerText: {
    fontSize: 18,
    color: '#fff',
  },
  loginContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },
  loginText: {
    color: '#fff',
    fontSize: 14,
  },
  loginLink: {
    color: '#6C5ECF',
    fontWeight: 'bold',
    fontSize: 14,
  },
});