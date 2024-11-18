import React, { useState, useRef } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';

export default function MusicSplitter() {
  const [file, setFile] = useState(null);
  const [audioUri, setAudioUri] = useState(null);
  const [playbackObject, setPlaybackObject] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [breaks, setBreaks] = useState([]);
  const sliderRef = useRef(null);

  const pickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: 'audio/*' });
      if (result.type === 'success') {
        setFile(result);
        setAudioUri(result.uri);
        loadAudio(result.uri);
      } else {
        Alert.alert("File selection cancelled.");
      }
    } catch (error) {
      console.error("Error picking file:", error);
      Alert.alert("Error picking file. Please try again.");
    }
  };

  const loadAudio = async (uri) => {
    try {
      if (playbackObject) {
        await playbackObject.unloadAsync();
      }

      const playback = new Audio.Sound();
      await playback.loadAsync({ uri });
      playback.setOnPlaybackStatusUpdate(updateStatus);

      const status = await playback.getStatusAsync();
      setDuration(status.durationMillis || 0);
      setPlaybackObject(playback);
    } catch (error) {
      console.error("Error loading audio:", error);
      Alert.alert("Error loading audio. Please try again.");
    }
  };

  const updateStatus = (status) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis || 0);
      if (status.didJustFinish) {
        setIsPlaying(false);
      }
    }
  };

  const togglePlayPause = async () => {
    if (!playbackObject) return;

    if (isPlaying) {
      await playbackObject.pauseAsync();
    } else {
      await playbackObject.playAsync();
    }
    setIsPlaying(!isPlaying);
  };

  const addBreak = () => {
    if (position && position > 0) {
      const breakPoint = Math.round((position / duration) * 100);
      setBreaks((prevBreaks) => [...prevBreaks, breakPoint].sort((a, b) => a - b));
    }
  };

  const saveBreaks = () => {
    Alert.alert("Breaks Saved", `Breaks saved for ${file?.name}: ${breaks.join(", ")}%`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Music Splitter</Text>

      <Button title="Choose Audio File" onPress={pickFile} />
      {file && <Text style={styles.fileName}>Loaded file: {file.name}</Text>}

      {audioUri && (
        <>
          <Slider
            style={{ width: '90%', height: 40, marginVertical: 10 }}
            minimumValue={0}
            maximumValue={duration}
            value={position}
            minimumTrackTintColor="#1fb28a"
            maximumTrackTintColor="#d3d3d3"
            thumbTintColor="#b9e4c9"
            onSlidingComplete={async (value) => {
              if (playbackObject) {
                await playbackObject.setPositionAsync(value);
              }
            }}
          />
          <Text style={styles.breakLabel}>
            Current Position: {Math.round((position / duration) * 100)}%
          </Text>
          <View style={styles.controls}>
            <Button title={isPlaying ? "Pause" : "Play"} onPress={togglePlayPause} />
            <Button title="Add Break" onPress={addBreak} />
          </View>
        </>
      )}

      {breaks.length > 0 && (
        <View style={styles.breaksContainer}>
          <Text style={styles.breaksTitle}>Breaks:</Text>
          {breaks.map((breakPoint, index) => (
            <Text key={index} style={styles.breakPoint}>
              Break at {breakPoint}%
            </Text>
          ))}
          <Button title="Save Breaks" onPress={saveBreaks} />
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
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginVertical: 10,
  },
  breaksContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  breaksTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  breakPoint: {
    fontSize: 16,
    marginVertical: 5,
  },
});
