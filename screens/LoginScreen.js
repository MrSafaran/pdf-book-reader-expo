import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Text, TouchableOpacity } from 'react-native';
import { validateUser } from '../Database';
import tailwind from 'tailwind-rn';

export default function LoginScreen({ navigation }) {
  const [nationalCode, setNationalCode] = useState('');
  const [role, setRole] = useState('user');

  const validateInputs = () => {
    const nationalCodeRegex = /^\d{10}$/;

    if (!nationalCodeRegex.test(nationalCode)) {
      Alert.alert('Validation Error', 'National Code must be a 10-digit number');
      return false;
    }

    return true;
  };

  const handleLogin = async () => {
    if (!nationalCode) {
      Alert.alert('Validation Error', 'National Code is required');
      return;
    }

    if (!validateInputs()) {
      return;
    }

    const user = await validateUser(nationalCode);
    if (user && user.role === role) {
      navigation.navigate('Home', { user });
    } else {
      Alert.alert('Error', 'Invalid National Code or Role');
    }
  };

  return (
    <View className="flex-1 justify-center items-center">
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
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}
