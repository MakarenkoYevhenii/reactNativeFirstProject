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


const initialState = {
  email: "",
  password: "",
};
export default function Login() {
  const [passwordHide, setHide] = useState(true);
  const [loginInfo, setLogin] = useState(initialState);

  const handleSubmit = (e) => {
    console.log(loginInfo);
    setLogin(initialState);
  };
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.container}>
        <ImageBackground
          source={require("../../share/img/Photo.png")}
          style={styles.image}
        >
          <Image style={styles.avatar} />

          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            keyboardVerticalOffset={-250}
          >
            <View style={styles.form}>
              <View>
                <Text
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "30px",
                    marginBottom: 33,
                  }}
                >
                  Войти
                </Text>
              </View>
              <View>
                <TextInput
                  value={loginInfo.email}
                  style={styles.input}
                  placeholder={"Адрес электронной почты"}
                  onChangeText={(value) =>
                    setLogin((prevState) => ({ ...prevState, email: value }))
                  }
                />
              </View>
              <View style={{ marginBottom: 43 }}>
                <TextInput
                  style={styles.input}
                  secureTextEntry={passwordHide}
                  placeholder={"Пароль"}
                  value={loginInfo.password}
                  onChangeText={(value) =>
                    setLogin((prevState) => ({ ...prevState, password: value }))
                  }
              >
              </TextInput> 
              </View>
              <TouchableOpacity onPress={handleSubmit}>
                <View style={styles.button}>
                  <Text style={{ color: "white", fontSize: 16 }}>Войти</Text>
                </View>
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={() => {
                  setHide((prevState) => !prevState);
                }}
              >
                <View style={styles.hideButton}>
                  <Text style={{ color: "#1B4371", fontSize: 16,fontWeight:"400",lineHeight:19 }}>Показать</Text>
                </View>
              </TouchableOpacity>
              <Pressable>
                <Text style={{ textAlign: "center", color: "#1b4371" }}>
                  Нет аккаунта? Зарегистрироваться
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
    marginBottom: 16,
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
    borderRadius: "8px",
    width: 343,
    height: 50,
    marginBottom: 16,
    padding: 16,
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
    top: -159,
    height: 19,
    width: 71,
    color: "#1B4371",
    marginBottom: 16,
  },
});
