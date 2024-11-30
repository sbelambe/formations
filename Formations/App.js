import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import CreateSetScreen from "./screens/CreateSetScreen"; 
import SetDetailsScreen from "./screens/SetDetailsScreen";
import MusicSplitter from "./components/MusicSplitter";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CreateSetScreen" component={CreateSetScreen} />
        <Stack.Screen name="SetDetailsScreen" component={SetDetailsScreen} />
        <Stack.Screen name="MusicSplitter" component={MusicSplitter} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
