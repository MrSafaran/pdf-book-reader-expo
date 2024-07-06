import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, FlatList, TouchableOpacity, Linking } from 'react-native';
import { getFiles, addFile } from '../Database';
import tailwind from 'tailwind-rn';

export default function HomeScreen({ route }) {
  const { user } = route.params;
  const [fileUrl, setFileUrl] = useState('');
  const [files, setFiles] = useState([]);

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = async () => {
    const fetchedFiles = await getFiles();
    setFiles(fetchedFiles);
  };

  const handleAddFile = async () => {
    if (!fileUrl) {
      Alert.alert('Validation Error', 'File URL is required');
      return;
    }

    try {
      await addFile(fileUrl);
      setFileUrl('');
      loadFiles();
      Alert.alert('Success', 'File added successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to add file');
    }
  };

  return (
    <View className="flex-1 p-4">
      <Text className="text-2xl mb-4">Welcome, {user.name}</Text>
      {user.role === 'admin' && (
        <View className="mb-4">
          <Text className="text-xl mb-2">Add a new PDF file</Text>
          <TextInput
            className="border p-2 mb-2"
            placeholder="Enter file URL"
            value={fileUrl}
            onChangeText={setFileUrl}
          />
          <Button title="Add File" onPress={handleAddFile} />
        </View>
      )}
      <Text className="text-xl mb-2">Available Files</Text>
      <FlatList
        data={files}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="p-2 mb-2 border"
            onPress={() => Linking.openURL(item.url)}
          >
            <Text>{item.url}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
