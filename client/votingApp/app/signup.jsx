import React, { useState } from 'react';
import { View, TextInput, Text, Alert, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';
import tw from 'twrnc';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Signup() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [aadharCardNumber, setAadharCardNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      const response = await axios.post('https://voting-appbackend-pravin435916s-projects.vercel.app/api/users/signup', {
        name: name,
        age: parseInt(age),
        Mobile: parseInt(mobile),
        email: email,
        address: address,
        aadharCardNumber: parseInt(aadharCardNumber),
        password: password,
      });
      console.log(response.data);
      const token = response.data.token;
      await AsyncStorage.setItem('token', token);
      Alert.alert('Signup success');
      router.push('/home')
      // Store token in AsyncStorage or SecureStore for later use (recommended)
    } catch (error) {
      console.error('Signup error:', error.response.data.message);
      Alert.alert('Signup failed', 'Please try again later');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://www.muni.org/Departments/transit/PeopleMover/PublishingImages/Transit%20on%20the%20Move%20Graphics/Vote(forweb)-02.png' }} // Replace with your image URL
        style={styles.logo}
      />
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Age"
        value={age}
        onChangeText={(text) => setAge(text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Mobile"
        value={mobile}
        onChangeText={(text) => setMobile(text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={(text) => setAddress(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Aadhar Card Number"
        value={aadharCardNumber}
        onChangeText={(text) => setAadharCardNumber(text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
      />
      <Text style={styles.signupButton} onPress={handleSignup}>
        Signup
      </Text>
      <View style={tw`flex flex-row gap-2 mt-4`}>
        <Text>Already have an Account? </Text>
        <Text onPress={() => router.push('/login')} style={styles.link}>
          Login
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  logo: {
    width: 350,
    height: 300,
    objectFit: 'contain',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#1E90FF',
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  signupButton: {
    width: '100%',
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#1E90FF',
    padding: 10,
    borderRadius: 5,
    fontSize: 18,
    fontWeight: 'bold',
  },
  link: {
    color: '#1E90FF',
    textDecorationLine: 'underline',
  },
});
