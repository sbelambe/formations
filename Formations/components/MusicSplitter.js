import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
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
      }
    } catch (error) {
      console.error("Error picking file:", error);
    }
  };

  const addBreak = () => {
    setBreaks((prevBreaks) => [...prevBreaks, currentBreak].sort((a, b) => a - b));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Music Splitter</Text>

      <Button title="Choose Audio File" onPress={pickFile} />
      {file && <Text style={styles.fileName}>Loaded file: {file.name}</Text>}

      {file && (
        <>
          <Slider
            style={{ width: '90%', height: 40 }}
            minimumValue={0}
            maximumValue={100}
            minimumTrackTintColor="#1fb28a"
            maximumTrackTintColor="#d3d3d3"
            thumbTintColor="#b9e4c9"
            onValueChange={(value) => setCurrentBreak(Math.round(value))}
          />
          <Text style={styles.breakLabel}>Current Break: {currentBreak}%</Text>
          <Button title="Add Break" onPress={addBreak} />
        </>
      )}

      {breaks.length > 0 && (
        <View>
          <Text style={styles.breaksTitle}>Breaks:</Text>
          {breaks.map((breakPoint, index) => (
            <Text key={index} style={styles.breakPoint}>
              Break at {breakPoint}%
            </Text>
          ))}
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
  breaksTitle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
  breakPoint: {
    fontSize: 16,
    marginVertical: 5,
  },
});
