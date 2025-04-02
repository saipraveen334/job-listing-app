import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

// Import screen components
import JobsScreen from '../screens/JobsScreen';
import JobDetailScreen from '../screens/JobDetailScreen';
import BookmarksScreen from '../screens/BookmarksScreen';

// Create navigators
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack navigator for Jobs tab
function JobsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="JobsList" component={JobsScreen} options={{ title: 'Jobs' }} />
      <Stack.Screen name="JobDetail" component={JobDetailScreen} options={{ title: 'Job Details' }} />
    </Stack.Navigator>
  );
}

// Main app navigator
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Jobs" component={JobsStack} options={{ headerShown: false }} />
        <Tab.Screen name="Bookmarks" component={BookmarksScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
