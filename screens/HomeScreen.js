import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, FlatList, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import { getFiles, addFile } from '../Database';

export default function HomeScreen({ route }) {
  const { user } = route.params;
  const [fileUrl, setFileUrl] = useState('');
  const [fileName, setFileName] = useState('');
  const [files, setFiles] = useState([]);

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

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome, {user.name}</Text>
      {user.role === 'admin' && (
        <View style={styles.addFileContainer}>
          <Text style={styles.addFileText}>Add a new PDF file</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter file name"
            value={fileName}
            onChangeText={setFileName}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter file URL"
            value={fileUrl}
            onChangeText={setFileUrl}
          />
          <Button title="Add File" onPress={handleAddFile} />
        </View>
      )}
      <Text style={styles.availableFilesText}>Available Files</Text>
      <FlatList
        data={files}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.fileItem}
            onPress={() => Linking.openURL(item.url)}
          >
            <Text style={styles.fileText}>{item.name}</Text>
            <Text style={styles.fileNumber}>Item {item.id}</Text>
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
  },
  availableFilesText: {
    fontSize: 18,
    marginBottom: 8,
  },
  fileItem: {
    padding: 10,
    borderWidth: 1,
    marginBottom: 8,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fileText: {
    fontSize: 16,
  },
  fileNumber: {
    fontSize: 16,
    color: '#007BFF',
  },
});
