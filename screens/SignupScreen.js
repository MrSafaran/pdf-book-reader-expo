import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { addUser } from '../Database';

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
    <View style={styles.container}>
      <Text style={styles.header}>Signup</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
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
      <Button title="Signup" onPress={handleSignup} />
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
