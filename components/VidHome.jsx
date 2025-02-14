// import React from 'react';
// import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
// import Video from 'react-native-video';
// import { Video } from 'expo-av';
// import Icon from 'react-native-vector-icons/Feather';

// // 🔹 Datos de videos (simulando una API)
// const videoData = [
//   {
//     id: '1',
//     title: 'Cómo hacer saltos básicos y aterrizar de forma segura',
//     author: 'Andy William',
//     views: '54K',
//     time: '8 min',
//     thumbnail: 'https://via.placeholder.com/600x300',
//     avatar: 'https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
//     videoUrl: 'https://player.vimeo.com/external/449972745.sd.mp4?s=9943177fe8a6147b7bc4598259401f06ec57878a&profile_id=139&oauth2_token_id=57447761',
//   },
//   {
//     id: '2',
//     title: 'Prepare for your first skateboard jump',
//     author: 'Gerard Bind',
//     views: '42K',
//     time: '5 min',
//     thumbnail: 'https://via.placeholder.com/600x300',
//     avatar: 'https://images.pexels.com/photos/3370021/pexels-photo-3370021.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
//     videoUrl: 'https://player.vimeo.com/external/449972745.sd.mp4?s=9943177fe8a6147b7bc4598259401f06ec57878a&profile_id=139&oauth2_token_id=57447761',
//   }
// ];

// export default function VideoList() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Most Watched</Text>
//       <FlatList
//         data={videoData}
//         keyExtractor={item => item.id}
//         numColumns={2} // 🔹 2 columnas para diseño responsive
//         columnWrapperStyle={styles.row} 
//         renderItem={({ item }) => (
//           <TouchableOpacity style={styles.videoCard}>
//             <View style={styles.videoWrapper}>
//               <Video
//                 source={{ uri: item.videoUrl }}
//                 style={styles.video}
//                 resizeMode="cover"
//                 muted
//                 repeat
//               />
//               <View style={styles.videoTime}>
//                 <Text style={styles.videoTimeText}>{item.time}</Text>
//               </View>
//               <View style={styles.authorWrapper}>
//                 <Icon name="check" size={16} color="#fff" style={styles.checkIcon} />
//                 <Image source={{ uri: item.avatar }} style={styles.avatar} />
//               </View>
//             </View>
//             <Text style={styles.videoAuthor}>{item.author}</Text>
//             <Text style={styles.videoTitle}>{item.title}</Text>
//             <Text style={styles.videoViews}>{item.views} views • 1 week ago</Text>
//           </TouchableOpacity>
//         )}
//       />
//     </View>
//   );
// }

// // 🔹 Estilos para los componentes
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 16,
//     backgroundColor: '#181818',
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: '500',
//     color: '#fff',
//     marginVertical: 20,
//   },
//   row: {
//     justifyContent: 'space-between',
//   },
//   videoCard: {
//     flex: 1,
//     backgroundColor: '#222',
//     borderRadius: 15,
//     overflow: 'hidden',
//     marginBottom: 20,
//     marginHorizontal: 5,
//   },
//   videoWrapper: {
//     position: 'relative',
//   },
//   video: {
//     width: '100%',
//     height: 150,
//     borderRadius: 15,
//   },
//   videoTime: {
//     position: 'absolute',
//     top: 10,
//     right: 10,
//     backgroundColor: 'rgba(0,0,0,0.6)',
//     paddingVertical: 3,
//     paddingHorizontal: 8,
//     borderRadius: 5,
//   },
//   videoTimeText: {
//     color: '#fff',
//     fontSize: 12,
//   },
//   authorWrapper: {
//     position: 'absolute',
//     bottom: -15,
//     right: 10,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   checkIcon: {
//     backgroundColor: '#0aa0f7',
//     borderRadius: 50,
//     padding: 2,
//     marginRight: -10,
//     zIndex: 1,
//   },
//   avatar: {
//     width: 30,
//     height: 30,
//     borderRadius: 15,
//   },
//   videoAuthor: {
//     paddingHorizontal: 10,
//     paddingTop: 15,
//     color: '#bbb',
//     fontSize: 14,
//   },
//   videoTitle: {
//     paddingHorizontal: 10,
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//     paddingVertical: 5,
//   },
//   videoViews: {
//     paddingHorizontal: 10,
//     paddingBottom: 10,
//     fontSize: 12,
//     color: '#bbb',
//   },
// });
