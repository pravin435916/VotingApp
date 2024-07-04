import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import tw from 'twrnc';

export default function Index() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/login');
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://image.freepik.com/free-vector/electronic-voting-abstract-concept-illustration-electronic-election-online-voting-e-voting-system-government-digital-technology-internet-ballot-campaign-website_335657-437.jpg' }} // Replace with your image URL
        style={styles.image}
      />
      <Text style={styles.title}>Welcome to Our App!</Text>
      <Text style={styles.subtitle}>Get started by creating an account or logging in.</Text>
      <Text style={styles.getStartedButton} onPress={handleGetStarted}>
        Get Started
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 400,
    objectFit: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 30,
  },
  getStartedButton: {
    width: '100%',
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#1E90FF',
    padding: 15,
    borderRadius: 5,
    fontSize: 18,
    fontWeight: 'bold',
  },
});