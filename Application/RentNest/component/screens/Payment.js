import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PaymentPage = () => {
  const [tenantName, setTenantName] = useState('');
  const [tenantEmail, setTenantEmail] = useState('');
  const [tenantPhoneNumber, setTenantPhoneNumber] = useState('');
  const [tenantAddress, setTenantAddress] = useState('');
  const [rentAmount, setRentAmount] = useState('');
  const [howManyMonths, sethowManyMonths] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [paymentMode, setPaymentMode] = useState('Cash');

  const navigation = useNavigation();

  const handleTenantNameChange = (text) => {
    setTenantName(text);
  };

  const handleTenantEmailChange = (text) => {
    setTenantEmail(text);
  };

  const handleTenantPhoneNumberChange = (text) => {
    setTenantPhoneNumber(text);
  };

  const handleTenantAddressChange = (text) => {
    setTenantAddress(text);
  };

  const handleRentAmountChange = (text) => {
    setRentAmount(text);
  };

  const handlehowManyMonthsChange = (text) => {
    sethowManyMonths(text);
  };

  const handleDueDateChange = (text) => {
    setDueDate(text);
  };

  const handleTotalAmountChange = (text) => {
    setTotalAmount(text);
  };

  const handlePaymentModeChange = (mode) => {
    setPaymentMode(mode);
  };

  const handleSubmitPayment = () => {
    if (paymentMode === 'Online Payment') {
      navigation.navigate('PaymentGateway', {
        tenantName,
        totalAmount,
      });
    } else {
      alert('Please hand over the cash to the owner!');
      setTenantName('');
      setTenantEmail('');
      setTenantPhoneNumber('');
      setTenantAddress('');
      setRentAmount('');
      sethowManyMonths('');
      setDueDate('');
      setTotalAmount('');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Tenant Details</Text>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Name:</Text>
          <TextInput
            style={styles.input}
            value={tenantName}
            onChangeText={handleTenantNameChange}
            placeholder="Enter name"
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email Address:</Text>
          <TextInput
            style={styles.input}
            value={tenantEmail}
            onChangeText={handleTenantEmailChange}
            placeholder="Enter email"
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Phone Number:</Text>
          <TextInput
            style={styles.input}
            value={tenantPhoneNumber}
            onChangeText={handleTenantPhoneNumberChange}
            placeholder="Enter phone number"
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Address:</Text>
          <TextInput
            style={styles.input}
            value={tenantAddress}
            onChangeText={handleTenantAddressChange}
            placeholder="Enter address"
          />
        </View>
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Rental Details</Text>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Rent Amount (INR):</Text>
          <TextInput
            style={styles.input}
            value={rentAmount}
            onChangeText={handleRentAmountChange}
            placeholder="Enter rent amount"
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>How many months:</Text>
          <TextInput
            style={styles.input}
            value={howManyMonths}
            onChangeText={handlehowManyMonthsChange}
            placeholder="Enter number of months"
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Due Date:</Text>
          <TextInput
            style={styles.input}
            value={dueDate}
            onChangeText={handleDueDateChange}
            placeholder="Enter due date"
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Total Amount (Including GST):</Text>
          <TextInput
            style={styles.input}
            value={totalAmount}
            onChangeText={handleTotalAmountChange}
            placeholder="Enter total amount"
          />
        </View>
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Payment Modes</Text>
        <TouchableOpacity
          style={[styles.radioButton, paymentMode === 'Cash' && styles.radioButtonSelected]}
          onPress={() => handlePaymentModeChange('Cash')}
        >
          <Text style={styles.radioLabel}>Cash</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.radioButton, paymentMode === 'Online Payment' && styles.radioButtonSelected]}
          onPress={() => handlePaymentModeChange('Online Payment')}
        >
          <Text style={styles.radioLabel}>Online Payment (Only Card)</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmitPayment}>
        <Text style={styles.buttonText}>Pay</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 20,
    backgroundColor: 'white',
  },
  formContainer: {
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 15,
    paddingHorizontal :55,
    color: 'black',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    padding: 15,
    color: 'black',
    fontSize: 15,
  },
  radioButton: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    alignItems: 'center',
  },
  radioButtonSelected: {
    backgroundColor: 'grey',
  },
  radioLabel: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 16,
  },
  button: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 8,
    width: '90%',
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default PaymentPage;


