import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

export default function FormationGrid({ rows = 10, cols = 10 }) {
  const [dots, setDots] = useState([]);

  const handleCellClick = (rowIndex, colIndex) => {
    // Create a unique key for each dot
    const dotKey = `${rowIndex}-${colIndex}`;
    
    // Toggle dot presence
    setDots(prevDots => {
      if (prevDots.includes(dotKey)) {
        // If the dot exists, remove it
        return prevDots.filter(dot => dot !== dotKey);
      } else {
        // If the dot doesn't exist, add it
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
      {/* Original Grid - Visible for testing */}
      <View style={styles.gridOverlay}>
        {[...Array(rows)].map((_, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {[...Array(cols)].map((_, colIndex) => (
              <TouchableOpacity
                key={colIndex}
                style={styles.gridItem} // Change the border color for visibility
                onPress={() => handleCellClick(rowIndex, colIndex)}
              >
                {/* This grid is visible for testing */}
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>

      {/* Overlay Grid - Slightly Offset */}
      <View style={styles.gridOverlayOffset}>
        {[...Array(rows)].map((_, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {[...Array(cols)].map((_, colIndex) => (
              <TouchableOpacity
                key={colIndex}
                style={styles.gridItemOverlay}
                onPress={() => handleCellClick(rowIndex, colIndex)}
              >
                {isDotPresent(rowIndex, colIndex) && (
                  <View style={styles.dot} />
                )}
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
    position: 'relative', // Allow absolute positioning within this container
  },
  gridOverlay: {
    flexDirection: 'column',
  },
  gridOverlayOffset: {
    position: 'absolute', // Position it over the grid
    top: 0,
    left: 0,
    flexDirection: 'column',
    marginLeft: 30, // Slightly offset to the right
    marginTop: 30, // Slightly offset downwards
  },
  row: {
    flexDirection: 'row',
  },
  gridItem: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: '#000', // Change this to dark color for visibility
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridItemOverlay: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: '#a1f0d8', // Visible grid
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#000',
  },
});
