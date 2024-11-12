import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import FormationDot from './FormationDot';

export default function FormationGrid({ rows = 10, cols = 10 }) {
  const [dots, setDots] = useState([]);

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
  );
}

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center', 
    position: 'relative',
    flex: 1,
  },
  gridOverlay: {
    position: 'absolute', 
    flexDirection: 'column',
  },
  gridOverlayOffset: {
    position: 'absolute',
    flexDirection: 'column',
    marginLeft: 30,
    marginTop: 30,
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
