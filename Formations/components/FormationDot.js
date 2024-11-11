// FormationDot.js
import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function FormationDot() {
  return <View style={styles.dot} />;
}

const styles = StyleSheet.create({
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#000',
  },
});
