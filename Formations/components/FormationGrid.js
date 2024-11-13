import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import FormationDot from './FormationDot';

export default function FormationGrid() {
  const [dots, setDots] = useState([]);
  const [rows, setRows] = useState(10);
  const [cols, setCols] = useState(10); 

  const handleCellClick = (rowIndex, colIndex) => {
    if (rowIndex === rows - 1 || colIndex === cols - 1) {
      return;
    }

    const dotKey = `${rowIndex}-${colIndex}`;

    setDots(prevDots => {
      if (prevDots.includes(dotKey)) {
        return prevDots.filter(dot => dot !== dotKey);
      } else {
        return [...prevDots, dotKey];
      }
    });
  };

  const isDotPresent = (rowIndex, colIndex) => {
    const dotKey = `${rowIndex}-${colIndex}`;
    return dots.includes(dotKey);
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

      <View style={styles.gridContainer}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginHorizontal: 5,
  },
  input: {
    width: 50,
    height: 30,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    textAlign: 'center',
  },
  gridContainer: {
    position: 'relative',
  },
  gridOverlay: {
    position: 'absolute', 
    flexDirection: 'column',
  },
  gridOverlayOffset: {
    position: 'absolute',
    flexDirection: 'column',
    marginLeft: 15, 
    marginTop: 15,  
  },
  row: {
    flexDirection: 'row',
  },
  gridItem: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: '#03fcdb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridItemOverlay: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
