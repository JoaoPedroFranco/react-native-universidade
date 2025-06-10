import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Pressable,
  Alert
} from 'react-native';
import { loadSavedItems, removeSavedItem } from '../db/database';

export default function SavedListScreen() {
  const [savedItems, setFavorites] = useState([]);

  const loadFavorites = async () => {
    try {
      const items = await loadSavedItems();
      setFavorites(items);
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível carregar favoritos.');
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const handleDelete = async (id) => {
    try {
      await removeSavedItem(id);
      loadFavorites();
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível remover favorito.');
    }
  };

  const renderItem = ({ item }) => (
    <Pressable onPress={() => handleDelete(item.id)}>
      <View style={styles.item}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.url}>{item.url}</Text>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={savedItems}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum favorito</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F5F5F5' },
  listContainer: { paddingBottom: 16 },
  item: {
    marginVertical: 4,
    padding: 12,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 4,
  },
  name: { fontSize: 16, fontWeight: 'bold' },
  url: { fontSize: 14, color: '#555', marginTop: 4 },
  emptyText: { textAlign: 'center', marginTop: 20, color: '#555' },
});