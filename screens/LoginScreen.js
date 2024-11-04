import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('test@test.com');
  const [password, setPassword] = useState('password');
  const [isLoading, setIsLoading] = useState(false);

  // Auto-login for development
  useEffect(() => {
    // Comment out the next line when you want to disable auto-login
    navigation.replace('Home');
  }, []);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // For testing purposes, let's use a simple validation
    if (email === 'test@test.com' && password === 'password') {
      navigation.replace('Home');
    } else {
      Alert.alert('Error', 'Invalid credentials');
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Assessment Book Scanner
      </Text>
      
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        mode="outlined"
        style={styles.input}
        secureTextEntry
      />

      <Button 
        mode="contained" 
        onPress={handleLogin}
        style={styles.button}
      >
        Login
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    marginBottom: 30,
  },
  input: {
    width: '80%',
    marginBottom: 15,
  },
  button: {
    width: '80%',
    padding: 5,
    marginTop: 10,
  },
});