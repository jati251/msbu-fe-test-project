import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

export const PostCard = ({ item, onPress, isDetail = false }: any) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDetail}
      style={[styles.card, isDetail && styles.detailCard]}
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.body} numberOfLines={isDetail ? undefined : 2}>
        {item.body}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },
  detailCard: {
    elevation: 0,
    borderBottomWidth: 1,
    borderColor: '#eee',
    borderRadius: 0,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textTransform: 'capitalize',
  },
  body: { fontSize: 14, color: '#666', marginTop: 8, lineHeight: 20 },
});
