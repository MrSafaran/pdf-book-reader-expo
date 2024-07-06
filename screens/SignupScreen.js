import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { addUser } from '../Database';

const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [nationalCode, setNationalCode] = useState('');
  const [role, setRole] = useState('user'); // default to regular user

  const handleSignup = () => {
    // Perform validation here
    if (!name || !lastName || !nationalCode || !role) {
      Alert.alert('Please fill all fields');
      return;
    }

    addUser(name, lastName, nationalCode, role, result => {
      if (result.rowsAffected > 0) {
        Alert.alert('User added successfully');
        navigation.navigate('Login');
      } else {
        Alert.alert('Failed to add user');
      }
    });
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
};

export default SignupScreen;
