import { Camera } from "expo-camera";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import * as Location from 'expo-location';

export default function CreatePostsScreen({ navigation }) {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState("");
  const takePhoto = async () => {
    const data = await camera.takePictureAsync();
    const source = data.uri;
    const accsesToLocation=await Location.requestForegroundPermissionsAsync()
    const location=await Location.getCurrentPositionAsync()
    setPhoto(source);
    console.log(location);
  };
  
  const sendPhoto =async()=>{
    console.log(navigation);
    navigation.navigate("Home",{photo})
  }
  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={setCamera}>
        {photo? (
          <View style={styles.takePhotoContainer}>
            <Image
              source={{ uri: photo }}
              style={{ height: 100, width: 100 }}
            />
          </View>
        ):<Text></Text>}

        <TouchableOpacity onPress={takePhoto} style={styles.snapContaner}>
          <Text style={styles.snap}>SNAP</Text>
        </TouchableOpacity>
      </Camera>
      <TouchableOpacity  style={styles.submit} onPress={sendPhoto}>
          <Text style={styles.snap}>Опубликовать</Text>
        </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:"center",
  },
  camera: {
    height:"60%",
    width:"80%",
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
  submit:{
    height: 51,
    width:"90%",
    backgroundColor:"#FF6C00",
    marginTop:32,
    alignItems:"center",
    justifyContent:"center",
    borderRadius:100,
  }
});
