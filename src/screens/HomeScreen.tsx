import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import axios from 'axios';
import { Theme } from '../styles/theme';
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
        'https://jsonplaceholder.typicode.com/posts?_limit=15',
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

  if (loading && !refreshing) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={Theme.colors.primary} />
        <Text style={styles.loadingText}>Fetching ...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Welcome back,</Text>
          <Text style={styles.emailText}>{userEmail}</Text>
        </View>
        <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {error ? (
        <View style={styles.center}>
          <Text style={styles.errorText}>Failed to get some data.</Text>
          <TouchableOpacity style={styles.retryBtn} onPress={fetchPosts}>
            <Text style={styles.retryText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={posts}
          contentContainerStyle={styles.listPadding}
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
              colors={[Theme.colors.primary]}
              tintColor={Theme.colors.primary}
              onRefresh={() => {
                setRefreshing(true);
                fetchPosts();
              }}
            />
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Theme.spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.md,
    backgroundColor: Theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border,
  },
  welcomeText: {
    fontSize: 12,
    color: Theme.colors.textLight,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  emailText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Theme.colors.primary,
  },
  logoutBtn: {
    paddingVertical: Theme.spacing.xs,
    paddingHorizontal: Theme.spacing.md,
    borderRadius: Theme.radius.sm,
    backgroundColor: Theme.colors.error + '15',
  },
  logoutText: {
    color: Theme.colors.error,
    fontWeight: 'bold',
    fontSize: 12,
  },
  listPadding: {
    padding: Theme.spacing.md,
    paddingBottom: Theme.spacing.xl,
  },
  loadingText: {
    marginTop: Theme.spacing.sm,
    color: Theme.colors.textLight,
    fontWeight: '500',
  },
  errorText: {
    textAlign: 'center',
    color: Theme.colors.error,
    fontWeight: '600',
    marginBottom: Theme.spacing.md,
  },
  retryBtn: {
    backgroundColor: Theme.colors.primary,
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.radius.md,
  },
  retryText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
