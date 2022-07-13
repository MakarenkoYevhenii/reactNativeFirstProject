import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { StyleSheet, Text, View, FlatList, Image, Button } from "react-native";
import MapScreen from "../MapScreen/MapScreen";
import { collection, query, where, getDocs } from "firebase/firestore";
import { firestore } from "../../../firebase/config";
import { Feather } from "@expo/vector-icons";

export default function PostsScreen({ navigation, route }) {
  const [posts, setPosts] = useState([]);

  const getAllPosts = async () => {
    const querySnapshot = await getDocs(collection(firestore, "posts"));
    querySnapshot.forEach((doc) => {
      setPosts((prev) => [...prev, [doc.data(), doc.id]]);
    });
  };

  useEffect(() => {
    getAllPosts();
  }, []);
  const user = useSelector((state) => state.auth);

  return (
    <View style={styles.container}>
    
   
        <View style={{ flex: 0, flexDirection: "row", marginTop: 32,backgroundColor:"white" }}>
          <View style={{ marginLeft: 16, marginRight: 8 }}>
            <Image
              source={{ uri: user.avatar }}
              style={{ height: 60, width: 60, borderRadius: 16 }}
            />
          </View>
          <View style={{ justifyContent: "flex-start", alignItems:"flex-start",backgroundColor:"white"}}>
            <Text style={styles.textNickname}>{user.nickname}</Text>
            <Text style={styles.email}>{user.email}</Text>
          </View>
          
        </View>
        <View style={styles.form}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={posts}
          keyExtractor={(item, indx) => indx.toString()}
          renderItem={({ item }) => (
            <View style={styles.postContainer}>
              <Image
                source={{ uri: item[0].url }}
                style={{ height: 240, width: 343, borderRadius: 8 }}
              />
              <View>
                <View>
                  <Text
                    style={{
                      color: "#212121",
                      fontStyle: "normal",
                      fontWeight: "500",
                      fontSize: 16,
                      lineHeight: 19,
                      marginVertical: 8,
                    }}
                  >
                    {item[0].message}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 0,
                    flexDirection: "row-reverse",
                    justifyContent: "space-between",
                  }}
                >
                  <Feather
                    name="map-pin"
                    size={24}
                    color="black"
                    onPress={() =>
                      navigation.navigate("Map", {
                        location: item[0].location,
                      })
                    }
                  />
                  <Feather
                    name="message-circle"
                    size={24}
                    color="rgba(255, 108, 0, 1)"
                    onPress={() => navigation.navigate("Comments", item[1])}
                  />
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
}
{
  /* <Text style={styles.textNickname}>{user.nickname}</Text>
<Text style={styles.email}>{user.email}</Text></View></View> */
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"white",

  },
  postContainer: {
    marginTop: 32,
  },
  textNickname: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 13,
    lineHeight: 15,
    color: "#212121",
  },
  email: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 11,
    lineHeight: 13,
    color: "rgba(33, 33, 33, 0.8);",
  },
  form: {
    borderWidth: 0,
    borderBottomColor: "white",
    flex: 0,
    alignItems: "center",
    borderTopColor:"white",
    paddingHorizontal: 16,
    backgroundColor: "white",
  },
});
