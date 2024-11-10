import React, { useState } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Button, Card, IconButton } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';

const SCAN_REGIONS = {
  usn: {
    label: 'USN',
    top: '15%',
    left: '10%',
    width: '80%',
    height: '10%'
  },
  ia1Total: {
    label: 'IA1 Total',
    top: '50%',
    left: '70%',
    width: '15%',
    height: '5%'
  },
  ia2Total: {
    label: 'IA2 Total',
    top: '75%',
    left: '70%',
    width: '15%',
    height: '5%'
  }
};

// Add scanning guides to the camera view
const CameraOverlay = () => (
  <View style={styles.overlay}>
    {Object.values(SCAN_REGIONS).map(region => (
      <View
        key={region.label}
        style={[
          styles.scanRegion,
          {
            top: region.top,
            left: region.left,
            width: region.width,
            height: region.height
          }
        ]}
      >
        <Text style={styles.scanLabel}>{region.label}</Text>
      </View>
    ))}
  </View>
);

export default function ScannerScreen({ route, navigation }) {
  const { selectedClass, selectedSection } = route.params || {};
  const [image, setImage] = useState(null);

  const takePicture = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera permissions to make this work!');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
        navigation.navigate('MarksEntry', {
          imageUri: result.assets[0].uri,
          selectedClass,
          selectedSection,
        });
      }
    } catch (error) {
      console.error('Error taking picture:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.infoCard}>
        <Card.Content>
          <Text style={styles.infoTitle}>Scanning Instructions:</Text>
          <View style={styles.infoItem}>
            <IconButton icon="check-circle" size={20} iconColor="#4CAF50" />
            <Text style={styles.infoText}>Ensure good lighting</Text>
          </View>
          <View style={styles.infoItem}>
            <IconButton icon="check-circle" size={20} iconColor="#4CAF50" />
            <Text style={styles.infoText}>Keep the paper flat</Text>
          </View>
          <View style={styles.infoItem}>
            <IconButton icon="check-circle" size={20} iconColor="#4CAF50" />
            <Text style={styles.infoText}>Align within frame</Text>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.detailsCard}>
        <Card.Content>
          <Text style={styles.detailsTitle}>Current Selection:</Text>
          <Text style={styles.details}>Class: {selectedClass}</Text>
          <Text style={styles.details}>Section: {selectedSection}</Text>
        </Card.Content>
      </Card>

      {image ? (
        <View style={styles.previewContainer}>
          <Text style={styles.previewText}>Preview:</Text>
          <Image source={{ uri: image }} style={styles.preview} />
        </View>
      ) : (
        <View style={styles.placeholderContainer}>
          <IconButton
            icon="camera"
            size={50}
            iconColor="#666"
            onPress={takePicture}
          />
          <Text style={styles.placeholderText}>
            Tap the camera icon or button below to start scanning
          </Text>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <Button 
          mode="contained"
          onPress={takePicture}
          style={styles.button}
          icon="camera"
        >
          {image ? 'Retake Picture' : 'Take Picture'}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  infoCard: {
    marginBottom: 16,
    backgroundColor: '#ffffff',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000000',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  infoText: {
    color: '#333333',
  },
  detailsCard: {
    marginBottom: 16,
    backgroundColor: '#ffffff',
  },
  detailsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000000',
  },
  details: {
    fontSize: 16,
    marginVertical: 2,
    color: '#333333',
  },
  previewContainer: {
    flex: 1,
    marginVertical: 16,
  },
  previewText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000000',
  },
  preview: {
    flex: 1,
    width: '100%',
    borderRadius: 8,
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    margin: 16,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderStyle: 'dashed',
  },
  placeholderText: {
    textAlign: 'center',
    marginTop: 16,
    padding: 16,
    color: '#666666',
  },
  buttonContainer: {
    padding: 16,
  },
  button: {
    padding: 5,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scanRegion: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: '#4CAF50',
    borderStyle: 'dashed',
  },
  scanLabel: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    textAlign: 'center',
    color: '#4CAF50',
  },
}); 