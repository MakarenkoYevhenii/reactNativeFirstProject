import { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";

export default function PostsScreen({ navigation, route }) {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);
  console.log(posts);
  return (
    <View style={styles.container}>
      <Text>gkdfkgj</Text>
      <FlatList
      showsVerticalScrollIndicator={false}
        data={posts}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            <Image
              source={{ uri: item.photo }}
              style={{ height: 240, width: 343 }}
            />
          </View>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  postContainer: {
    marginBottom:10,
    alignItems:"center",
    justifyContent:"center",
  },
});
