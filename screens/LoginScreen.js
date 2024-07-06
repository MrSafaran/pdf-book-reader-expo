import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { validateUser } from '../Database';

export default function LoginScreen({ navigation }) {
  const [nationalCode, setNationalCode] = useState('');

  const handleLogin = async () => {
    if (!nationalCode) {
      Alert.alert('Validation Error', 'National Code is required');
      return;
    }

    const user = await validateUser(nationalCode);
    if (user) {
      navigation.navigate('Home', { user });
    } else {
      Alert.alert('Error', 'Invalid National Code');
    }
  };

  return (
    <View>
      <TextInput placeholder="National Code" value={nationalCode} onChangeText={setNationalCode} />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}
