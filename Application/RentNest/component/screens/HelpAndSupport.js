import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

const HelpAndSupport = () => {
  const supportOptions = [
    { title: 'FAQs', description: 'Browse frequently asked questions.' },
    { title: 'Report an Issue', description: 'Report any issues or bugs.' },
    { title: 'Privacy Policy', description: 'Learn about our privacy policy.' },
    { title: 'Terms of Service', description: 'View our terms of service.' },
  ];

  const handleOptionPress = (option) => {
    console.log(`Navigating to ${option.title}`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar style='dark' backgroundColor='white' />
      <Text style={styles.title}>Help & Support</Text>

      {supportOptions.map((option, index) => (
        <TouchableOpacity key={index} style={styles.optionItem} onPress={() => handleOptionPress(option)}>
          <View style={styles.optionContent}>
            <Text style={styles.optionTitle}>{option.title}</Text>
            <Text style={styles.optionDescription}>{option.description}</Text>
          </View>
          <FontAwesome name="angle-right" size={24} color="black" />
        </TouchableOpacity>
      ))}
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
    marginBottom: 45,
    marginLeft:   45,
    color: 'black',
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 15,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  optionDescription: {
    fontSize: 16,
    color: 'black',
    marginBottom: 5,
  },
});

export default HelpAndSupport;
