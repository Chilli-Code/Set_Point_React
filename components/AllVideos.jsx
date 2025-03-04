import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"; // FontAwesome5
import Material from "react-native-vector-icons/MaterialIcons";
import { useTheme } from "../context/ThemeContext";
import SearchBar from "./SearchBar";
import LottieView from 'lottie-react-native';


export default function AllVideos() {
  const { theme } = useTheme();
  const navigation = useNavigation();

  // Datos simulados
  const [videos, setVideos] = useState([]); // Partidos
  const [users, setUsers] = useState([]); // Perfiles
  const [filteredData, setFilteredData] = useState([]); // Resultados filtrados
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchType, setSearchType] = useState("match"); // 'match' (partidos) o 'user' (perfiles)

  // Simulación de carga de datos
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setTimeout(() => {
        const fetchedVideos = [
          {
            id: "1",
            title: "Gran Final - Leones Vóley vs. Dragones de la Costa",
            author: "Liga Profesional de Vóley",
            views: "54K",
            time: "8 min",
            imgPreview:
              "https://cdn.qwenlm.ai/output/620e27ad-ab7d-4a82-a162-15bb08a5d68d/t2i/1fce59a3-6086-4d81-bbea-7afd29ce914c/72b3d920-c30e-4928-b48e-6511187e8e09.png",
            avatar:
              "https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
            videoUrl:
              "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            type: "match",
          },
          {
            id: "2",
            title: "Semifinal - Águilas del Norte vs. Toros del Pacífico",
            author: "Copa Internacional de Vóley",
            views: "42K",
            time: "5 min",
            imgPreview:
              "https://cdn.qwenlm.ai/output/620e27ad-ab7d-4a82-a162-15bb08a5d68d/t2i/acddc013-50b4-496b-8611-04fa84b7366e/321eb1df-00c5-4c9d-91dd-1bedab462e0a.png",
            avatar:
              "https://images.pexels.com/photos/3370021/pexels-photo-3370021.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
            videoUrl:
              "https://media.istockphoto.com/id/1479959180/video/ld-blue-female-volleyball-team-striking-a-point-and-celebrating.mp4?s=mp4-640x640-is&k=20&c=C9exPI5XVYxFZgGMVLh_c1BKhfKZiqb88PgqZNLfwn4=",
            type: "match",
          },
          {
            id: "3",
            title: "Cuartos de Final - Titanes vs. Jaguares",
            author: "Campeonato Nacional de Vóley",
            views: "98K",
            time: "10 min",
            imgPreview:
              "https://cdn.qwenlm.ai/output/620e27ad-ab7d-4a82-a162-15bb08a5d68d/t2i/d6ebd305-8edf-4f9f-bb07-7e77221f6ba9/732ea1cd-a0a9-4ae2-8515-1dde2721f490.png",
            avatar:
              "https://images.pexels.com/photos/1024311/pexels-photo-1024311.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
            videoUrl:
              "https://media.istockphoto.com/id/1452708598/video/female-volleyball-player-spiking-the-ball-while-other-team-defending-at-sports-court.mp4?s=mp4-640x640-is&k=20&c=uvjGRvTeFuYIcAuzR-CZXHnYZ3xA1pOt4wWN4e1pBIo=",
              type: "match",
            },
        ];

        const fetchedUsers = [
          {
            id: "u1",
            name: "Pablo Pérez",
            username: "pabloperez",
            avatar:
              "https://media.istockphoto.com/id/472117493/es/foto/retrato-de-joven-jugador-de-v%C3%B3leibol.jpg?s=2048x2048&w=is&k=20&c=2q8_nk83Rzf6KcYIixYZKwXHedIEiMG7ihoKwAa10Is=",
            type: "user",
          },
          {
            id: "u2",
            name: "María López",
            username: "marialopez",
            avatar:
              "https://media.istockphoto.com/id/1446052358/es/foto/listo-para-jugar-netball.jpg?s=2048x2048&w=is&k=20&c=2TYjsxMLA2Kb5iXLn2PNl8EfX2VO_z99_HB7JxrR18k=",
            type: "user",
          },
        ];

        setVideos(fetchedVideos);
        setUsers(fetchedUsers);
        setFilteredData(fetchedVideos); // Por defecto, muestra partidos
        setLoading(false);
      }, 1500);
    };

    fetchData();
  }, []);

  // Función para filtrar datos
  const handleSearch = (text) => {
    setSearch(text);

    if (text.trim() === "") {
      setFilteredData(searchType === "match" ? videos : users);
    } else {
      const filtered =
        searchType === "match"
          ? videos.filter(
              (video) =>
                video.title.toLowerCase().includes(text.toLowerCase()) ||
                video.author.toLowerCase().includes(text.toLowerCase())
            )
          : users.filter(
              (user) =>
                user.name.toLowerCase().includes(text.toLowerCase()) ||
                user.username.toLowerCase().includes(text.toLowerCase())
            );

      setFilteredData(filtered);
    }
  };

  // Cambiar el tipo de búsqueda
  const changeSearchType = (type) => {
    setSearchType(type);

    // Limpiar el texto de búsqueda al cambiar el tipo
    setSearch("");

    // Restablecer los datos según el tipo seleccionado
    if (type === "match") {
      setFilteredData(videos);
    } else {
      setFilteredData(users);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* 🔹 Barra de búsqueda */}
      <SearchBar
        value={search}
        onChangeText={handleSearch}
        placeholder="Buscar..."
        style={{ backgroundColor: theme.inputColor }}
        inputStyle={{ color: theme.text }}
      />

      {/* 🔹 Selector de tipo de búsqueda */}
      <View
        style={[styles.searchOptions, { backgroundColor: theme.cardVideo }]}
      >
        <TouchableOpacity
          style={[
            styles.optionButton,
            searchType === "match" && styles.activeOption,
            { color: theme.text },
          ]}
          onPress={() => changeSearchType("match")}
        >
          <Text style={[styles.optionText, { color: theme.text }]}>
            Partidos{" "}
            <Material
              name="stadium"
              size={14}
              color={theme.text}
              style={{ textAlign: "center", position: "relative" }}
            />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.optionButton,
            searchType === "user" && styles.activeOption,
          ]}
          onPress={() => changeSearchType("user")}
        >
          <Text style={[styles.optionText, { color: theme.text }]}>
            Perfiles{" "}
            <FontAwesome5
              name="users"
              size={14}
              color={theme.text}
              style={{ textAlign: "center", position: "relative" }}
            />
          </Text>
        </TouchableOpacity>
      </View>

      {/* 🔹 Indicador de carga */}
      {loading ? (
        <ActivityIndicator
          size="large"
          color={theme.text}
          style={{ marginTop: 20 }}
        />
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <LottieView
                source={require("../assets/LottieJS/noData2.0.json")} // Archivo Lottie
                autoPlay
                loop
                style={{ width: 200, height: 200 }}
              />
              <Text style={[styles.emptyText, {color: theme.text}]}>
                {searchType === "match"
                  ? "No se encontraron partidos"
                  : "Perfil no encontrado."}
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <View
              style={[styles.videoCard, { backgroundColor: theme.cardVideo }]}
            >
              <View style={styles.videoWrapper}>
                <Image
                  source={{ uri: item.imgPreview || item.avatar }}
                  style={styles.video}
                  resizeMode="cover"
                />

                <View style={styles.videoTime}>
                  <Text style={styles.videoTimeText}>{item.time}</Text>
                </View>
                <View style={styles.authorWrapper}>
                  <Icon
                    name="check"
                    size={10}
                    color="#fff"
                    style={styles.checkIcon}
                  />
                  <Image source={{ uri: item.avatar }} style={styles.avatar} />
                </View>
              </View>

              <Text style={styles.videoAuthor}>{item.author || item.name}</Text>
              <Text style={[styles.videoTitle, { color: theme.text }]}>
                {item.title || item.username}
              </Text>
              <Text style={styles.videoViews}>
                {item.views ? `${item.views} views • 1 week ago` : ""}
              </Text>

              {/* 🔹 BOTÓN DE OJO PARA NAVEGAR A INFO VIDEO */}
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => {
                  if (item.type === "match") {
                    navigation.navigate("InfoVideo", { video: item });
                  } else {
                    navigation.navigate("UserProfile", { user: item });
                  }
                }}
              >
                <Icon name="eye" size={20} color="#fff" />
                <Text style={styles.eyeButtonText}>Ver más</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

// 🔹 **Estilos optimizados**
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 10,
    backgroundColor: "#1f1d2b",
    marginBottom: 40,
  },
  row: {
    justifyContent: "space-between",
  },
  videoCard: {
    flex: 1,
    backgroundColor: "#252936",
    borderRadius: 15,
    overflow: "hidden",
    marginBottom: 20,
    marginHorizontal: 5,
    paddingBottom: 10,
  },
  videoWrapper: {
    position: "relative",
  },
  video: {
    width: "100%",
    height: 150,
    borderRadius: 15,
  },
  videoTime: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  videoTimeText: {
    color: "#fff",
    fontSize: 12,
  },
  checkIcon: {
    backgroundColor: "#0aa0f7",
    borderRadius: 50,
    padding: 2,
    marginRight: -10,
    zIndex: 1,
  },
  authorWrapper: {
    position: "absolute",
    bottom: -15,
    right: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  videoAuthor: {
    paddingHorizontal: 10,
    paddingTop: 15,
    color: "#bbb",
    fontSize: 14,
  },
  videoTitle: {
    paddingHorizontal: 10,
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    paddingVertical: 5,
  },
  videoViews: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    fontSize: 12,
    color: "#bbb",
  },
  eyeButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#6C5ECF",
    borderRadius: 10,
    padding: 8,
    marginHorizontal: 10,
    marginTop: 8,
    justifyContent: "center",
  },
  eyeButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 5,
  },
  searchOptions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
    width: "100%",
    marginBottom: 10,
  },
  optionButton: {
    padding: 10,
    borderRadius: 5,
    textAlign: "center",
    width: "50%",
  },
  activeOption: {
    backgroundColor: "#6C5ECF",
  },
  optionText: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
  emptyText: {
    fontSize:20,
    fontWeight: "bold",
  },
});
