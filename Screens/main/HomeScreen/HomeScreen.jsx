import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import PostsScreen from "../PostsScreen/PostsScreen";
import CommentsScreen from "../CommentsScreen/CommentsScreen"
import MapScreen from "../MapScreen/MapScreen"
const NestedScreen = createStackNavigator();
export default function HomeScreen({navigation,route}) {

    return (
      <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="DefaultScreen"
        component={PostsScreen}
      />
      <NestedScreen.Screen name="Comments" component={CommentsScreen} />
      <NestedScreen.Screen name="Map" component={MapScreen} />
    </NestedScreen.Navigator>
      );
    }
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
    });
    