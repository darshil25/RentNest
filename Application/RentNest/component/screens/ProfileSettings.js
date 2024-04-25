import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileSettings = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');

  const navigation = useNavigation();

  
  const saveProfileDetails = async (details) => {
    try {
      await AsyncStorage.setItem('profileDetails', JSON.stringify(details));
    } catch (error) {
      console.error('Error saving profile details:', error);
    }
  };


  const loadProfileDetails = async () => {
    try {
      const storedDetails = await AsyncStorage.getItem('profileDetails');
      if (storedDetails !== null) {
        const parsedDetails = JSON.parse(storedDetails);
        setName(parsedDetails.name);
        setEmail(parsedDetails.email);
        setPhoneNumber(parsedDetails.phoneNumber);
        setAddress(parsedDetails.address);
      }
    } catch (error) {
      console.error('Error loading profile details:', error);
    }
  };

  useEffect(() => {
  
    loadProfileDetails();
  }, []);

  const handleSaveChanges = () => {
    const newDetails = { name, email, phoneNumber, address };
    console.log('Changes saved successfully:', newDetails);
    saveProfileDetails(newDetails);
    Alert.alert('Changes Saved', 'Your profile details have been saved successfully.');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar style='dark' backgroundColor='white' />

      <Text style={styles.title}>Profile Settings</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Name :</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={text => setName(text)}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email :</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={text => setEmail(text)}
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Phone Number :</Text>
        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={text => setPhoneNumber(text)}
          keyboardType="phone-pad"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Address :</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          value={address}
          onChangeText={text => setAddress(text)}
          multiline
          numberOfLines={3}
        />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
        <FontAwesome name="save" size={24} color="white" />
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 35,
    marginLeft: 43,
    color: 'black',
  },
  inputGroup: {
    marginBottom: 40,
  },
  label: {
    fontSize: 20,
    marginBottom: 5,
    color: 'black',
  },
  input: {
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    color: 'black',
  },
  multilineInput: {
    height: 100,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 8,
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    color: 'white',
  },
});

export default ProfileSettings;





