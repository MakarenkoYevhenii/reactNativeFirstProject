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

import { authSignOutUser } from "../../redux/auth/authOperation";

export default function ProfileScreen({ navigation }) {
  const { userId,avatar } = useSelector((state) => state.auth);
  
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(authSignOutUser());
  };
  const getUserPosts = async () => {
    // Create a query against the collection.
    const citiesRef = collection(firestore, "posts");
    const q = query(citiesRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
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
      
    
      <View style={styles.form}>
      <View>
        <TouchableOpacity onPress={handleSubmit}>
          <Text>authSignOutUser</Text>
        </TouchableOpacity>
      </View>
      <Image style={styles.avatar} source={{ uri: avatar }} />

      <View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={posts}
          keyExtractor={(item, indx) => indx.toString()}
          renderItem={({ item }) => (
            <View style={styles.postContainer}>
              <Image
                source={{ uri: item[0].url }}
                style={{ height: 240, width: 343 }}
              />
              <View>
                <View>
                  <Text>{item.message}</Text>
                </View>
                <Button
                  title="go to map"
                  onPress={() =>
                    navigation.navigate("Map", { location: item[0].location })
                  }
                />

                <Button
                  title="go to comments"
                  onPress={() => navigation.navigate("Comments", item[1])}
                />
              </View>
            </View>
          )}
        />
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
    borderBottomColor:"white",
    flex: 0,
    alignItems: "center",
    height: 549,
    paddingTop: 92,
    paddingBottom: 78,
    paddingHorizontal: 16,
    backgroundColor: "white",
  },
  avatar: {
    zIndex: 1000,
    left: 0,
    top: -150,
    resizeMode: "cover",
    backgroundColor: "#F6F6F6",
    width: 120,
    height: 120,
    borderRadius: 16,
  },
});
