import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text } from "react-native";
import useSavedSets from "../hooks/useSavedSets";

function CreateSetScreen({ navigation }) {
  const [setName, setSetName] = useState("");
  const [rows, setRows] = useState(10); // Updated variable name
  const [cols, setCols] = useState(10); // Updated variable name
  const { saveSet } = useSavedSets();

  const handleSaveSet = () => {
    if (!setName.trim()) {
      alert("Please enter a set name.");
      return;
    }

    if (rows <= 0 || cols <= 0) {
      alert("Rows and columns must be greater than 0.");
      return;
    }

    const newSet = {
      id: Date.now().toString(),
      name: setName,
      formations: [],
      gridSize: { rows, cols }, // Use corrected variable names
    };

    saveSet(newSet);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter set name"
        value={setName}
        onChangeText={setSetName}
      />
      <View style={styles.gridInputsContainer}>
        <Text style={styles.label}>Rows:</Text>
        <TextInput
          style={styles.gridInput}
          keyboardType="numeric"
          value={String(rows)}
          onChangeText={(text) => setRows(Math.max(Number(text), 1))} // Correctly update rows
        />
        <Text style={styles.label}>Columns:</Text>
        <TextInput
          style={styles.gridInput}
          keyboardType="numeric"
          value={String(cols)}
          onChangeText={(text) => setCols(Math.max(Number(text), 1))} // Correctly update cols
        />
      </View>
      <Button title="Save Set" onPress={handleSaveSet} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
  },
  gridInputsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginRight: 8,
  },
  gridInput: {
    height: 40,
    width: 60,
    borderColor: "#ccc",
    borderWidth: 1,
    textAlign: "center",
    marginRight: 16,
  },
});

export default CreateSetScreen;
