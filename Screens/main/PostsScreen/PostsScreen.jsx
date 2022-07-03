import { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, Image,Button } from "react-native";
import MapScreen from "../MapScreen/MapScreen";

export default function PostsScreen({ navigation, route }) {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
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
     <Button title="go to map" onPress={() => navigation.navigate("Map")} />
     <Button title="go to comments" onPress={() => navigation.navigate("Comments")} />

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
