import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Animated,
  Alert,
} from 'react-native';

// 🔹 Simulación de base de datos JSON de usuarios
const users = [
  { email: 'admin@gmail.com', password: '123456' },
  { email: 'jugador2@example.com', password: 'abcdef' },
  { email: 'admin@example.com', password: 'admin123' },
];

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const titleAnimation = useState(new Animated.Value(0))[0];
  const fadeAnimation = useState(new Animated.Value(0))[0];

  useEffect(() => {
    Animated.timing(titleAnimation, {
      toValue: -90,
      duration: 2000,
      useNativeDriver: false,
    }).start();

    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 1000,
      delay: 500,
      useNativeDriver: false,
    }).start();
  }, []);

  // 🔹 Función de validación del login
  const handleLogin = () => {
    const userFound = users.find(user => user.email === email && user.password === password);

    if (userFound) {
      Alert.alert('¡Bienvenido!', `Has iniciado sesión como ${email}`);
      navigation.replace('Home'); // 🔹 Navega al Home y elimina el login del stack
    } else {
      Alert.alert('Error', 'Correo o contraseña incorrectos');
    }
  };

  return (
    <ImageBackground source={require('../assets/Fondo_Login.jpg')} style={styles.background}>
      <View style={styles.overlay} />

      <Animated.View style={[styles.titleContainer, { transform: [{ translateY: titleAnimation }] }]}>
        <Text style={styles.title}>Set Points</Text>
      </Animated.View>

      {/* 🔹 Formulario en la parte inferior */}
      <Animated.View style={[styles.formContainer, { opacity: fadeAnimation }]}>
        <Text style={styles.formTitle}>Iniciar Sesión</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#fff"
          onChangeText={setEmail}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#fff"
          secureTextEntry
          onChangeText={setPassword}
          value={password}
        />

        <TouchableOpacity style={styles.forgotPasswordContainer}>
          <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>¿No tienes cuenta?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerLink}> Registrate</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  titleContainer: {
    position: 'absolute',
    top: 100,
  },
  title: {
    fontSize: 50,
    fontFamily: 'Sports World-Regular',
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    letterSpacing: 2,
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
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  input: {
    width: '90%',
    padding: 15,
    marginBottom: 15,
    borderRadius: 30,
    borderColor:"#0f0",
    backgroundColor: 'rgba(255, 255, 255, 0.932)',
    color: '#fff',
  },
  forgotPasswordContainer: {
    width: '90%',
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  forgotPassword: {
    color: '#6C5ECF',
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: '#6C5ECF',
    paddingVertical: 15,
    borderRadius: 30,
    width: '90%',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 18,
    color: '#fff',
  },
  registerContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },
  registerText: {
    color: '#fff',
    fontSize: 14,
  },
  registerLink: {
    color: '#6C5ECF',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
