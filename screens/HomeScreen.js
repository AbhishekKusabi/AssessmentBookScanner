import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Button, Text, Card, List } from 'react-native-paper';
import { getAllMarks } from '../utils/storage';

export default function HomeScreen({ navigation }) {
  const [recentMarks, setRecentMarks] = useState([]);

  useEffect(() => {
    loadRecentMarks();
  }, []);

  const loadRecentMarks = async () => {
    const marks = await getAllMarks();
    setRecentMarks(marks.slice(0, 5)); // Show only last 5 entries
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadRecentMarks();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.cardTitle}>
            Quick Actions
          </Text>
        </Card.Content>
        <Card.Actions>
          <Button 
            mode="contained" 
            onPress={() => navigation.navigate('ClassSelection')}
            style={styles.actionButton}
          >
            New Scan
          </Button>
          <Button 
            mode="outlined" 
            onPress={() => console.log('View history')}
            style={styles.actionButton}
          >
            History
          </Button>
        </Card.Actions>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.cardTitle}>
            Recent Scans
          </Text>
          {recentMarks.length > 0 ? (
            recentMarks.map((mark) => (
              <List.Item
                key={mark.id}
                title={`${mark.studentDetails.name} (${mark.studentDetails.usn})`}
                description={`Class ${mark.class} ${mark.section} - Total: ${mark.marks.total}`}
                left={props => <List.Icon {...props} icon="file-document" />}
                onPress={() => {
                  console.log('View details:', mark);
                }}
              />
            ))
          ) : (
            <Text variant="bodyMedium">No recent scans available</Text>
          )}
        </Card.Content>
      </Card>

      <View style={styles.buttonContainer}>
        <Button 
          mode="outlined"
          onPress={() => navigation.replace('Login')}
          style={styles.logoutButton}
          textColor="red"
        >
          Logout
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
    marginBottom: 10,
  },
  actionButton: {
    flex: 1,
    margin: 4,
  },
  buttonContainer: {
    marginTop: 10,
  },
  logoutButton: {
    borderColor: 'red',
  },
}); 