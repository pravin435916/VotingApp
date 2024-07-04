import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, ToastAndroid } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tw from 'twrnc'; // Assuming `tw` is from tailwind-react-native-classnames
import { Ionicons } from '@expo/vector-icons';

const Vote = () => {
    const [candidates, setCandidates] = useState([]);
    const [votes, setVotes] = useState([]);
    const [votedCandidateId, setVotedCandidateId] = useState(null);

    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                const response = await axios.get('https://voting-appbackend-pravin435916s-projects.vercel.app/api/candidate');
                const votes = await axios.get('https://voting-appbackend-pravin435916s-projects.vercel.app/api/candidate/vote/counts');
                setCandidates(response.data);
                setVotes(votes.data);
            } catch (error) {
                console.error('Error fetching candidates:', error);
                // Handle error state as needed
            }
        };

        fetchCandidates();
    }, []);

    const handleVote = async (candidateId) => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.post(`https://voting-appbackend-pravin435916s-projects.vercel.app/api/candidate/vote/${candidateId}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            Alert.alert('Success', response.data.message);
            setVotedCandidateId(candidateId); // Update state to reflect that user has voted for this candidate
        } catch (error) {
            if (error.response) {
                ToastAndroid.show(error.response.data.message, ToastAndroid.BOTTOM);
                // Alert.alert('Error', error.response.data.message);
            } else {
                console.error('Error voting:', error.message);
                Alert.alert('Error', 'Failed to vote. Please try again later.');
            }
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.heading}>Vote for Your Candidate</Text>

            {candidates.map((candidate) => (
                <View
                    key={candidate._id}
                    style={[styles.candidateItem, votedCandidateId === candidate._id ? styles.votedCandidateItem : null]}
                    disabled={votedCandidateId === candidate._id}

                >
                    <View style={styles.candidateInfo}>
                        <Text style={styles.candidateName}>{candidate.name}</Text>
                        <Text style={styles.candidateDetails}>{candidate.age} years | {candidate.party}</Text>
                    </View>
                    <TouchableOpacity onPress={() => handleVote(candidate._id)}>
                        <Ionicons name="hand-right" size={30} color="red" />
                    </TouchableOpacity>
                </View>
            ))}

            <View style={tw`w-full px-6 flex flex-col justify-center items-center mt-6`}>
                <Text style={tw`text-2xl font-bold mb-4`}>Vote Counts by Party</Text>

                <View style={tw`w-full border border-gray-300 rounded-lg overflow-hidden`}>
                    <View style={tw`flex flex-row justify-between bg-gray-100 border-b border-gray-300 px-4 py-2`}>
                        <Text style={tw`font-bold text-2xl text-gray-700`}>Party</Text>
                        <Text style={tw`font-bold text-2xl text-gray-700`}>Votes</Text>
                    </View>

                    {votes.map((candidate, idx) => (
                        <View key={idx} style={tw`flex flex-row justify-between items-center px-4 py-3 border-b border-gray-300`}>
                            <Text style={tw`text-2xl text-gray-700`}>{candidate.party}</Text>
                            <Text style={tw`text-2xl text-gray-700`}>{candidate.count}</Text>
                        </View>
                    ))}
                </View>
            </View>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        fontFamily:'outfit',
        paddingVertical: 20,
        paddingHorizontal: 10,
        backgroundColor: '#f0f0f0',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    candidateItem: {
        width: '100%',
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
        elevation: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    votedCandidateItem: {
        backgroundColor: '#c0e7f2',
    },
    candidateInfo: {
        flex: 1,
    },
    candidateName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    candidateDetails: {
        fontSize: 14,
        color: '#666',
    },
});

export default Vote;
