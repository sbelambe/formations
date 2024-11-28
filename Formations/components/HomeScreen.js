import React, { useCallback } from "react";
import { View, StyleSheet, Text, Button, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import useSavedSets from "../hooks/useSavedSets";

function HomeScreen({ navigation }) {
  const { savedSets, loadSets, deleteSet } = useSavedSets();

  // Ensure `loadSets` is called every time the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadSets(); // Reload saved sets
    }, [])
  );

  const handleDeleteSet = (setId) => {
    deleteSet(setId); // Delete the set and update the state
  };

  return (
    <View style={styles.container}>
      <View style={styles.introduction}>
        <Text style={styles.welcomeText}>Welcome to the Formations App</Text>
        <Text style={styles.descriptionText}>
          Create and manage your dance formations with ease. Either create a new
          set of formations or access an existing set.
        </Text>
      </View>

      <View style={styles.new}>
        <Button
          title="Create New Set Formations"
          onPress={() => navigation.navigate("CreateSetScreen")}
        />
      </View>

      <View style={styles.saved}>
        <Text style={styles.savedTitle}>Saved Sets:</Text>
        <ScrollView>
          {savedSets.length > 0 ? (
            savedSets.map((set) => (
              <View key={set.id} style={styles.setItem}>
                <Button
                  title={set.name}
                  onPress={() =>
                    navigation.navigate("SetDetailsScreen", { setId: set.id })
                  }
                />
                <Button
                  title="Delete"
                  color="red"
                  onPress={() => handleDeleteSet(set.id)} // Delete the selected set
                />
              </View>
            ))
          ) : (
            <Text style={styles.noSetsText}>No saved sets available.</Text>
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  introduction: {
    alignItems: "center",
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
  new: {
    marginBottom: 20,
  },
  saved: {
    margin: 10,
  },
  savedTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  setItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  noSetsText: {
    fontSize: 16,
    fontStyle: "italic",
    textAlign: "center",
    marginVertical: 10,
  },
});

export default HomeScreen;
