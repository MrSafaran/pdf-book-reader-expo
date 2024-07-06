import AsyncStorage from '@react-native-async-storage/async-storage';

const USERS_KEY = 'USERS';
const FILES_KEY = 'FILES';

const defaultFiles = [
  { id: 1, name: 'Book 1', url: 'https://quera.org/assignment/65652/get_pdf_file' },
  { id: 2, name: 'Book 2', url: 'https://quera.org/assignment/66950/get_pdf_file' },
  { id: 3, name: 'Book 3', url: 'https://quera.org/assignment/66970/get_pdf_file' },
  { id: 4, name: 'Book 4', url: 'https://quera.org/assignment/67735/get_pdf_file' },
  { id: 5, name: 'Book 5', url: 'https://quera.org/assignment/67735/get_pdf_file' },
];

const initializeFiles = async () => {
  const files = JSON.parse(await AsyncStorage.getItem(FILES_KEY));
  if (!files || files.length === 0) {
    await AsyncStorage.setItem(FILES_KEY, JSON.stringify(defaultFiles));
  }
};

export const addUser = async (name, lastName, nationalCode, role) => {
  const users = JSON.parse(await AsyncStorage.getItem(USERS_KEY)) || [];
  users.push({ id: users.length + 1, name, lastName, nationalCode, role });
  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const validateUser = async (nationalCode) => {
  const users = JSON.parse(await AsyncStorage.getItem(USERS_KEY)) || [];
  return users.find(user => user.nationalCode === nationalCode);
};

export const addFile = async (name, url) => {
  const files = JSON.parse(await AsyncStorage.getItem(FILES_KEY)) || [];
  files.push({ id: files.length + 1, name, url });
  await AsyncStorage.setItem(FILES_KEY, JSON.stringify(files));
};

export const getFiles = async () => {
  return JSON.parse(await AsyncStorage.getItem(FILES_KEY)) || [];
};

initializeFiles();
