import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const ContactUsPage = () => {
  const [message, setMessage] = useState('');

  const handleMessageChange = (text) => {
    setMessage(text);
  };

  const handleSubmitMessage = () => {
     alert('Thank you for reaching out! Your message is important to us We have received it and will be in contact with you shortly.');
    setMessage('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Contact Us</Text>
      <View style={styles.section}>
        <View style={styles.detail}>
          <Text style={styles.detailLabel}>Name:</Text>
          <Text style={styles.detailValue}>Shyam</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailLabel}>Email:</Text>
          <Text style={styles.detailValue}>Shyam@gmail.com</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailLabel}>Phone:</Text>
          <Text style={styles.detailValue}>1801-213-9876</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailLabel}>Address:</Text>
          <Text style={styles.detailValue}>94-B, Park City, Rajkot</Text>
        </View>
      </View>
      <View style={styles.section}>
        <View style={styles.detail}>
          <Text style={styles.detailLabel}>Name:</Text>
          <Text style={styles.detailValue}>Rishabh</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailLabel}>Email:</Text>
          <Text style={styles.detailValue}>Rishabh@gmail.com</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailLabel}>Phone:</Text>
          <Text style={styles.detailValue}>1800-123-4567</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailLabel}>Address:</Text>
          <Text style={styles.detailValue}>44-A, Maple Street, Surat</Text>
        </View>
      </View>
      <View style={styles.messageBox}>
        <TextInput
          style={styles.input}
          placeholder="Need any help? Just send us a message!"
          value={message}
          onChangeText={handleMessageChange}
          multiline
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmitMessage}>
        <Text style={styles.buttonText}>SEND</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 20,                         
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
    textTransform: 'uppercase',
  },
  section: {
    borderWidth: 2,
    borderColor: 'blue',
    padding: 20,
    marginBottom: 20,
    borderRadius: 12,
    width: '100%',
    backgroundColor: 'white',
    shadowColor: 'white',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 5,
    shadowRadius: 20,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
    textTransform: 'uppercase',
  },
  detail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  detailLabel: {
    fontWeight: 'bold',
    color: 'black',
    textTransform: 'uppercase',
    fontSize:18,
  },
  detailValue: {
    color: 'black',
    fontSize: 18,
  },
  messageBox: {
    width: '100%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'black',
  },
  input: {
    fontSize: 16,
    height:200,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default ContactUsPage;

