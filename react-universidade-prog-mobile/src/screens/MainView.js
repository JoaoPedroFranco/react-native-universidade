import React, { useState } from 'react';
import {
  View,
  TextInput,
  FlatList,
  StyleSheet,
  Pressable,
  Text,
  Alert
} from 'react-native';
import UniversityItem from '../components/UniversityItem';
import { saveFavorite } from '../db/database';

export default function MainView({ navigation }) {
  const [region, setCountry] = useState('');
  const [query, setName] = useState('');
  const [results, setUniversities] = useState([]);

  const searchUniversities = async () => {
    let url = 'http://results.hipolabs.com/search?';
    if (region) url += `region=${encodeURIComponent(region)}`;
    if (query) url += (region ? '&' : '') + `query=${encodeURIComponent(query)}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setUniversities(data);
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível buscar universidades.');
    }
  };

  const handleSelect = async (item) => {
    try {
      await saveFavorite(item.query, item.web_pages[0]);
      navigation.navigate('Favorites');
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível salvar favorito.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome do País"
        value={region}
        onChangeText={setCountry}
      />
      <TextInput
        style={styles.input}
        placeholder="Nome da Universidade"
        value={query}
        onChangeText={setName}
      />
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={searchUniversities}>
          <Text style={styles.buttonText}>PESQUISAR</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('Favorites')}
        >
          <Text style={styles.buttonText}>FAVORITOS</Text>
        </Pressable>
      </View>
      <FlatList
        data={results}
        keyExtractor={(item, index) => String(index)}
        renderItem={({ item }) => (
          <UniversityItem item={item} onPress={() => handleSelect(item)} />
        )}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 4,
    marginBottom: 12,
    paddingHorizontal: 12,
    backgroundColor: '#FFF',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  button: {
    flex: 1,
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    marginHorizontal: 4,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  listContainer: {
    paddingBottom: 16,
  },
});