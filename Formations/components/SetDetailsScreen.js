import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import useSavedSets from "../hooks/useSavedSets"; 
import FormationGrid from "./FormationGrid"; 

function SetDetailsScreen({ route, navigation }) {
  const { setId } = route.params;
  const { savedSets, loadSets, deleteSet } = useSavedSets();
  const [currentSet, setCurrentSet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSets().finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const foundSet = savedSets.find((set) => set.id === setId);
    setCurrentSet(foundSet || null);
  }, [savedSets, setId]);

  const handleDeleteSet = () => {
    deleteSet(setId); // Call deleteSet to remove the current set
    navigation.goBack(); // Navigate back to the previous screen
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!currentSet) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Set not found!</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Text style={styles.title}>{currentSet.name}</Text>

      {/* FormationGrid Component */}
      <FormationGrid
        formations={currentSet.formations}
        onFormationSelect={(formation) =>
          navigation.navigate("FormationEditor", {
            setId: currentSet.id,
            formationId: formation.id,
          })
        }
      />

      {/* Delete Button */}
      <View style={styles.actions}>
        <Button
          title="Delete Set"
          color="red"
          onPress={() => {
            if (window.confirm("Are you sure you want to delete this set?")) {
              handleDeleteSet();
            }
          }}
        />
      </View>
    </ScrollView>
  );
}

  

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
  },
  actions: {
    marginTop: 20,
  },
});

export default SetDetailsScreen;
