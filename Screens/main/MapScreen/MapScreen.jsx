import { useState } from "react";
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
} from "react-native";
import MapView,{Marker} from "react-native-maps";

export default function MapScreen({ navigation,route }) {
  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 49.43471687554721,
          longitude: 32.0971355067297,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      ><Marker coordinate={{ latitude: 49.43471687554721,
        longitude: 32.0971355067297,}}/></MapView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
