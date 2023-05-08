import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainStackNavigator from "./navigators/MainStack";

export default function App() {
  return (
   
      <NavigationContainer>
        <MainStackNavigator />
      </NavigationContainer>
   
  );
}
