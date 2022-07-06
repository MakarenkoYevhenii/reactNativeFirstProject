import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import PostsScreen from "../PostsScreen/PostsScreen";
import CommentsScreen from "../CommentsScreen/CommentsScreen";
import MapScreen from "../MapScreen/MapScreen";
import ProfileScreen from "../ProfileScreen/ProfileScreen";
import { Button } from "react-native";
import { Feather, AntDesign } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { authSignOutUser } from "../../redux/auth/authOperation";

const NestedScreen = createStackNavigator();
export default function HomeScreen({ navigation, route }) {
  const dispatch=useDispatch()

  const handleSubmit = () => {
    dispatch(authSignOutUser());
  };
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="Публикации"
        component={PostsScreen}
        options={{
          headerRight: () => (
            <Feather
              name="log-out"
              size={30}
              color="#BDBDBD"
              onPress={handleSubmit
              }
            />
          ),
        }}
      />
      <NestedScreen.Screen name="Comments" component={CommentsScreen} />
      <NestedScreen.Screen name="Map" component={MapScreen} />
    </NestedScreen.Navigator>
  );
}
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    margin: 10,
  },
});
