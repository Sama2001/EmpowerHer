import React, { useState } from 'react';
import { View, Text, Button, Alert, ActivityIndicator, TouchableOpacity, Linking  } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Importing icons from Expo

const PaymentScreen = () => {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [paymentType, setPaymentType] = useState(''); // Default payment type

  const amounts = ['100', '200', '500'];

  const createPayment = async () => {
    if (!amount || isNaN(amount)) {
      Alert.alert('Invalid Amount', 'Please select an amount');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://192.168.1.120:3000/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: parseFloat(amount),
          currency: 'USD', // Adjust as necessary
          description: 'Sample payment',
        }),
      });

      const { success, approvalUrl } = await response.json();
      if (success) {
        await Linking.openURL(approvalUrl);
       //Alert.alert('Payment Initiated', 'Redirecting to PayPal for payment authorization');

        setTimeout(() => {
          Alert.alert('Thank You!', 'Thank you for your support!');
          setLoading(false);
        }, 2000);
      } else {
        Alert.alert('Error', 'Failed to initiate payment');
      }
    } catch (error) {
      console.error('Error creating payment:', error);
      Alert.alert('Error', 'Failed to create payment');
    } finally {
      setLoading(false);
    }
  };

  const renderAmountButtons = () => {
    return amounts.map((value, index) => (
      <TouchableOpacity
        key={index}
        style={[styles.amountButton, amount === value && styles.selectedAmountButton]}
        onPress={() => setAmount(value)}
      >
        <Text>₪{value}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Select Amount:</Text>
        <View style={styles.amountButtonsContainer}>{renderAmountButtons()}</View>
      </View>
      <View style={styles.titleContainer}>
       {/**<Text style={styles.title}>Payment Type:</Text> */} 
        <View style={styles.paymentTypeContainer}>
          <TouchableOpacity
            style={[styles.paymentTypeButton, paymentType === 'one-time' && styles.selectedPaymentTypeButton]}
            onPress={() => setPaymentType('one-time')}
          >
            <Text>One-time</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.paymentTypeButton, paymentType === 'monthly' && styles.selectedPaymentTypeButton]}
            onPress={() => setPaymentType('monthly')}
          >
            <Text>Monthly</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.paymentTypeButton, paymentType === 'yearly' && styles.selectedPaymentTypeButton]}
            onPress={() => setPaymentType('yearly')}
          >
            <Text>Yearly</Text>
          </TouchableOpacity>
        </View>
      </View>
      {loading ? (
        <ActivityIndicator style={styles.loader} size="large" color="blue" />
      ) : (
        <TouchableOpacity style={styles.payButton} onPress={createPayment}>
          <Text style={styles.payButtonText}>Donate</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Light background with slight transparency
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 20,
    margin: 10,
    padding: 20,
    borderColor: '#a86556', // Accent color for border
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  titleContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333', // Darker text color
    marginBottom: 25,

  },
  amountButtonsContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 20,
  },
  amountButton: {
    backgroundColor: '#ccc',
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginHorizontal: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectedAmountButton: {
    backgroundColor: '#f0b29e', // Lighter shade for selected button
    borderColor: '#a86556', // Accent color for border
  },
  paymentTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentTypeButton: {
    backgroundColor: '#ccc',
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginHorizontal: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectedPaymentTypeButton: {
    backgroundColor: '#f0b29e', // Lighter shade for selected button
    borderColor: '#a86556', // Accent color for border
  },
  loader: {
    marginTop: 20,
  },
  payButton: {
    backgroundColor: '#a86556', // Accent color for payment button
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginTop: 20,
  },
  payButtonText: {
    color: '#fff', // White text color
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
};

export default PaymentScreen;
