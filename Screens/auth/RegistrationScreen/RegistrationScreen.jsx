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
  Button,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const initialState = {
  email: "",
  password: "",
  login: "",
};
export default function Register({ navigation }) {
  const [passwordHide, setHide] = useState(true);
  const [registerInfo, setRegister] = useState(initialState);
  const [image, setImage] = useState(null);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const handleSubmit = () => {
    setRegister(initialState);
  };
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.container}>
        <ImageBackground
          source={require("../../../share/img/Photo.png")}
          style={styles.image}
        >
          <TouchableOpacity onPress={pickImage} style={{ zIndex: 1000 }}>
            <View style={styles.buttonImageAdd}>
              <Text
                style={{
                  color: "rgba(255, 108, 0, 1)",
                  fontSize: 17,
                  textAlign: "center",
                }}
              >
                +
              </Text>
            </View>

            <Image style={styles.avatar} source={{ uri: image }} />
          </TouchableOpacity>
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            keyboardVerticalOffset={-150}
          >
            <View style={styles.form}>
              <View>
                <Text
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: 30,
                  }}
                >
                  Регистрация
                </Text>
              </View>
              <View>
                <TextInput
                  style={styles.input}
                  placeholder={"Логин"}
                  value={registerInfo.login}
                  onChangeText={(value) =>
                    setRegister((prevState) => ({ ...prevState, login: value }))
                  }
                />
              </View>
              <View>
                <TextInput
                  value={registerInfo.email}
                  style={styles.input}
                  placeholder={"Адрес электронной почты"}
                  onChangeText={(value) =>
                    setRegister((prevState) => ({ ...prevState, email: value }))
                  }
                />
              </View>
              <View style={{ marginBottom: 43 - 16 }}>
                <TextInput
                  style={styles.input}
                  secureTextEntry={passwordHide}
                  placeholder={"Пароль"}
                  value={registerInfo.password}
                  onChangeText={(value) =>
                    setRegister((prevState) => ({
                      ...prevState,
                      password: value,
                    }))
                  }
                />
              </View>
              <TouchableOpacity onPress={handleSubmit}>
                <View style={styles.button}>
                  <Text style={{ color: "white", fontSize: 16 }}>
                    Зарегистрироваться
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setHide((prevState) => !prevState);
                }}
              >
                <View style={styles.hideButton}>
                  <Text
                    style={{
                      color: "#1B4371",
                      fontSize: 16,
                      fontWeight: "400",
                      lineHeight: 19,
                    }}
                  >
                    Показать
                  </Text>
                </View>
              </TouchableOpacity>
              <Pressable onPress={() => navigation.navigate("Login")}>
                <Text style={{ textAlign: "center", color: "#1b4371" }}>
                  Уже есть аккаунт? Войти
                </Text>
              </Pressable>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  button: {
    height: 51,
    alignItems: "center",
    justifyContent: "center",
    width: 343,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
  },
  image: {
    flex: 2,
    resizeMode: "cover",
    justifyContent: "flex-end",
    width: "100%",
  },
  container: {
    flex: 1,
  },
  form: {
    borderWidth: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    flex: 0,
    alignItems: "center",
    height: 549,
    paddingTop: 92,
    paddingBottom: 78,
    paddingHorizontal: 16,
    backgroundColor: "white",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    width: 343,
    height: 50,
    padding: 16,
    marginBottom: 16,
  },
  avatar: {
    zIndex: 1000,
    left: 150,
    top: 50,
    resizeMode: "cover",
    backgroundColor: "#F6F6F6",
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  hideButton: {
    left: 130,
    top: -129,
    height: 19,
    width: 71,
    color: "#1B4371",
  },
  buttonImageAdd: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    width: 25,
    height: 25,
    right: -260,
    top: 150,
    zIndex: 150000,
    borderColor: "rgba(255, 108, 0, 1)",
    borderRadius: 16,
  },
});
