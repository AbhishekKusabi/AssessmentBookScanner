import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ClassSelectionScreen from './screens/ClassSelectionScreen';
import ScannerScreen from './screens/ScannerScreen';
import MarksEntryScreen from './screens/MarksEntryScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="Login" 
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Home" 
            component={HomeScreen}
            options={{ 
              title: 'Assessment Scanner',
              headerBackVisible: false 
            }}
          />
          <Stack.Screen 
            name="ClassSelection" 
            component={ClassSelectionScreen}
            options={{ title: 'Select Class' }}
          />
          <Stack.Screen 
            name="Scanner" 
            component={ScannerScreen}
            options={({ route }) => ({ 
              title: `Scanning ${route.params?.selectedClass || ''} ${route.params?.selectedSection || ''}`,
              headerBackTitle: 'Back'
            })}
          />
          <Stack.Screen 
            name="MarksEntry" 
            component={MarksEntryScreen}
            options={{ title: 'Enter Marks' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
