import React, { useEffect } from "react";
import { View, StyleSheet, Text, Button, ScrollView } from "react-native";
import useSavedSets from "../hooks/useSavedSets";

function HomeScreen({ navigation }) {
  const { savedSets, loadSets } = useSavedSets();

  useEffect(() => {
    loadSets(); 
  }, []); 

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
        <Text>Saved Sets:</Text>
        <ScrollView>
          {savedSets.map((set) => (
            <Button
              key={set.id}
              title={set.name}
              onPress={() => navigation.navigate("SetDetailsScreen", { setId: set.id })}
            />
          ))}
        </ScrollView>
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
});

export default HomeScreen;
