import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Button, Text, Card, RadioButton } from 'react-native-paper';

export default function ClassSelectionScreen({ navigation }) {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');

  const classes = ['1st sem', '2nd sem', '3rd sem', '4th sem', '5th sem', '6th sem', '7th sem', '8th sem'];
  const sections = ['A', 'B'];

  const handleContinue = () => {
    if (!selectedClass || !selectedSection) {
      alert('Please select both class and section');
      return;
    }
    console.log(`Selected: Class ${selectedClass} Section ${selectedSection}`);
    navigation.navigate('Scanner', {
      selectedClass,
      selectedSection
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Select Class and Section
      </Text>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.cardTitle}>Class</Text>
          <RadioButton.Group 
            onValueChange={value => setSelectedClass(value)} 
            value={selectedClass}
          >
            <View style={styles.optionsContainer}>
              {classes.map((classNum) => (
                <View key={classNum} style={styles.radioItem}>
                  <RadioButton.Item
                    label={classNum}
                    value={classNum}
                    position="leading"
                  />
                </View>
              ))}
            </View>
          </RadioButton.Group>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.cardTitle}>Section</Text>
          <RadioButton.Group 
            onValueChange={value => setSelectedSection(value)} 
            value={selectedSection}
          >
            <View style={styles.optionsContainer}>
              {sections.map((section) => (
                <View key={section} style={styles.radioItem}>
                  <RadioButton.Item
                    label={section}
                    value={section}
                    position="leading"
                  />
                </View>
              ))}
            </View>
          </RadioButton.Group>
        </Card.Content>
      </Card>

      <Button
        mode="contained"
        onPress={handleContinue}
        style={styles.button}
        disabled={!selectedClass || !selectedSection}
      >
        Continue
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    marginBottom: 20,
  },
  cardTitle: {
    marginBottom: 10,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  radioItem: {
    width: '50%',
  },
  button: {
    marginVertical: 20,
  },
}); 