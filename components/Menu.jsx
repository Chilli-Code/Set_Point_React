import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Animated, Easing, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useNavigationState } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export default function Menu() {
  const navigation = useNavigation();
  const currentRoute = useNavigationState((state) => state?.routes[state.index]?.name);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const animatedValues = menuItems.map(() => new Animated.Value(0));

  // 🔹 Detecta la pantalla actual y actualiza la selección del menú
  useEffect(() => {
    const index = menuItems.findIndex((item) => item.route === currentRoute);
    if (index !== -1) {
      setSelectedIndex(index);
    }
  }, [currentRoute]);

  const handlePress = (index, route) => {
    setSelectedIndex(index);
    navigation.navigate(route);

    Animated.timing(animatedValues[index], {
      toValue: -6, // 🔥 Efecto de elevación al seleccionar
      duration: 200,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();

    animatedValues.forEach((value, i) => {
      if (i !== index) {
        Animated.timing(value, {
          toValue: 0,
          duration: 200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }).start();
      }
    });
  };

  return (
    <NavBar>
      <NavList>
        {menuItems.map((item, index) => (
          <NavItem key={index}>
            <AnimatedTouchable
              onPress={() => handlePress(index, item.route)}
              style={{ transform: [{ translateY: animatedValues[index] }] }}
            >
              <IconContainer active={selectedIndex === index} color={item.color}>
                <Ionicons name={item.icon} size={24} color={selectedIndex === index ? '#fff' : '#fff'} />
              </IconContainer>
            </AnimatedTouchable>
          </NavItem>
        ))}
      </NavList>
    </NavBar>
  );
}

// 🔹 Opciones del menú con rutas
const menuItems = [
  { name: 'Home', icon: 'home-outline', color: '#f44336', route: 'Home' },
  { name: 'Videos', icon: 'videocam-outline', color: '#ffa117', route: 'Videos' },
  { name: 'Perfil', icon: 'person-outline', color: '#0fc70f', route: 'Perfil' },
];

// 📌 **Styled Components**
const NavBar = styled.View`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 60px;
  background: #181818;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  justify-content: center;
  align-items: center;
  align-self: center;
  elevation: 5;
`;

const NavList = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
  align-items: center;
`;

const NavItem = styled.View`
  width: 60px;
  align-items: center;
  justify-content: center;
`;

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const IconContainer = styled.View`
  width: 45px;
  height: 45px;
  border-radius: 50px;
  background: ${(props) => (props.active ? props.color : 'transparent')};
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease;
`;
