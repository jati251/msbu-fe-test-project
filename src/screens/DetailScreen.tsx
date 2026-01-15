import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Theme } from '../styles/theme';
import { PostCard } from '../components/PostCard';

export const DetailScreen = ({ route, navigation }: any) => {
  const item = route?.params?.item;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (!item) {
    return (
      <View style={styles.center}>
        <Text style={[styles.textBody, { color: Theme.colors.error }]}>
          No data found
        </Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={Theme.colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <PostCard item={item} isDetail={true} />

        <View style={styles.detailBody}>
          <View style={styles.headerRow}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>ID: {item.id}</Text>
            </View>
          </View>

          <Text style={styles.infoLabel}>Content Description</Text>
          <Text style={styles.textBody}>
            {item.body}. {item.body}.
          </Text>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.actionButtonText}>Back to Feed</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Theme.colors.background },
  container: { flex: 1 },
  scrollContent: { paddingBottom: Theme.spacing.xl },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  detailBody: {
    padding: Theme.spacing.lg,
    backgroundColor: Theme.colors.surface,
    borderTopLeftRadius: Theme.radius.lg,
    borderTopRightRadius: Theme.radius.lg,
    marginTop: -Theme.spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.lg,
  },
  badge: {
    backgroundColor: Theme.colors.border,
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.radius.sm,
  },
  badgeText: { fontSize: 12, fontWeight: '700', color: Theme.colors.secondary },
  timestamp: { fontSize: 12, color: Theme.colors.textLight },
  infoLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: Theme.colors.textLight,
    marginBottom: Theme.spacing.sm,
    textTransform: 'uppercase',
  },
  textBody: {
    fontSize: 16,
    color: Theme.colors.text,
    lineHeight: 26,
  },
  actionButton: {
    marginTop: Theme.spacing.xl,
    backgroundColor: Theme.colors.primary,
    padding: Theme.spacing.md,
    borderRadius: Theme.radius.md,
    alignItems: 'center',
    shadowColor: Theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  actionButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
