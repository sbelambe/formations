import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import useSavedSets from "../hooks/useSavedSets";

function CreateSetScreen({ navigation }) {
  const [setName, setSetName] = useState("");
  const { saveSet } = useSavedSets();

  const handleSaveSet = () => {
    if (!setName.trim()) {
      alert("Please enter a set name.");
      return;
    }

    const newSet = {
      id: Date.now().toString(),
      name: setName,
      formations: [],
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
});

export default CreateSetScreen;
