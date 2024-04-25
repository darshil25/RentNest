import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';

const PaymentGateway = ({ navigation }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCVV] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState('');

  const handleCardNumberChange = (text) => {
    setCardNumber(text);
  };

  const handleExpiryDateChange = (text) => {
    setExpiryDate(text);
  };

  const handleCVVChange = (text) => {
    setCVV(text);
  };

  const handleCardHolderNameChange = (text) => {
    setCardHolderName(text);
  };

  const handleConfirmPayment = () => {
    // Validate card details
    if (cardNumber === '' || expiryDate === '' || cvv === '' || cardHolderName === '') {
      Alert.alert('Error', 'Please fill in all card details.');
      return;
    }

    // Simulate OTP verification
    setShowOtpInput(true);
  };

  const handleOtpChange = (text) => {
    setOtp(text);
  };

  const handleSubmitPayment = () => {
    // Simulate OTP verification
      // Payment successful, show success alert
      Alert.alert('Success', 'Payment completed successfully!', [
        { text: 'OK', onPress: () => navigation.goBack() } // Navigate back to the previous screen
      ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.paymentContainer}>
        <Text style={styles.paymentTitle}>Enter Card Details</Text>
        <View style={styles.field}>
          <Text style={styles.label}>Card Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter card number"
            value={cardNumber}
            onChangeText={handleCardNumberChange}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Expiry Date</Text>
          <TextInput
            style={styles.input}
            placeholder="MM/YY"
            value={expiryDate}
            onChangeText={handleExpiryDateChange}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>CVV</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter CVV"
            value={cvv}
            onChangeText={handleCVVChange}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Card Holder Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter card holder name"
            value={cardHolderName}
            onChangeText={handleCardHolderNameChange}
          />
        </View>
        {showOtpInput && (
          <>
            <View style={styles.field}>
              <Text style={styles.label}>OTP</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter OTP"
                value={otp}
                onChangeText={handleOtpChange}
                keyboardType="numeric"
              />
            </View>
            <TouchableOpacity style={styles.confirmButton} onPress={handleSubmitPayment}>
              <Text style={styles.confirmButtonText}>Submit</Text>
            </TouchableOpacity>
          </>
        )}
        {!showOtpInput && (
          <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmPayment}>
            <Text style={styles.confirmButtonText}>Confirm</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: 'white',
  },
  paymentContainer: {
    width: '90%',
    backgroundColor: '#f0f0f0',//Light grey color
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  paymentTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  field: {
    marginBottom: 15,
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    padding: 10,
    width: '100%',
  },
  confirmButton: {
    backgroundColor: 'black',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 20,
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PaymentGateway;


