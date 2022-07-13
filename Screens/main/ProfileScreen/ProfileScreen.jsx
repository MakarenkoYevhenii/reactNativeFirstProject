import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
  Pressable,
  Image,
  Button,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  FlatList,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../../../firebase/config";
import { Feather, AntDesign } from "@expo/vector-icons";

import { authSignOutUser } from "../../redux/auth/authOperation";

export default function ProfileScreen({ navigation }) {
  const { userId, avatar, nickname } = useSelector((state) => state.auth);

  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  const hello = [];
  const handleSubmit = () => {
    dispatch(authSignOutUser());
  };
  const getUserPosts = async () => {
    // Create a query against the collection.
    const citiesRef = collection(firestore, "posts");
    const q = query(citiesRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      // console.log(doc.data())
      setPosts((prev) => [...prev, [doc.data(), doc.id]]);
    });
  };
  useEffect(() => {
    getUserPosts();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../share/img/Photo.png")}
        style={styles.image}
      >
        <Image style={styles.avatar} source={{ uri: avatar }} />

        <View style={styles.form}>
          <View>
          
              <Feather
                style={{ left: 270, top: 10 }}
                name="log-out"
                size={30}
                color="#BDBDBD"
                onPress={handleSubmit}
              />
       
            <Text style={styles.nickname}>{nickname}</Text>
          </View>
          <View>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={posts}
              keyExtractor={(item, indx) => indx.toString()}
              renderItem={({ item }) => (
                <View style={styles.postContainer}>
                  <Image
                    source={{ uri: item[0].url }}
                    style={{ height: 240, width: 343,borderRadius:8,}}
                  />
                  <View>
                    <View>
                      <Text style={{color:"#212121", fontStyle:"normal",fontWeight:"500",fontSize:16,lineHeight:19,marginVertical:8,}}>{item[0].message}</Text>
                    </View>
                    <View style={{flex:0, flexDirection:"row-reverse",justifyContent:"space-between"}}>
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
                    /></View>
                  </View>
                </View>
              )}
            />
            <View style={{ height: 90 }}></View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 2,
    resizeMode: "cover",
    justifyContent: "flex-end",
    width: "100%",
  },
  form: {
    borderWidth: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomColor: "white",
    flex: 0,
    alignItems: "center",
    height: 549,
    paddingHorizontal: 16,
    backgroundColor: "white",
  },
  avatar: {
    zIndex: 1000,
    left: 150,
    top: 70,
    resizeMode: "cover",
    position: "relative",
    backgroundColor: "#F6F6F6",
    width: 120,
    height: 120,
    borderRadius: 16,
  },

  nickname: {
    marginTop: 92,
    marginBottom:32,
    fontWeight:"500",
    fontSize:30,
    lineHeight:35,
  },
  postContainer: {
    marginBottom: 30,
    height: 350,
  },
});
