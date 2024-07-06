import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { fetchFiles, addFileToDB } from '../Database';
import * as FileSystem from 'expo-file-system';

export default function HomeScreen({ route }) {
  const { user } = route.params;
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const loadFiles = async () => {
      const filesFromDB = await fetchFiles();
      setFiles(filesFromDB);
    };
    loadFiles();
  }, []);

  const handleAddFile = async () => {
    const newFile = { fileName: 'New File', filePath: '/path/to/newfile.pdf' };
    await addFileToDB(newFile.fileName, newFile.filePath);
    setFiles([...files, newFile]);
  };

  const handleDownloadFile = async (file) => {
    const fileUri = FileSystem.documentDirectory + file.fileName;
    await FileSystem.downloadAsync(file.filePath, fileUri);
    alert(`File downloaded to ${fileUri}`);
  };

  return (
    <View>
      <Text>Welcome, {user.name}</Text>
      <FlatList
        data={files}
        keyExtractor={(item) => item.fileName}
        renderItem={({ item }) => (
          <View>
            <Text>{item.fileName}</Text>
            <Button title="Download" onPress={() => handleDownloadFile(item)} />
          </View>
        )}
      />
      {user.role === 'admin' && (
        <Button title="Add File" onPress={handleAddFile} />
      )}
    </View>
  );
}
