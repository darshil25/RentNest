import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, ScrollView, ToastAndroid } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';

const BuyPage = () => {
  const navigation = useNavigation()
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [months, setMonths] = useState('');
  const [people, setPeople] = useState('');
  const [studentFamily, setStudentFamily] = useState('');

  const route = useRoute();
  const {propertyId} = route.params;
  // console.log("Property id ",propertyId);

  const addbookpro = async () => {
    console.log(JSON.stringify({
      userid:userId,
      propertyid:propertyId,
      customer_name: name,
      customer_mobilenumber: mobileNumber,
      customer_email: email,
      number_of_months: months,
      number_of_people: people,
      student_family: studentFamily
    }));
    const userId = await AsyncStorage.getItem('userid');

    try {
      const response = await fetch('https://rentnestserver.onrender.com/order/addorder', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
          userid:userId,
          propertyid:propertyId,
          customer_name: name,
          customer_mobilenumber: mobileNumber,
          customer_email: email,
          number_of_months: months,
          number_of_people: people,
          student_family: studentFamily
        })
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Property Added:', data);
  
      setName('');
      setMobileNumber('');
      setEmail('');
      setMonths('');
      setPeople('');
      setStudentFamily('');
  
      ToastAndroid.show('Saved...', ToastAndroid.SHORT);
    } catch (error) {
      console.error('Error:', error.message);
      ToastAndroid.show('Network request failed. Please check your connection.', ToastAndroid.SHORT);
    }
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar style='light' backgroundColor='black'/>
      <View style={styles.header}>
        <Text style={styles.header}>Book Property</Text>
      </View>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder='Type Here ...'
      />
      <Text style={styles.label}>Mobile Number:</Text>
      <TextInput
        style={styles.input}
        value={mobileNumber}
        onChangeText={setMobileNumber}
        keyboardType="phone-pad"
        placeholder='Type Here ...'
      />
      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholder='Type Here ...'
      />
      <Text style={styles.label}>Number of Months:</Text>
      <TextInput
        style={styles.input}
        value={months}
        onChangeText={setMonths}
        keyboardType="numeric"
        placeholder='Type Here ...'

      />
      <Text style={styles.label}>Number of People:</Text>
      <TextInput
        style={styles.input}
        value={people}
        onChangeText={setPeople}
        keyboardType="numeric"
        placeholder='Type Here ...'

      />
      <Text style={styles.label}>Students/Family:</Text>
      <TextInput
        style={styles.input}
        value={studentFamily}
        onChangeText={setStudentFamily}
        placeholder='Type Here ...'

      />
      <TouchableOpacity style={styles.saveButton} onPress={()=>addbookpro()}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding:20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding : 10,
    marginBottom :10,
    marginLeft : 30,
    marginRight : 20,
  },
  backButton: {
    padding: 1,
    borderRadius: 5,
    marginRight: 1,
    marginLeft:1,
    marginTop: 1,
    marginBottom: 5,
    marginTop: 1,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: 'black',
  },
  label: {
    fontSize: 20,
    marginBottom: 3,
    color: 'black',
  },
  input: {
    borderWidth: 1.2,
    borderColor: 'grey',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    // backgroundColor: 'pink',
    fontSize: 16,
    backgroundColor:'white'
  },
  saveButton: {
    backgroundColor: '#60c5ff',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 3,
    shadowColor:'black',
    shadowOpacity:2
  },
  buttonText: {
    fontWeight:'500',
    fontSize: 19,
    textTransform: 'uppercase',
  },

});

export default BuyPage;