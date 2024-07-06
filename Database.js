import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('mydb.db');


export const initDatabase = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        lastName TEXT,
        nationalCode TEXT,
        role TEXT,
        UNIQUE(nationalCode)
      );`
    );
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS files (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        fileName TEXT,
        filePath TEXT
      );`
    );
  });
};

export const addUser = (name, lastName, nationalCode, role, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO users (name, lastName, nationalCode, role) VALUES (?, ?, ?, ?)',
      [name, lastName, nationalCode, role],
      (_, result) => callback(result),
      (_, error) => console.log('Error adding user:', error)
    );
  });
};

export const addFileToDB = (fileName, filePath, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO files (fileName, filePath) VALUES (?, ?)',
      [fileName, filePath],
      (_, result) => callback(result),
      (_, error) => console.log('Error adding file:', error)
    );
  });
};

export const fetchFiles = (callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM files',
      [],
      (_, { rows: { _array } }) => callback(_array),
      (_, error) => console.log('Error fetching files:', error)
    );
  });
};

export const validateUser = (nationalCode, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM users WHERE nationalCode = ?',
      [nationalCode],
      (_, { rows: { _array } }) => {
        if (_array.length > 0) {
          callback(_array[0]);
        } else {
          callback(null);
        }
      },
      (_, error) => console.log('Error validating user:', error)
    );
  });
};
