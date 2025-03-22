import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  FlatList
} from "react-native";
import LottieView from "lottie-react-native";
import { useTheme } from "../context/ThemeContext";
import Icon from "react-native-vector-icons/FontAwesome5"; 



export default function ProfileCard({ search, navigation }) {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  // Simulación de carga de datos
  useEffect(() => {
    const fetchProfiles = async () => {
      setLoading(true);
      setTimeout(() => {
        const fetchedProfiles = [
          {
            id: "u1",
            name: "Jorge Villamizar",
            username: "GeorgeSport",
            avatar:
              "https://avatars.githubusercontent.com/u/93390482?v=4",
              followers: "1.2K",
            },
            {
              id: "u2",
              name: "Plinio Acuña",
              username: "NeonSport",
              avatar:
                "https://scontent.fbaq5-1.fna.fbcdn.net/v/t1.6435-9/52984131_2434465986786715_6045019499634098176_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=94e2a3&_nc_ohc=6lLynFWIpuAQ7kNvgGM3ToT&_nc_oc=AdiAGgBRvhXgWSLsbXXHZ1QA6p67_TA0GxsQbl-HZz3O2xVAEMW-yHg8NzoSzrWVmB0&_nc_zt=23&_nc_ht=scontent.fbaq5-1.fna&_nc_gid=AkjnqPzwJe8pNjPGI1uJBPp&oh=00_AYEz7Z5Kbb2kkx9KmQtORi1NXA0dEPNgDBV23BKTIn6bMQ&oe=67F2CD0C",
                followers: "1.2K",
              },
              {
                id: "u3",
                name: "Jander Marmol",
                username: "Toto Rubio",
                avatar:
                  "https://scontent.fbaq5-1.fna.fbcdn.net/v/t39.30808-6/471633018_1318282245841172_303769881325801554_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=FdL5cUgYJP8Q7kNvgGDkTq-&_nc_oc=AdjH676jXSrYMjbZpEmGSUJlpLMoxHzztdSI1Qhq4DDTHh8Onsm_ETzSwQNdPxBTs_k&_nc_zt=23&_nc_ht=scontent.fbaq5-1.fna&_nc_gid=A45MA1F457i1rqpEleuJ-j-&oh=00_AYGhBXKejjJVTUCeKAZ7Qylw6sTo-_OdyzlGz9WjVWlsuA&oe=67D13A14",
                  followers: "1.2K",
                },
          {
            id: "u4",
            name: "Pablo Pérez perez",
            username: "pabloperez",
            avatar:
              "https://media.istockphoto.com/id/472117493/es/foto/retrato-de-joven-jugador-de-v%C3%B3leibol.jpg?s=2048x2048&w=is&k=20&c=2q8_nk83Rzf6KcYIixYZKwXHedIEiMG7ihoKwAa10Is=",
              followers: "1.2K",
            },
          {
            id: "u5",
            name: "María López",
            username: "marialopez",
            avatar:
              "https://media.istockphoto.com/id/1446052358/es/foto/listo-para-jugar-netball.jpg?s=2048x2048&w=is&k=20&c=2TYjsxMLA2Kb5iXLn2PNl8EfX2VO_z99_HB7JxrR18k=",
              followers: "1.2K",
            },
            {
              id: "u6",
              name: "María López",
              username: "marialopez",
              avatar:
                "https://media.istockphoto.com/id/1446052358/es/foto/listo-para-jugar-netball.jpg?s=2048x2048&w=is&k=20&c=2TYjsxMLA2Kb5iXLn2PNl8EfX2VO_z99_HB7JxrR18k=",
                followers: "1.2K",
              },
              {
                id: "u7",
                name: "María López",
                username: "marialopez",
                avatar:
                  "https://media.istockphoto.com/id/1446052358/es/foto/listo-para-jugar-netball.jpg?s=2048x2048&w=is&k=20&c=2TYjsxMLA2Kb5iXLn2PNl8EfX2VO_z99_HB7JxrR18k=",
                  followers: "1.2K",
                },
                {
                  id: "u8",
                  name: "María López",
                  username: "marialopez",
                  avatar:
                    "https://media.istockphoto.com/id/1446052358/es/foto/listo-para-jugar-netball.jpg?s=2048x2048&w=is&k=20&c=2TYjsxMLA2Kb5iXLn2PNl8EfX2VO_z99_HB7JxrR18k=",
                    followers: "1.2K",
                  },
                  {
                    id: "u9",
                    name: "María López",
                    username: "marialopez",
                    avatar:
                      "https://media.istockphoto.com/id/1446052358/es/foto/listo-para-jugar-netball.jpg?s=2048x2048&w=is&k=20&c=2TYjsxMLA2Kb5iXLn2PNl8EfX2VO_z99_HB7JxrR18k=",
                      followers: "1.2K",
                    },
            
        ];
        setProfiles(fetchedProfiles);
        setLoading(false);
      }, 1500);
    };

    fetchProfiles();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#6C5ECF" />;
  }

  // Filtrar perfiles según el término de búsqueda
  const filteredProfiles = profiles.filter(
    (profile) =>
      profile.name.toLowerCase().includes(search.toLowerCase()) ||
      profile.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
<FlatList
  data={filteredProfiles}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <View
      style={[styles.profileCard, { backgroundColor: theme.cardVideo }]}
    >
      {/* Contenido del perfil */}
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.profileInfo}>
        <Text style={[styles.profileName, { color: theme.text }]}>
          {item.name}
        </Text>
        <Text style={styles.profileUsername}>
          @{item.username}
        </Text>
      </View>
      <View style={styles.followersContainer}>
        <Icon name="users" size={14} color="#bbb" style={styles.followersIcon} />
        <Text style={styles.followersText}>{item.followers}</Text>
      </View>
      <TouchableOpacity
        style={styles.viewButton}
        onPress={() => navigation.navigate("UserProfile", { user: item })}
      >
        <Text style={styles.viewButtonText}>Ver</Text>
      </TouchableOpacity>
    </View>
  )}
  ListEmptyComponent={
    <View style={styles.emptyContainer}>
      <LottieView
        source={require("../assets/LottieJS/noData2.0.json")}
        autoPlay
        loop
        style={{ width: 200, height: 200 }}
      />
      <Text style={styles.emptyText}>Perfil no encontrado</Text>
    </View>
  }
/>
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  emptyText: {
    marginTop: 20,
    fontSize: 18,
    color: "#6C5ECF",
  },
  profileCard: {
    flexDirection: "row", // Alinea los elementos horizontalmente
    alignItems: "center", // Centra verticalmente los elementos
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
    borderWidth: 0.4,
    borderColor: "#6C5ECF",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  profileInfo: {
    flex: 1, // Ocupa el espacio restante entre la imagen y el botón
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  profileUsername: {
    color: "#6C5ECF",
  },
  viewButton: {
    backgroundColor: "#6C5ECF",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  viewButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  followersContainer: {
    flexDirection: "row", // Alinea el ícono y el texto horizontalmente
    alignItems: "center", // Centra verticalmente
    marginTop: 4,
    marginRight:10,
  },
  followersIcon: {
    marginRight: 4, // Espacio entre el ícono y el texto
  },
  followersText: {
    fontSize: 12,
    color: "#bbb", // Color secundario
  },
});