import React from 'react';
import { View, Text, StyleSheet, LogBox } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';


LogBox.ignoreLogs([
  'Setting a timer',
  'AsyncStorage has been extracted from react-native core',
]);

export default function App() {
  try {
    return <AppNavigator />;
  } catch (error) {
    console.error("❌ App crashed:", error);
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Something went wrong 🚨</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    padding: 16,
  },
});
