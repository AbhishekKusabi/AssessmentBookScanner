import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Image, Alert } from 'react-native';
import { Button, Text, TextInput, Card } from 'react-native-paper';
import { saveMarks } from '../utils/storage';

export default function MarksEntryScreen({ route, navigation }) {
  const { imageUri, selectedClass, selectedSection } = route.params;
  const [studentDetails, setStudentDetails] = useState({
    usn: '',
    name: '',
  });

  const [marks, setMarks] = useState({
    sectionA: {
      marks: '',
    },
    sectionB: {
      marks: '',
    },
    sectionC: {
      marks: '',
    },
    total: '0',
  });

  // Use useEffect to calculate total whenever marks change
  useEffect(() => {
    const sectionAMarks = Number(marks.sectionA.marks) || 0;
    const sectionBMarks = Number(marks.sectionB.marks) || 0;
    const sectionCMarks = Number(marks.sectionC.marks) || 0;
    const totalMarks = sectionAMarks + sectionBMarks + sectionCMarks;
    
    setMarks(prev => ({
      ...prev,
      total: totalMarks.toString()
    }));
  }, [marks.sectionA.marks, marks.sectionB.marks, marks.sectionC.marks]);

  const validateAndUpdateMarks = (section, value) => {
    // Remove any non-numeric characters
    const numericValue = value.replace(/[^0-9]/g, '');
    
    let maxMarks;
    switch (section) {
      case 'sectionA':
        maxMarks = 5;
        break;
      case 'sectionB':
      case 'sectionC':
        maxMarks = 10;
        break;
      default:
        maxMarks = 0;
    }

    // Ensure value is within range
    const numValue = Math.min(Number(numericValue) || 0, maxMarks);

    setMarks(prev => ({
      ...prev,
      [section]: {
        marks: numValue.toString()
      }
    }));
  };

  const handleSubmit = async () => {
    // Validate required fields
    if (!studentDetails.usn || !studentDetails.name) {
      Alert.alert('Error', 'Please enter student USN and name');
      return;
    }

    // Validate marks
    if (!marks.sectionA.marks && !marks.sectionB.marks && !marks.sectionC.marks) {
      Alert.alert('Error', 'Please enter marks for at least one section');
      return;
    }

    const data = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      class: selectedClass,
      section: selectedSection,
      studentDetails,
      marks,
      imageUri,
    };

    const success = await saveMarks(data);
    if (success) {
      Alert.alert(
        'Success',
        'Marks saved successfully!',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Home')
          }
        ]
      );
    } else {
      Alert.alert('Error', 'Failed to save marks');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.cardTitle}>
            Student Details
          </Text>
          <TextInput
            label="USN Number"
            value={studentDetails.usn}
            onChangeText={(text) => setStudentDetails(prev => ({ ...prev, usn: text }))}
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Student Name"
            value={studentDetails.name}
            onChangeText={(text) => setStudentDetails(prev => ({ ...prev, name: text }))}
            mode="outlined"
            style={styles.input}
          />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.cardTitle}>Marks Summary</Text>
          
          <TextInput
            label="Section A (Max 5)"
            value={marks.sectionA.marks}
            onChangeText={(text) => validateAndUpdateMarks('sectionA', text)}
            mode="outlined"
            keyboardType="numeric"
            style={styles.input}
            maxLength={1}
          />

          <TextInput
            label="Section B (Max 10)"
            value={marks.sectionB.marks}
            onChangeText={(text) => validateAndUpdateMarks('sectionB', text)}
            mode="outlined"
            keyboardType="numeric"
            style={styles.input}
            maxLength={2}
          />

          <TextInput
            label="Section C (Max 10)"
            value={marks.sectionC.marks}
            onChangeText={(text) => validateAndUpdateMarks('sectionC', text)}
            mode="outlined"
            keyboardType="numeric"
            style={styles.input}
            maxLength={2}
          />

          <TextInput
            label="Total Marks (Max 25)"
            value={marks.total}
            editable={false}
            mode="outlined"
            style={styles.totalInput}
          />
        </Card.Content>
      </Card>

      <View style={styles.buttonContainer}>
        <Button 
          mode="contained" 
          onPress={handleSubmit}
          style={styles.button}
        >
          Save Marks
        </Button>
        <Button 
          mode="outlined" 
          onPress={() => navigation.goBack()}
          style={[styles.button, styles.cancelButton]}
        >
          Retake Photo
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  card: {
    marginBottom: 20,
  },
  cardTitle: {
    marginBottom: 15,
  },
  input: {
    marginBottom: 10,
  },
  totalInput: {
    marginTop: 10,
    backgroundColor: '#f0f0f0',
  },
  buttonContainer: {
    marginVertical: 10,
  },
  button: {
    marginVertical: 5,
    padding: 5,
  },
  cancelButton: {
    borderColor: '#666',
  },
}); 