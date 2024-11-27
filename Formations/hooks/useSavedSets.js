import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useSavedSets = () => {
  const [savedSets, setSavedSets] = useState([]);

  const loadSets = async () => {
    try {
      const savedSetsData = await AsyncStorage.getItem("savedSets");
      if (savedSetsData) {
        setSavedSets(JSON.parse(savedSetsData));
      }
    } catch (error) {
      console.error("Failed to load saved sets:", error);
    }
  };

  const saveSet = async (newSet) => {
    try {
      const savedSetsData = await AsyncStorage.getItem("savedSets");
      let updatedSets = savedSetsData ? JSON.parse(savedSetsData) : [];
      
      updatedSets.push(newSet);

      await AsyncStorage.setItem("savedSets", JSON.stringify(updatedSets));

    
      setSavedSets(updatedSets);
    } catch (error) {
      console.error("Failed to save set:", error);
    }
  };

  return { savedSets, loadSets, saveSet };
};

export default useSavedSets;
