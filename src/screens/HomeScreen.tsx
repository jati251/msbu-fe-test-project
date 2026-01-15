import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';
import { PostCard } from '../components/PostCard';

export const HomeScreen = ({ navigation }: any) => {
  const { userEmail, logout } = useAuthStore();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);

  const fetchPosts = async () => {
    try {
      setError(false);
      const res = await axios.get(
        'https://jsonplaceholder.typicode.com/posts?_limit=10',
      );
      setPosts(res.data);
    } catch (e) {
      setError(true);
      console.error(e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.email}>{userEmail}</Text>
        <Text onPress={logout} style={{ color: 'red' }}>
          Logout
        </Text>
      </View>

      {error ? (
        <Text style={styles.errorText}>
          Gagal ambil data, swipe down buat coba lagi.
        </Text>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item: any) => item.id.toString()}
          renderItem={({ item }) => (
            <PostCard
              item={item}
              onPress={() => navigation.navigate('Detail', { item })}
            />
          )}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                fetchPosts();
              }}
            />
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f8f9fa' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  email: { fontWeight: 'bold', color: '#555' },
  errorText: { textAlign: 'center', marginTop: 50, color: 'red' },
});
