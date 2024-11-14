// App.js
import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FormationGrid from "./components/FormationGrid";
import HomeScreen from './components/HomeScreen';  // Import the HomeScreen component

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Formation" component={FormationGrid} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
