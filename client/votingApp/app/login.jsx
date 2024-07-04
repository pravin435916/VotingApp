import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Image, Text } from 'react-native';
import axios from 'axios';
import tw from 'twrnc'
import { router, useRouter } from 'expo-router';
export default function Login() {
  const [aadharCardNumber, setAadharCardNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const router = useRouter()
    try {
      const response = await axios.post('https://voting-appbackend-pravin435916s-projects.vercel.app/api/users/login', {
        aadharCardNumber: parseInt(aadharCardNumber),
        password: password,
      });
      console.log(response.data)
      Alert.alert('Login success');
      // Store token in AsyncStorage or SecureStore for later use (recommended)
    } catch (error) {
      console.error('Login error:', error.response.data);
      Alert.alert('Login failed', 'Please try again later');
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
      <Text style={styles.signupButton} onPress={handleLogin} color="#1E90FF" >Login</Text>
      <View style={tw`flex flex-row gap-2 mt-4`}>
        <Text>Don't have a Account ? </Text>
        <Text style={tw`text-[#1E90FF]`} onPress={()=> router.push('/signup')}>Signup</Text>
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
    // marginBottom: 40,
    objectFit:'contain',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
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
});
