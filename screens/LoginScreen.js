import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { validateUser } from '../Database';

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
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="National Code"
        value={nationalCode}
        onChangeText={setNationalCode}
        keyboardType="numeric"
      />
      <View style={styles.roleContainer}>
        <TouchableOpacity
          style={[styles.roleButton, role === 'user' && styles.activeRole]}
          onPress={() => setRole('user')}
        >
          <Text style={styles.roleText}>User</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.roleButton, role === 'admin' && styles.activeRole]}
          onPress={() => setRole('admin')}
        >
          <Text style={styles.roleText}>Admin</Text>
        </TouchableOpacity>
      </View>
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    width: '75%',
    marginBottom: 15,
    borderRadius: 10,
  },
  roleContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  roleButton: {
    padding: 10,
    marginRight: 10,
    backgroundColor: '#ccc',
    borderRadius: 10,
  },
  activeRole: {
    backgroundColor: '#007BFF',
  },
  roleText: {
    color: '#fff',
  },
});
