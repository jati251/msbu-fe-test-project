import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PostCard } from '../components/PostCard';

export const DetailScreen = ({ route }: any) => {
  const { item } = route.params;

  if (!item) return <Text>Data Empty</Text>;

  return (
    <View style={styles.container}>
      <PostCard item={item} isDetail={true} />

      <View style={styles.detailBody}>
        <Text style={styles.info}>Detail Content:</Text>
        <Text style={styles.text}>
          {item.body} {item.body}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  detailBody: { padding: 16 },
  info: { fontSize: 12, color: '#aaa', marginBottom: 8 },
  text: { fontSize: 16, color: '#333', lineHeight: 24 },
});
