import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import * as SQLite from 'expo-sqlite';

// Open (or create) the local database
const db = SQLite.openDatabase('bookmarks.db');

const JobDetailScreen = ({ route, navigation }) => {
  const { job } = route.params;  // job object passed from JobsScreen

  const handleBookmark = () => {
    // Save job to SQLite database
    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS bookmarks (id INTEGER PRIMARY KEY, title TEXT, location TEXT, salary TEXT, phone TEXT);`
      );
    });
    db.transaction(tx => {
      tx.executeSql(
        `INSERT OR REPLACE INTO bookmarks (id, title, location, salary, phone) VALUES (?, ?, ?, ?, ?);`,
        [job.id, job.title, job.location, job.salary, job.phone],
        () => {
          console.log('Job bookmarked');
          alert('Job bookmarked!');  // simple feedback
        },
        error => {
          console.error('Error bookmarking job:', error);
        }
      );
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{job.title}</Text>
      <Text style={styles.detail}>Location: {job.location}</Text>
      <Text style={styles.detail}>Salary: {job.salary}</Text>
      <Text style={styles.detail}>Phone: {job.phone}</Text>
      {/* Additional info, if available */}
      {job.description && <Text style={styles.detail}>Description: {job.description}</Text>}

      <Button title="Bookmark this Job" onPress={handleBookmark} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  detail: { fontSize: 16, marginBottom: 4 }
});

export default JobDetailScreen;
