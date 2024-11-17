import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FormationGrid from "./components/FormationGrid";
import HomeScreen from './components/HomeScreen';
import MusicSplitter from './components/MusicSplitter'; // Import MusicSplitter component

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Formation" component={FormationGrid} />
        <Stack.Screen name="MusicSplitter" component={MusicSplitter} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
