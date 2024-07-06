import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Text, TouchableOpacity } from 'react-native';
import { addUser } from '../Database';
import tailwind from 'tailwind-rn';

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [nationalCode, setNationalCode] = useState('');
  const [role, setRole] = useState('user');

  const validateInputs = () => {
    const nameRegex = /^[A-Za-z]+$/;
    const nationalCodeRegex = /^\d{10}$/;

    if (!nameRegex.test(name)) {
      Alert.alert('Validation Error', 'Name must contain only characters');
      return false;
    }

    if (!nameRegex.test(lastName)) {
      Alert.alert('Validation Error', 'Last Name must contain only characters');
      return false;
    }

    if (!nationalCodeRegex.test(nationalCode)) {
      Alert.alert('Validation Error', 'National Code must be a 10-digit number');
      return false;
    }

    return true;
  };

  const handleSignup = async () => {
    if (!name || !lastName || !nationalCode) {
      Alert.alert('Validation Error', 'All fields are required');
      return;
    }

    if (!validateInputs()) {
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
    <View className="flex-1 justify-center items-center">
      <TextInput
        className="border p-2 w-3/4 mb-4"
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        className="border p-2 w-3/4 mb-4"
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        className="border p-2 w-3/4 mb-4"
        placeholder="National Code"
        value={nationalCode}
        onChangeText={setNationalCode}
        keyboardType="numeric"
      />
      <View className="flex-row mb-4">
        <TouchableOpacity
          className={`p-2 ${role === 'user' ? 'bg-blue-500' : 'bg-gray-300'} mr-2`}
          onPress={() => setRole('user')}
        >
          <Text className="text-white">User</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`p-2 ${role === 'admin' ? 'bg-blue-500' : 'bg-gray-300'}`}
          onPress={() => setRole('admin')}
        >
          <Text className="text-white">Admin</Text>
        </TouchableOpacity>
      </View>
      <Button title="Signup" onPress={handleSignup} />
    </View>
  );
}
