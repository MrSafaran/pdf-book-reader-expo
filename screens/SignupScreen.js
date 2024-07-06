import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { addUser } from '../Database';

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [nationalCode, setNationalCode] = useState('');
  const [role, setRole] = useState('');

  const handleSignup = async () => {
    if (!name || !lastName || !nationalCode || !role) {
      Alert.alert('Validation Error', 'All fields are required');
      return;
    }
    
    try {
      await addUser(name, lastName, nationalCode, role);
      Alert.alert('Success', 'User registered successfully');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Error', 'Failed to register user');
    }
  };

  return (
    <View>
      <TextInput placeholder="Name" value={name} onChangeText={setName} />
      <TextInput placeholder="Last Name" value={lastName} onChangeText={setLastName} />
      <TextInput placeholder="National Code" value={nationalCode} onChangeText={setNationalCode} />
      <TextInput placeholder="Role" value={role} onChangeText={setRole} />
      <Button title="Signup" onPress={handleSignup} />
    </View>
  );
}
