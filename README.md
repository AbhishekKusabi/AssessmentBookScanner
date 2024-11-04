# Assessment Book Scanner

A React Native mobile application designed to streamline the process of recording and managing student assessment marks.

## Features

- **Secure Authentication**
  - Email/Password login system
  - Session management

- **Class Management**
  - Easy class and section selection
  - Organized data structure by class/section

- **Assessment Scanning**
  - Camera integration for scanning assessment books
  - Image capture and preview
  - Manual marks entry system

- **Marks Management**
  - Section-wise marks entry (A, B, C)
  - Automatic total calculation
  - Maximum marks validation
    - Section A: 5 marks
    - Section B: 10 marks
    - Section C: 10 marks
  - Total marks calculation (Max 25)

- **Recent Scans**
  - Quick access to recent entries
  - Basic details display
  - Assessment history tracking

## Technical Stack

- **Framework**: React Native with Expo
- **UI Components**: React Native Paper
- **Navigation**: React Navigation
- **Camera**: Expo Camera & Image Picker
- **Storage**: AsyncStorage
- **State Management**: React Hooks
