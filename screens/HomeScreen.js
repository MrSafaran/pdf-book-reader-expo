import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';
import { fetchFiles, addFileToDB } from '../Database'; // Implement fetchFiles and addFileToDB in Database.js

const HomeScreen = ({ route }) => {
  const { user } = route.params;
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetchFiles(setFiles); // Fetch initial files from database
  }, []);

  const handleDownload = async (file) => {
    const fileUri = FileSystem.documentDirectory + file.fileName;
    const fileInfo = await FileSystem.getInfoAsync(fileUri);
    if (!fileInfo.exists) {
      FileSystem.downloadAsync(file.filePath, fileUri)
        .then(({ uri }) => {
          Alert.alert('File downloaded', `File downloaded to ${uri}`);
        })
        .catch(error => {
          console.error(error);
          Alert.alert('Error downloading file');
        });
    } else {
      Alert.alert('File already downloaded');
    }
  };

  const handleAddFile = async () => {
    if (user.role !== 'admin') {
      Alert.alert('Permission denied', 'Only admins can add files');
      return;
    }

    const result = await DocumentPicker.getDocumentAsync({ type: 'application/pdf' });
    if (result.type === 'success') {
      const filePath = result.uri;
      const fileName = result.name;
      addFileToDB(fileName, filePath, (result) => {
        if (result.rowsAffected > 0) {
          Alert.alert('File added successfully');
          fetchFiles(setFiles); // Refresh the file list
        } else {
          Alert.alert('Failed to add file');
        }
      });
    }
  };

  return (
    <View>
      <Text>Welcome, {user.name}</Text>
      <FlatList
        data={files}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.fileName}</Text>
            <Button title="Download" onPress={() => handleDownload(item)} />
          </View>
        )}
      />
      {user.role === 'admin' && <Button title="Add File" onPress={handleAddFile} />}
    </View>
  );
};

export default HomeScreen;
