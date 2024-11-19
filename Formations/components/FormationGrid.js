import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Button,
} from "react-native";
import FormationDot from "./FormationDot";
import useSavedFormations from "../hooks/useSavedFormations"; // Import the custom hook

export default function FormationGrid() {
  const [dots, setDots] = useState([]);
  const [rows, setRows] = useState(10);
  const [cols, setCols] = useState(10);
  const [formationName, setFormationName] = useState(""); // Name input for the formation

  // Use the custom hook to manage saved formations
  const { savedFormations, saveFormation } = useSavedFormations();

  const handleCellClick = (rowIndex, colIndex) => {
    if (rowIndex === rows - 1 || colIndex === cols - 1) {
      return;
    }

    const dotKey = `${rowIndex}-${colIndex}`;

    setDots((prevDots) => {
      if (prevDots.includes(dotKey)) {
        return prevDots.filter((dot) => dot !== dotKey);
      } else {
        return [...prevDots, dotKey];
      }
    });
  };

  const isDotPresent = (rowIndex, colIndex) => {
    const dotKey = `${rowIndex}-${colIndex}`;
    return dots.includes(dotKey);
  };

  const handleSaveFormation = () => {
    if (formationName.trim() === "") {
      alert("Please enter a name for the formation.");
      return;
    }
    saveFormation(formationName, dots);
    setFormationName(""); // Clear the input field
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Rows:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={String(rows)}
          onChangeText={(text) => setRows(Number(text))}
        />
        <Text style={styles.label}>Columns:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={String(cols)}
          onChangeText={(text) => setCols(Number(text))}
        />
      </View>
     
        <View style={styles.gridOverlay}>
          {[...Array(rows)].map((_, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {[...Array(cols)].map((_, colIndex) => (
                <TouchableOpacity
                  key={colIndex}
                  style={styles.gridItem}
                  onPress={() => handleCellClick(rowIndex, colIndex)}
                />
              ))}
            </View>
          ))}
        </View>

        <View style={styles.gridOverlayOffset}>
          {[...Array(rows)].map((_, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {[...Array(cols)].map((_, colIndex) => (
                <TouchableOpacity
                  key={colIndex}
                  style={styles.gridItemOverlay}
                  onPress={() => handleCellClick(rowIndex, colIndex)}
                >
                  {isDotPresent(rowIndex, colIndex) && <FormationDot />}
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
  

      <View style={styles.saveFormationContainer}>
        <TextInput
          style={[styles.input, { width: 200, marginRight: 10 }]} // Set a fixed width for the text input
          placeholder="Enter Formation Name"
          value={formationName}
          onChangeText={(text) => setFormationName(text)}
        />
        <View style={{ justifyContent: "center" }}>
          <Button title="Save Formation" onPress={handleSaveFormation} />
        </View>
      </View>

      <View style={styles.savedFormationsContainer}>
        <Text>Saved Formations:</Text>
        {savedFormations.map(({ key, value }) => (
          <Button
            key={key}
            title={key.replace("formation-", "")}
            onPress={() => {
              setDots(value); // Load the saved formation when a button is pressed
            }}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 16,
    marginHorizontal: 5,
  },
  input: {
    width: 50,
    height: 30,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 5,
    textAlign: "center",
    marginBottom: 10,
  },
  gridOverlay: {
    position: "absolute",
    flexDirection: "column",
    marginTop: 50,
    marginLeft: 30,
  },
  gridOverlayOffset: {
    position: "absolute",
    flexDirection: "column",
    marginLeft: 45,
    marginTop: 65,
  },
  row: {
    flexDirection: "row",
  },
  gridItem: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: "#03fcdb",
    alignItems: "center",
    justifyContent: "center",
  },
  gridItemOverlay: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  saveFormationContainer: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "center", // Center horizontally
    alignItems: "center", // Align vertically
    marginTop: 400,
  },
  savedFormationsContainer: {
    marginTop: 20,
    justifyContent: "center",
  },
});
