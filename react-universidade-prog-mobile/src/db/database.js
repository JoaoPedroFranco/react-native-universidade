import * as SQLite from 'expo-sqlite';

// Abre (ou cria) o banco
const db = SQLite.openDatabase('universities.db');

// Função para inicializar a tabela de favoritos
export const initializeStorage = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS favorites (
         id INTEGER PRIMARY KEY AUTOINCREMENT,
         name TEXT NOT NULL,
         url  TEXT NOT NULL
       );`,
      [],
      () => { console.log('Tabela favorites OK'); },
      (_, error) => { console.log('Erro ao criar tabela', error); }
    );
  });
};

// Insere um favorito
export const saveFavorite = (name, url) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO favorites (name, url) VALUES (?, ?);`,
        [name, url],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });
};

// Busca todos os favoritos
export const loadSavedItems = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM favorites;`,
        [],
        (_, { rows }) => resolve(rows._array),
        (_, error) => reject(error)
      );
    });
  });
};

// Remove um favorito pelo id
export const removeSavedItem = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `DELETE FROM favorites WHERE id = ?;`,
        [id],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });
};