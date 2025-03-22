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
} from 'react-native';
import LottieView from 'lottie-react-native';

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
  const [isLoading, setIsLoading] = useState(false);
  const [welcomeText, setWelcomeText] = useState('');

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
      setIsLoading(true);
      setWelcomeText(`Bienvenido\n${email}`);

      setTimeout(() => {
        navigation.replace('Home');
      }, 3000);
    } else {
      alert('Correo o contraseña incorrectos');
    }
  };

  return (
    <ImageBackground source={require('../assets/Fondo_Login.jpg')} style={styles.background}>
      <View style={styles.overlay} />

      {isLoading ? (
        <View style={styles.welcomeContainer}>
          {/* 🔹 Contenedor con fondo y bordes redondeados */}
          <View style={styles.welcomeBox}>
            <Text style={styles.welcomeText}>{welcomeText}</Text>
            <LottieView
              source={require('../assets/welcome-animation.json')}
              autoPlay
              loop={false}
              style={styles.animation}
            />
          </View>
        </View>
      ) : (
        <>
          <Animated.View style={[styles.titleContainer, { transform: [{ translateY: titleAnimation }] }]}>
            {/* <Text style={styles.title}>Set Points</Text> */}
          </Animated.View>

          {/* 🔹 Formulario de inicio de sesión */}
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
        </>
      )}
    </ImageBackground>
  );
}

// 📌 **Estilos**
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
    fontFamily: 'Arial',
    fontWeight: 'bold',
    color: '#F8F8F8',
    textAlign: 'center',
    letterSpacing: 3,
    textTransform: 'uppercase',
    textShadowColor: '#6C5ECF',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 8,
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
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
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
  // 🔹 Estilos del mensaje de bienvenida y animación
  welcomeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeBox: {
    backgroundColor: 'rgba(0, 0, 0, 0.11)',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    width: "100%",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#34bfff',
    marginBottom: 15,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  animation: {
    width: 400,
    height: 400,
  },
});

