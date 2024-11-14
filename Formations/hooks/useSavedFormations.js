import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useSavedFormations = () => {
  const [savedFormations, setSavedFormations] = useState([]);

  const loadSavedFormations = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const formations = await AsyncStorage.multiGet(keys);
      setSavedFormations(formations.map(([key, value]) => ({ key, value: JSON.parse(value) })));
    } catch (error) {
      console.error('Failed to load saved formations:', error);
    }
  };

  const saveFormation = async (name, formation) => {
    try {
      const key = `formation-${name}`;
      await AsyncStorage.setItem(key, JSON.stringify(formation));
      loadSavedFormations(); // Reload formations after saving
    } catch (error) {
      console.error('Failed to save formation:', error);
    }
  };

  useEffect(() => {
    loadSavedFormations();
  }, []);

  return { savedFormations, saveFormation };
};

export default useSavedFormations;
