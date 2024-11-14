// components/HomeScreen.js
import React from "react";
import { View, StyleSheet, Text } from "react-native";

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text onPress={() => navigation.navigate('Formation')}>Go to Formation Grid</Text>
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
