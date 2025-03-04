import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {useTheme } from '../context/ThemeContext';


const SearchBar = ({ value, onChangeText, placeholder, style, inputStyle }) => {
  const { theme, darkMode, toggleTheme } = useTheme(); // ⬅ Ahora usamos el tema
  
  return (
    <View style={[styles.searchBar, {backgroundColor: theme.inputColor}]}>
      <Icon name="search" size={18} color="#717790" style={styles.searchIcon} />
      <TextInput
        style={[styles.input, inputStyle]}
        placeholder={placeholder || "Search"}
        placeholderTextColor="#717790"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

// Estilos específicos del componente SearchBar
const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 40,
    backgroundColor: '#252836',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
    paddingLeft: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
});

export default SearchBar;