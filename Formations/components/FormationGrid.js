import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Button,
  ScrollView,
} from "react-native";
import FormationDot from "./FormationDot";
import useSavedFormations from "../hooks/useSavedFormations";

export default function FormationGrid() {
  const [dots, setDots] = useState([]);
  const [rows, setRows] = useState(10);
  const [cols, setCols] = useState(10);
  const [formationName, setFormationName] = useState("");
  const [selectedFormation, setSelectedFormation] = useState(null);

  const { savedFormations, saveFormation, deleteFormation } =
    useSavedFormations();

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
    setFormationName("");
  };

  const handleDeleteFormation = () => {
    if (selectedFormation) {
      deleteFormation(selectedFormation);
      setSelectedFormation(null);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.inputText}>
          <Text style={styles.label}>Rows and Columns are limited to 15</Text>
          <View style={styles.inputButtons}>
            <Text style={styles.label}>Rows:</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={String(rows)}
              onChangeText={(text) => {
                const value = Math.min(Number(text), 15);
                setRows(value);
              }}
            />
            <Text style={styles.label}>Columns:</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={String(cols)}
              onChangeText={(text) => {
                const value = Math.min(Number(text), 15);
                setCols(value);
              }}
            />
          </View>
        </View>
        <View style={styles.centeredSection}>
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
        </View>

        <View style={styles.saveFormationContainer}>
          <TextInput
            style={[styles.input, { width: 200, marginRight: 10 }]}
            placeholder="Enter Formation Name"
            value={formationName}
            onChangeText={(text) => setFormationName(text)}
          />
          <View style={{ justifyContent: "center" }}>
            <Button title="Save Formation" onPress={handleSaveFormation} />
          </View>
        </View>

        <View style={styles.savedFormationsContainer}>
          <Text style={styles.savedFormationsTitle}>Saved Formations:</Text>
          {savedFormations.map(({ key, value }) => {
            const formationName = key.replace("formation-", "");
            return (
              <View key={key} style={styles.savedFormationRow}>
                <TouchableOpacity
                  style={[
                    styles.savedFormationButton,
                    selectedFormation === formationName &&
                      styles.selectedFormationButton,
                  ]}
                  onPress={() => {
                    setDots(value);
                    setSelectedFormation(formationName);
                  }}
                >
                  <Text style={styles.savedFormationButtonText}>
                    {formationName}
                  </Text>
                </TouchableOpacity>
                {selectedFormation === formationName && (
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={handleDeleteFormation}
                  >
                    <Text style={styles.deleteButtonText}>Delete</Text>
                  </TouchableOpacity>
                )}
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  container: {
    display: "flex",
    flexDirection: "column",
  },
  inputButtons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#cbcbcb",
  },
  inputText: {
    flexDirection: "column",
    alignItems: "center",
    justify_content: "center",
    background_color: "#fd4567",
  },
  centeredSection: {
    marginTop: 20,
    paddingTop: 20,
    backgroundColor: "#739573",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 600,
    width: "100%",
  },

  gridOverlay: {
    position: "absolute",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  gridOverlayOffset: {
    marginTop: 30,
    marginLeft: 30,
    position: "absolute",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  row: {
    flexDirection: "row",
  },

  gridItem: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: "#940593",
    alignItems: "center",
    justifyContent: "center",
  },

  gridItemOverlay: {
    width: 30,
    height: 30,
    // borderWidth: 1,
    // borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  label: {
    fontSize: 16,
    marginHorizontal: 5,
    backgroundColor: "#123456",
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
  saveFormationContainer: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#a5687f",
  },
  savedFormationsContainer: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
  },
  savedFormationsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  savedFormationRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  savedFormationButton: {
    backgroundColor: "#6200ea",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  selectedFormationButton: {
    backgroundColor: "#3700b3",
  },
  savedFormationButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  deleteButton: {
    backgroundColor: "#ff1744",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
