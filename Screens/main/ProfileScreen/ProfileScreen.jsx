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
import { useDispatch } from "react-redux";

import { authSignOutUser } from "../../redux/auth/authOperation";

export default function ProfileScreen() {
  const dispatch=useDispatch()
  const handleSubmit=()=>{
    dispatch(authSignOutUser())
    
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleSubmit}><Text>authSignOutUser</Text></TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
