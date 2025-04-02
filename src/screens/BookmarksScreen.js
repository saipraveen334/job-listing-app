import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('bookmarks.db');

const BookmarksScreen = ({ navigation }) => {
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);

  useEffect(() => {
    // Fetch all bookmarked jobs from the database when this screen mounts
    loadBookmarks();
    // Also, refetch whenever this screen comes into focus (in case new bookmarks were added)
    const unsubscribe = navigation.addListener('focus', loadBookmarks);
    return unsubscribe;
  }, [navigation]);

  const loadBookmarks = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM bookmarks;',
        [],
        (_, result) => {
          // result.rows._array contains the rows of the query result
          let rows = result.rows._array;
          setBookmarkedJobs(rows);
        },
        (error) => {
          console.error('Error loading bookmarks:', error);
        }
      );
    });
  };

  const renderBookmark = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('JobDetail', { job: item })}>
      <Text style={styles.jobTitle}>{item.title}</Text>
      <Text>{item.location}</Text>
      <Text>{item.salary}</Text>
      <Text>{item.phone}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {bookmarkedJobs.length === 0 ? (
        <Text style={styles.emptyText}>No bookmarks yet.</Text>
      ) : (
        <FlatList
          data={bookmarkedJobs}
          keyExtractor={(item, index) => item.id?.toString() || index.toString()}
          renderItem={renderBookmark}
        />
      )}
    </View>
  );
};

const styles = {
  container: { flex: 1, padding: 16 },
  card: { padding: 12, marginBottom: 8, backgroundColor: '#fff', borderRadius: 4,
          elevation: 1, shadowOpacity: 0.1 },
  jobTitle: { fontSize: 16, fontWeight: 'bold' },
  emptyText: { textAlign: 'center', marginTop: 20, fontStyle: 'italic' }
};

export default BookmarksScreen;
