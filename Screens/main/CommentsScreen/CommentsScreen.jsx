import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
  Pressable,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  FlatList,
} from "react-native";
import {
  collection,
  query,
  where,
  getDoc,
  doc,
  setDoc,
  addDoc,
  getDocs,
} from "firebase/firestore";
import { firestore } from "../../../firebase/config";

import { useSelector } from "react-redux";
export default function CommentsScreen({ navigation, route }) {
  const [message, setMessage] = useState();
  const [comments, setcomments] = useState([]);
  const id = route.params;
  const { nickname } = useSelector((state) => state.auth);
  useEffect(() => {
    getAllPosts();
  }, []);

  const createPost = async () => {
    const docRef = doc(firestore, "posts", id);
    const docSnap = await getDoc(docRef);

    const docRef1 = await addDoc(collection(docRef, "cities"), {
      nickname,
      message,
    });
  };

  const getAllPosts = async () => {
    const docRef = doc(firestore, "posts", id);
    const docSnap = await getDoc(docRef);
    const querySnapshot = await getDocs(collection(docRef, "cities"));

    querySnapshot.forEach((doc) => {
      setcomments((prev) => [...prev, doc.data()]);
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={comments}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.nickname}</Text>
            <Text>{item.message}</Text>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput style={styles.Input} onChangeText={setMessage}></TextInput>
      </View>

      <TouchableOpacity style={styles.submit} onPress={createPost}>
        <Text style={styles.snap}>add post</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  submit: {
    height: 51,
    width: "90%",
    backgroundColor: "#FF6C00",
    marginTop: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    marginBottom: 30,
  },
  inputContainer: {
    marginHorizontal: 10,
    marginBottom: 20,
  },
  Input: {
    height: 50,
    width: 200,
    borderColor: "red",
    borderWidth: 1,
  },
});
