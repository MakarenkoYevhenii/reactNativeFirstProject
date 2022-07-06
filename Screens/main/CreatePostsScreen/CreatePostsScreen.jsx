import { Camera } from "expo-camera";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import * as Location from "expo-location";
import {
  getStorage,
  ref,
  uploadBytes,
  firebase,
  uploadString,
  getDownloadURL,
} from "firebase/storage";

import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../../../firebase/config";
import { useSelector } from "react-redux";
export default function CreatePostsScreen({ navigation }) {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");
  const [url, setUrl] = useState("");

  const {userId,nickname}= useSelector((state)=>state.auth)
  console.log( useSelector((state)=>state.auth));
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
    })();
  }, []);

  const takePhoto = async () => {
    const data = await camera.takePictureAsync();
    const source = data.uri;
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    setPhoto(source);
  };

  const uploadPhotos = async () => {
    const storage = getStorage();
    const response = await fetch(photo);
    const file = await response.blob();
    const uniqPost = Date.now().toString();
    const mountainImagesRef = ref(storage, `images/${uniqPost}.jpg`);

    await uploadBytes(mountainImagesRef, file).then((snapshot) => {
    });

    await getDownloadURL(ref(storage, `images/${uniqPost}.jpg`)).then((url) => {
      setUrl(url);
    });
   await sendPhoto();
  };
  const uploadPostonServer = async () => {
    const photo = await uploadPhotos();
    console.log(location.coords);
    const cityRef = doc(firestore, "posts", Date.now().toString());
    setDoc(cityRef, { location: location.coords, message: message, url: url,userId,nickname });
  };

  const sendPhoto = async () => {
    navigation.navigate("DefaultScreen");
  };
  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={setCamera}>
        {photo ? (
          <View style={styles.takePhotoContainer}>
            <Image
              source={{ uri: photo }}
              style={{ height: 100, width: 100 }}
            />
          </View>
        ) : (
          <Text></Text>
        )}
        <TouchableOpacity onPress={takePhoto} style={styles.snapContaner}>
          <Text style={styles.snap}>SNAP</Text>
        </TouchableOpacity>
      </Camera>
      <View style={styles.inputContainer}>
        <TextInput style={styles.Input} onChangeText={setMessage}></TextInput>
      </View>

      <TouchableOpacity style={styles.submit} onPress={uploadPostonServer}>
        <Text style={styles.snap}>Опубликовать</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  camera: {
    height: "60%",
    width: "80%",
    marginTop: 50,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  snap: {
    color: "white",
  },
  snapContaner: {
    borderWidth: 1,
    borderColor: "red",
    width: 70,
    height: 70,
    marginBottom: 20,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  takePhotoContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    borderColor: "red",
    borderWidth: 1,
  },
  submit: {
    height: 51,
    width: "90%",
    backgroundColor: "#FF6C00",
    marginTop: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
  inputContainer: {
    marginHorizontal: 10,
  },
  Input: {
    height: 50,
    width: 200,
    borderBottomColor: "red",
    borderBottomWidth: 1,
  },
});
