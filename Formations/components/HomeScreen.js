import React from "react";
import { View, StyleSheet, Text, Button } from "react-native";

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Welcome to the Formations App</Text>
      <Button title="Go to Formation Grid" onPress={() => navigation.navigate('Formation')} />
      <Button title="Go to Music Splitter" onPress={() => navigation.navigate('MusicSplitter')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;
