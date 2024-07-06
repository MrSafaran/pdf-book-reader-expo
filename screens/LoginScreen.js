import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { validateUser } from '../Database'; // Implement validateUser in Database.js

const LoginScreen = ({ navigation }) => {
  const [nationalCode, setNationalCode] = useState('');

  const handleLogin = () => {
    validateUser(nationalCode, user => {
      if (user) {
        navigation.navigate('Home', { user });
      } else {
        Alert.alert('Invalid credentials');
      }
    });
  };

  return (
    <View>
      <TextInput placeholder="National Code" value={nationalCode} onChangeText={setNationalCode} />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;
