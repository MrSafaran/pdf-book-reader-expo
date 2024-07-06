import AsyncStorage from '@react-native-async-storage/async-storage';

// Helper function to get all users
const getAllUsers = async () => {
  const usersJson = await AsyncStorage.getItem('users');
  return usersJson ? JSON.parse(usersJson) : [];
};

// Helper function to save all users
const saveAllUsers = async (users) => {
  await AsyncStorage.setItem('users', JSON.stringify(users));
};

// Helper function to get all files
const getAllFiles = async () => {
  const filesJson = await AsyncStorage.getItem('files');
  return filesJson ? JSON.parse(filesJson) : [];
};

// Helper function to save all files
const saveAllFiles = async (files) => {
  await AsyncStorage.setItem('files', JSON.stringify(files));
};

// Initialize the database with default files
export const initDatabase = async () => {
  const defaultFiles = [
    { fileName: 'File 1', filePath: './assets/T1.pdf' },
    { fileName: 'File 2', filePath: './assets/T2.pdf' },
    { fileName: 'File 3', filePath: './assets/T3.pdf' },
    { fileName: 'File 4', filePath: './assets/T8.pdf' },
    { fileName: 'File 5', filePath: './assets/T9.pdf' },
  ];

  const files = await getAllFiles();
  if (files.length === 0) {
    await saveAllFiles(defaultFiles);
  }
};

export const addUser = async (name, lastName, nationalCode, role) => {
  const users = await getAllUsers();
  users.push({ name, lastName, nationalCode, role });
  await saveAllUsers(users);
};

export const addFileToDB = async (fileName, filePath) => {
  const files = await getAllFiles();
  files.push({ fileName, filePath });
  await saveAllFiles(files);
};

export const fetchFiles = async () => {
  return await getAllFiles();
};

export const validateUser = async (nationalCode) => {
  const users = await getAllUsers();
  return users.find(user => user.nationalCode === nationalCode) || null;
};
