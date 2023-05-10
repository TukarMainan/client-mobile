import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import HomeScreen from "../screens/HomeScreen";
import MessageScreen from "../screens/MessageScreen";
import OrderScreen from "../screens/OrderScreen";
import ProfileScreen from "../screens/ProfileScreen";
import PostScreen from "../screens/PostScreen";
import Message from "../screens/MessageScreen";
import ChatComponents from "../components/Chat";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import DetailScreen from "../screens/DetailScreen";
import CameraScreen from "../screens/Camera";
import StorageScreen from "../screens/Storage";
import ModalProfile from "../screens/ProfileModal";
import TradeScreen from "../screens/TradeScreen";
import Review from "../screens/Review";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Homee"
      screenOptions={{
        activeTintColor: "#ffffff",
        inactiveTintColor: "#8e8e93",
      }}
    >
      <Tab.Screen
        name="Homee"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={24} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Order"
        component={OrderScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="bell" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Post"
        component={PostScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="plus" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Message"
        component={MessageScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="message" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="account" color={color} size={24} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

export default function MainStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Homes">
      <Stack.Screen
        name="Homes"
        component={HomeTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Order" component={OrderScreen} />
      <Stack.Screen name="Post" component={PostScreen} />
      <Stack.Screen name="Message" component={Message} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Chat" component={ChatComponents} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
      <Stack.Screen name="Camera" component={CameraScreen} />
      <Stack.Screen name="Storage" component={StorageScreen} />
      <Stack.Screen name="Modal" component={ModalProfile} />
      <Stack.Screen name="Trade" component={TradeScreen} />
      <Stack.Screen name="Review" component={Review} />
    </Stack.Navigator>
  );
}
