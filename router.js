import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Feather, AntDesign } from "@expo/vector-icons";

import PostsScreen from "./Screens/main/PostsScreen/PostsScreen";
import CreatePostsScreen from "./Screens/main/CreatePostsScreen/CreatePostsScreen";
import ProfileScreen from "./Screens/main/ProfileScreen/ProfileScreen";
import Register from "./Screens/auth/RegistrationScreen/RegistrationScreen";
import Login from "./Screens/auth/LoginScreen/LoginScreen";
import MapScreen from "./Screens/main/MapScreen/MapScreen";
import HomeScreen from "./Screens/main/HomeScreen/HomeScreen";

const MainStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <MainStack.Navigator>
        <MainStack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="Registration"
          component={Register}
          options={{ headerShown: false }}
        />
      </MainStack.Navigator>
    );
  }

  return (
    <MainTab.Navigator tabBarOptions={{ showLabel: false }}>
      
     
      <MainTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, size, color}) => (
            <Feather name="grid" size={size} color={color} />
          ),
        }}
      />
      <MainTab.Screen
        name="Create"
        component={CreatePostsScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, size, color}) => (
            <AntDesign name="plus" size={size} color={color} />
          ),
        }}
      />
        <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, size, color}) => (
            <AntDesign name="user" size={size} color={color} />
          ),
        }}
      />
    </MainTab.Navigator>

  );
};
