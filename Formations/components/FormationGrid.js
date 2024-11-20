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
    setFormationName("");
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

          {/* Offset and overlap the grid by positioning it absolutely */}
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
          <Text>Saved Formations:</Text>
          {savedFormations.map(({ key, value }) => (
            <Button
              key={key}
              title={key.replace("formation-", "")}
              onPress={() => {
                setDots(value);
              }}
            />
          ))}
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
    justifyContent: "center",
    backgroundColor: "#bb2345",
  },
});
