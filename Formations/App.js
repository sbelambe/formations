import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./components/HomeScreen";
import CreateSetScreen from "./components/CreateSetScreen"; 
import SetDetailsScreen from "./components/SetDetailsScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CreateSetScreen" component={CreateSetScreen} />
        <Stack.Screen name="SetDetailsScreen" component={SetDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import FormationGrid from "./components/FormationGrid"; // Ensure the path is correct

// const Stack = createStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="FormationGrid">
//         <Stack.Screen name="FormationGrid" component={FormationGrid} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
