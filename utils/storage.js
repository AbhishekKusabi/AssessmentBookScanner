import AsyncStorage from '@react-native-async-storage/async-storage';

const MARKS_STORAGE_KEY = '@assessment_marks';

export const saveMarks = async (marksData) => {
  try {
    // Get existing marks
    const existingMarksString = await AsyncStorage.getItem(MARKS_STORAGE_KEY);
    const existingMarks = existingMarksString ? JSON.parse(existingMarksString) : [];
    
    // Add new marks to the beginning of the array
    const updatedMarks = [marksData, ...existingMarks];
    
    // Save back to storage
    await AsyncStorage.setItem(MARKS_STORAGE_KEY, JSON.stringify(updatedMarks));
    return true;
  } catch (error) {
    console.error('Error saving marks:', error);
    return false;
  }
};

export const getAllMarks = async () => {
  try {
    const marksString = await AsyncStorage.getItem(MARKS_STORAGE_KEY);
    return marksString ? JSON.parse(marksString) : [];
  } catch (error) {
    console.error('Error getting marks:', error);
    return [];
  }
};

export const clearAllMarks = async () => {
  try {
    await AsyncStorage.removeItem(MARKS_STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing marks:', error);
    return false;
  }
}; 