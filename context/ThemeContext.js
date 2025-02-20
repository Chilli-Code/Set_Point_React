import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// 🔹 Definir los colores de cada tema
const lightTheme = {
  background: "#FFFFFF",
  text: "#000000",
  textTittle: "#000",
  primary: "#34bfff",
  headerBack: "#f7f7f7",
  card: "#F8F9FA",
  cardVideo: "#E8EAF0",
  textPrinicpalHeader: "#6C5ECF",
  inputColor: "#ECECEC",
  RelatedColor: "#ECECEC",
  textBox: "#717790",
};

const darkTheme = {
  background: "#1f1d2b",
  text: "#FFFFFF",
  textTittle: "#fff",
  primary: "#34bfff",
  headerBack: "#1f1d2b",
  card: "#1F1D2B",
  cardVideo: "#252936",
  textPrinicpalHeader: "#fff",
  inputColor: "#252836",
  RelatedColor: "#252936",
  textBox: "#fff",

};

// 🔹 Crear el contexto
const ThemeContext = createContext();

// 🔹 Proveedor del contexto del tema
export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true); // ✅ Iniciar siempre en Modo Oscuro

  // 📌 Cargar el tema guardado cuando se inicia la app
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem("theme"); // Obtener el tema guardado
        if (storedTheme !== null) {
          setDarkMode(storedTheme === "dark"); // Convertirlo a booleano
        } else {
          // ✅ Si no hay tema guardado, usar siempre el **Modo Oscuro**
          setDarkMode(true);
        }
      } catch (error) {
        console.log("Error al cargar el tema:", error);
      }
    };

    loadTheme();
  }, []);

  // 📌 Cambiar y guardar el tema cuando el usuario lo modifica
  const toggleTheme = async () => {
    try {
      const newMode = !darkMode;
      setDarkMode(newMode);
      await AsyncStorage.setItem("theme", newMode ? "dark" : "light"); // Guardar en almacenamiento
    } catch (error) {
      console.log("Error al guardar el tema:", error);
    }
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme, theme: darkMode ? darkTheme : lightTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 🔹 Hook para usar el tema en otros archivos
export const useTheme = () => useContext(ThemeContext);
