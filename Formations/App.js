// App.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import FormationGrid from './components/FormationGrid';

export default function App() {
  return (
    <View style={styles.container}>
      <FormationGrid rows={10} cols={10} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
