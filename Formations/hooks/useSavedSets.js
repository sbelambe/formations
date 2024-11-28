import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useSavedSets = () => {
  const [savedSets, setSavedSets] = useState([]);

  const loadSets = async () => {
    try {
      const savedSetsData = await AsyncStorage.getItem("savedSets");
      if (savedSetsData) {
        setSavedSets(JSON.parse(savedSetsData));
      } else {
        setSavedSets([]);
      }
    } catch (error) {
      console.error("Failed to load saved sets:", error);
    }
  };

  const saveSet = async (newSet) => {
    try {
      const updatedSets = [...savedSets, newSet];
      setSavedSets(updatedSets);

      await AsyncStorage.setItem("savedSets", JSON.stringify(updatedSets));
    } catch (error) {
      console.error("Failed to save set:", error);
    }
  };

  const deleteSet = async (setId) => {
    try {
      const updatedSets = savedSets.filter((set) => set.id !== setId); 
      setSavedSets(updatedSets);

      await AsyncStorage.setItem("savedSets", JSON.stringify(updatedSets));
    } catch (error) {
      console.error("Failed to delete set:", error);
    }
  };

  useEffect(() => {
    loadSets();
  }, []);

  return { savedSets, loadSets, saveSet, deleteSet };
};

export default useSavedSets;
