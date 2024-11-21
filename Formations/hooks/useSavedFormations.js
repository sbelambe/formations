import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useSavedFormations = () => {
  const [savedFormations, setSavedFormations] = useState([]);

  const loadSavedFormations = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const formations = await AsyncStorage.multiGet(keys);
      setSavedFormations(
        formations
          .filter(([key]) => key.startsWith("formation-"))
          .map(([key, value]) => ({ key, value: JSON.parse(value) }))
      );
    } catch (error) {
      console.error("Failed to load saved formations:", error);
    }
  };

  const saveFormation = async (name, formation) => {
    const key = `formation-${name}`;
    if (savedFormations.some((formation) => formation.key === key)) {
      alert("A formation with this name already exists. Please use a different name.");
      return;
    }

    try {
      await AsyncStorage.setItem(key, JSON.stringify(formation));
      loadSavedFormations(); // Reload formations after saving
    } catch (error) {
      console.error("Failed to save formation:", error);
    }
  };

  const deleteFormation = async (name) => {
    const key = `formation-${name}`;
    try {
      await AsyncStorage.removeItem(key);
      loadSavedFormations(); // Reload formations after deleting
    } catch (error) {
      console.error("Failed to delete formation:", error);
    }
  };

  useEffect(() => {
    loadSavedFormations();
  }, []);

  return { savedFormations, saveFormation, deleteFormation };
};

export default useSavedFormations;
