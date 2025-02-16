import React, { useRef, useState, useEffect } from 'react';
import { View, Image, Text, Dimensions, ScrollView, Animated } from 'react-native';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const players = [
  { id: '1', name: 'Alice', image: 'https://images.pexels.com/photos/2889942/pexels-photo-2889942.jpeg' },
  { id: '2', name: 'Bob', image: 'https://images.unsplash.com/photo-1587918842454-870dbd18261a' },
  { id: '3', name: 'Charlie', image: 'https://images.pexels.com/photos/3370021/pexels-photo-3370021.jpeg' },
];

export default function PlayerCards() {
  const scrollViewRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 📌 Auto-scroll cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = (currentIndex + 1) % players.length;
      setCurrentIndex(nextIndex);
      scrollViewRef.current.scrollTo({ x: nextIndex * width, animated: true });
    }, 3000);
    
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <Container>
      <TitleContainerP>
        <StyledTitle>Jugadores🏐</StyledTitle>
      </TitleContainerP>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          let index = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
      >
        {players.map((player) => (
          <Card key={player.id}>
            <CardBackground colors={['rgba(106, 13, 173, 0.8)', 'rgba(0, 212, 255, 0.8)']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
              <PlayerImage source={{ uri: player.image }} />
              <Overlay />
              <TitleContainer>
                <RoleText>PLAYER</RoleText>
              </TitleContainer>
              <BottomOverlay>
                <PlayerName>{player.name.toUpperCase()}</PlayerName>
              </BottomOverlay>
            </CardBackground>
          </Card>
        ))}
      </ScrollView>
    </Container>
  );
}

// 📌 **Styled Components**
const Container = styled.View`
  flex: 1;
  margin-top: 40px;
  padding-top: 20px;
  padding-bottom: 20px;
  justify-content: center;
  align-items: center;
  background-color: #32a7e216;
  width: 100%;
`;

const TitleContainerP = styled.View`
margin-bottom: 15px;
`;
const StyledTitle = styled.Text`
  font-size: 28px;
  font-weight: bold;
  text-transform: uppercase;
  text-align: center;
  letter-spacing: 2px;
  text-shadow: 0px 4px 10px rgba(255, 255, 255, 0.432);
  background-clip: text;
  -webkit-background-clip: text;
  color: #32a7e2;
`;

const Card = styled.View`
  width: ${width}px;
  height: 450px;
  border-radius: 15px;
  overflow: hidden;
  align-items: center;
  justify-content: center;
`;

const CardBackground = styled(LinearGradient)`
  flex: 1;
  width: 80%;
  height: 100%;
  border-radius: 15px;
  align-items: center;
  justify-content: flex-end;
  padding: 10px;
`;

const PlayerImage = styled.Image`
  width: 90%;
  height: 75%;
  border-radius: 12px;
  position: absolute;
  top: 10px;
  border-width: 2px;
  border-color: rgba(255, 255, 255, 0.2);
`;

const Overlay = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  /* background-color: rgba(0, 0, 0, 0.3); */
`;

const TitleContainer = styled.View`
  position: absolute;
  bottom: 100px;
  width: 90%;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

const RoleText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  text-transform: uppercase;
`;

const BottomOverlay = styled(LinearGradient).attrs({
  colors: ['#00d4ff24', '#8a2be2b0', '#00d4ff24'],
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 },
})`
  width: 90%;
  height: 60px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  position: absolute;
  bottom: 0;
  margin-bottom:15px;
`;


const PlayerName = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: #fff;
  text-transform: uppercase;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.6);
`;
