import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

export default function InstitutionTile({ item, onPress }) {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.item}>
        <Text style={styles.name}>{item.name}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    marginVertical: 4,
    padding: 12,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 4,
  },
  name: {
    fontSize: 16,
  },
});