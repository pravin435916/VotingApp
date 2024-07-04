import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import tw from 'twrnc';

export default function Home() {
  // Placeholder data for demonstration
  const router = useRouter()
  const electionInfo = {
    title: '2024 Presidential Election',
    description: 'Cast your vote for the next president of the India!',
    imageUri: 'https://images.deepai.org/art-image/ae8afa1384db432996270543ce8118ec/saving-environment.jpg', // Replace with actual image URL
  };

  return (
    <View style={tw`flex-1 bg-white`}>
      <ImageBackground
        source={{ uri: electionInfo.imageUri }}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={tw`w-full flex-1 justify-center items-center bg-opacity-60 bg-black`}>
          <Text style={[tw`text-4xl text-white text-center font-bold`, styles.title]}>
            {electionInfo.title}
          </Text>
          <Text style={[tw`text-xl text-white mt-4 px-4 text-center`, styles.description]}>
            {electionInfo.description}
          </Text>
          <TouchableOpacity
            style={[tw`bg-blue-500 py-3 px-8 mt-6 rounded-full`, styles.button]}
            onPress={() => router.push('/vote')}
          >
            <Text style={tw`text-white text-lg font-bold`}>Cast Your Vote</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
  title: {
    marginBottom: 20,
  },
  description: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  button: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});
