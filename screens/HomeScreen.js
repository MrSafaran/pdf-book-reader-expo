import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, FlatList, TouchableOpacity, Linking, StyleSheet, Switch } from 'react-native';
import { getFiles, addFile } from '../Database';

export default function HomeScreen({ route }) {
  const { user } = route.params;
  const [fileUrl, setFileUrl] = useState('');
  const [fileName, setFileName] = useState('');
  const [files, setFiles] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = async () => {
    const fetchedFiles = await getFiles();
    setFiles(fetchedFiles);
  };

  const handleAddFile = async () => {
    if (!fileUrl || !fileName) {
      Alert.alert('Validation Error', 'File name and URL are required');
      return;
    }

    try {
      await addFile(fileName, fileUrl);
      setFileUrl('');
      setFileName('');
      loadFiles();
      Alert.alert('Success', 'File added successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to add file');
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <View style={styles.switchContainer}>
        <Text style={[styles.switchText, isDarkMode && styles.darkText]}>Dark Mode</Text>
        <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
      </View>
      <Text style={[styles.header, isDarkMode && styles.darkText]}>Welcome, {user.name}</Text>
      {user.role === 'admin' && (
        <View style={styles.addFileContainer}>
          <Text style={[styles.addFileText, isDarkMode && styles.darkText]}>Add a new PDF file</Text>
          <TextInput
            style={[styles.input, isDarkMode && styles.darkInput]}
            placeholder="Enter file name"
            value={fileName}
            onChangeText={setFileName}
          />
          <TextInput
            style={[styles.input, isDarkMode && styles.darkInput]}
            placeholder="Enter file URL"
            value={fileUrl}
            onChangeText={setFileUrl}
          />
          <Button title="Add File" onPress={handleAddFile} />
        </View>
      )}
      <Text style={[styles.availableFilesText, isDarkMode && styles.darkText]}>Available Files</Text>
      <FlatList
        data={files}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.fileItem, isDarkMode && styles.darkFileItem]}
            onPress={() => Linking.openURL(item.url)}
          >
            <Text style={[styles.fileText, isDarkMode && styles.darkText]}>{item.name}</Text>
            <Text style={[styles.fileNumber, isDarkMode && styles.darkText]}>Item {item.id}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  darkContainer: {
    backgroundColor: '#333',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  switchText: {
    fontSize: 18,
  },
  darkText: {
    color: '#fff',
  },
  header: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  addFileContainer: {
    marginBottom: 16,
  },
  addFileText: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    width: '100%',
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  darkInput: {
    backgroundColor: '#555',
    color: '#fff',
  },
  availableFilesText: {
    fontSize: 18,
    marginBottom: 8,
    fontWeight:'500',
  },
  fileItem: {
    padding: 10,
    borderWidth: 1,
    marginBottom: 8,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  darkFileItem: {
    backgroundColor: '#444',
    borderColor: '#555',
  },
  fileText: {
    fontSize: 18,
  },
  fileNumber: {
    fontSize: 16,
    color: 'black',
  },
});
