import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';

const JobsScreen = ({ navigation }) => {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [allLoaded, setAllLoaded] = useState(false);  // flag to indicate no more data

  useEffect(() => {
    fetchJobs(page);
  }, [page]);

  const fetchJobs = async (pageNum) => {
    if (loading || allLoaded) return; // prevent multiple calls or if no more data
    setLoading(true);
    try {
      const response = await fetch(`https://testapi.getlokalapp.com/common/jobs?page=${pageNum}`);
      const data = await response.json();
      const newJobs = data?.jobs || data;  // assuming API returns an object with 'jobs' array
      if (newJobs.length > 0) {
        setJobs(prev => [...prev, ...newJobs]);  // append new jobs to list
      } else {
        // If no jobs returned, we've reached the end
        setAllLoaded(true);
      }
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (!loading && !allLoaded) {
      setPage(prev => prev + 1);  // trigger useEffect to fetch next page
    }
  };

  const renderJob = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('JobDetail', { job: item })}>
      <Text style={styles.jobTitle}>{item.title}</Text>
      <Text>{item.location}</Text>
      <Text>{item.salary}</Text>
      <Text>{item.phone}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {error && <Text style={styles.errorText}>Failed to load jobs. Please try again.</Text>}
      {jobs.length === 0 && !loading ? (
        <Text style={styles.emptyText}>No jobs available.</Text>
      ) : (
        <FlatList
          data={jobs}
          keyExtractor={(item, index) => item.id?.toString() || index.toString()}
          renderItem={renderJob}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loading ? <ActivityIndicator style={{ margin: 16 }} /> : 
            allLoaded ? <Text style={styles.footerText}>~ End of Results ~</Text> : null
          }
        />
      )}
    </View>
  );
};

const styles = {
  container: { flex: 1, padding: 16 },
  card: { padding: 12, marginBottom: 8, backgroundColor: '#fff', borderRadius: 4,
          elevation: 1 /* Android shadow */, shadowOpacity: 0.1 /* iOS shadow */ },
  jobTitle: { fontSize: 16, fontWeight: 'bold' },
  errorText: { color: 'red', margin: 16 },
  emptyText: { textAlign: 'center', marginTop: 20, fontStyle: 'italic' },
  footerText: { textAlign: 'center', color: '#555', padding: 8 }
};

export default JobsScreen;
