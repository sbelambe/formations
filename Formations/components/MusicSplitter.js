import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import Slider from '@react-native-community/slider';

export default function MusicSplitter() {
  const [file, setFile] = useState(null);
  const [breaks, setBreaks] = useState([]);
  const [currentBreak, setCurrentBreak] = useState(0);

  const pickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: 'audio/*' });
      if (result.type === 'success') {
        setFile(result);
      } else {
        Alert.alert("File selection cancelled.");
      }
    } catch (error) {
      console.error("Error picking file:", error);
      Alert.alert("Error picking file. Please try again.");
    }
  };

  const addBreak = () => {
    if (!file) {
      Alert.alert("No file loaded", "Please upload an audio file before adding breaks.");
      return;
    }
    setBreaks((prevBreaks) => [...prevBreaks, currentBreak].sort((a, b) => a - b));
  };

  const displayBreaks = () => {
    if (breaks.length === 0) {
      return <Text style={styles.noBreaks}>No breaks added yet. Use the slider to add breaks.</Text>;
    }

    return breaks.map((breakPoint, index) => (
      <Text key={index} style={styles.breakPoint}>
        Break at {breakPoint}%
      </Text>
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Music Splitter</Text>

      <Button title="Choose Audio File" onPress={pickFile} />
      {file && <Text style={styles.fileName}>Loaded file: {file.name}</Text>}

      {file && (
        <>
          <Slider
            style={{ width: '90%', height: 40, marginVertical: 10 }}
            minimumValue={0}
            maximumValue={100}
            step={1}
            minimumTrackTintColor="#1fb28a"
            maximumTrackTintColor="#d3d3d3"
            thumbTintColor="#b9e4c9"
            onValueChange={(value) => setCurrentBreak(value)}
          />
          <Text style={styles.breakLabel}>Current Break: {currentBreak}%</Text>
          <Button title="Add Break" onPress={addBreak} />
        </>
      )}

      {file && (
        <View style={styles.breaksContainer}>
          <Text style={styles.breaksTitle}>Breaks:</Text>
          {displayBreaks()}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  fileName: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
  breakLabel: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: '500',
  },
  breaksContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  breaksTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  noBreaks: {
    fontSize: 16,
    color: '#999',
  },
  breakPoint: {
    fontSize: 16,
    marginVertical: 5,
  },
});
