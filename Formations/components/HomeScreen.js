import React from "react";
import { View, StyleSheet, Text, Button } from "react-native";

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.introduction}>
        <Text style={styles.welcomeText}>Welcome to the Formations App</Text>
        <Text style={styles.descriptionText}>
          Create and manage your dance formations with ease. Either create a new
          set of formations or access an exisiting set of formations.
        </Text>
      </View>

      <View style={styles.new}>
        <Button
          title="Create New Set Formations"
          onPress={() => navigation.navigate("Formation")}
        /> 
        <Button
          title="Go to Music Splitter"
          onPress={() => navigation.navigate("MusicSplitter")}
        />
      </View>
      <View style={styles.saved}>
        <Text>Below are the saved sets of formations: </Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  introduction: {
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 30,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 16,
  },
  descriptionText: {
    fontSize: 16,
    textAlign: "center",
    marginHorizontal: 16,
  },

  saved: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
});

export default HomeScreen;
