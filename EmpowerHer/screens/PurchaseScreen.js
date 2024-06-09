import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity ,TextInput, ScrollView} from 'react-native';
import axios from 'axios'; // Import Axios for making HTTP requests
import { useCart } from './CartContext';

const PurchaseScreen = ({ route, navigation }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [purchaseMessage, setPurchaseMessage] = useState('');
    const [address, setAddress] = useState('');
    const [City, setCity] = useState('');
    const [Country, setCountry] = useState('');
    const [Street, setStreet] = useState('');
    const [visa, setVisa] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const { cartItems } = route.params;
    const { userId } = route.params;

    const { clearCart } = useCart();

    console.log("cartItems in PurchaseScreen:", cartItems); // Log cartItems
    const handlePurchase = async () => {
        if (!Country || !City || !Street  || !mobileNumber) {
            setPurchaseMessage('Please fill out all fields');
            return;
        }
        setIsLoading(true);
        try {

            const CustomersBody = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({  userId, cartItems, Country, City, Street, mobileNumber,TotalAmount:totalPrice })
            };
            const responseCutomers = await fetch('http://192.168.1.120:3000/Customers', CustomersBody);
            if (!responseCutomers.ok) {
                throw new Error('Failed to save customer details');
            }
            const dataCustomers = await responseCutomers.json();
            if (!dataCustomers.success) {
                throw new Error(customersData.message || 'Failed to save customer details');
            }
            console.log('POST /customers response:', responseCutomers.status, dataCustomers);

            
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, cartItems })
            };
    
            const response = await fetch('http://192.168.1.120:3000/purchase', requestOptions);
            if (!response.ok) {
                throw new Error('Failed to process purchase PUT request');
            }
            const data = await response.json();
            if (!data.success) {
                throw new Error(putData.message || 'Failed to process purchase PUT request');
            }

            const requestOptionsPOST = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cartItems })
            };
            
            const responsePOST = await fetch('http://192.168.1.120:3000/purchase', requestOptionsPOST);
            if (!responsePOST.ok) {
                throw new Error('Failed to process purchase POST request');
            }

            const dataPOST = await responsePOST.json();
            if (!dataPOST.success) {
                throw new Error(postData.message || 'Failed to process purchase POST request');
            }
       
          
          

            const { success, message } = data;
            const { success: successPOST, message: messagePOST } = dataPOST;
            const { success: successCustomers, message: messageCustomers } = dataCustomers;

            if (successPOST && success && successCustomers) {
                setPurchaseMessage('Purchase successful!');
    
                // Clear cart items locally or navigate to another screen
                 clearCart(userId);
            } else {
                setPurchaseMessage('Failed to process purchase');
            }
        } catch (error) {
            console.error('Error purchasing:', error);
            setPurchaseMessage('An error occurred. Please try again later.');
        }
        setIsLoading(false);
    };


    const totalPrice = cartItems.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0);
    
    return (
        <ScrollView>

        <View style={styles.container}>
            <Text style={styles.header}>Confirm Purchase</Text>
            <ScrollView style={styles.scrollContainer}>
            {cartItems.map(item => (
                <View key={item._id} style={styles.itemContainer}>
                    <Text>{item.productName}</Text>
                    <Text>Quantity: {item.quantity}</Text>
                    <Text>Price: ₪{item.price.toFixed(2)}</Text>
                    <Text>Total: ₪{(item.price * item.quantity).toFixed(2)}</Text>
                </View>
            ))}
        </ScrollView>
        <Text style={styles.totalPrice}>Total Price: ₪{totalPrice.toFixed(2)}</Text>

  <Text style={styles.sectionTitle}>Address Information</Text>
  <View style={styles.inputContainer}>

            <TextInput
                style={styles.input}
                placeholder="Country"
                onChangeText={text => setCountry(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="City"
                onChangeText={text => setCity(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Street"
                onChangeText={text => setStreet(text)}
            />
           {/**<Text style={styles.sectionTitle}>Payment Information</Text> */} 
           {/* <TextInput
                style={styles.input}
                placeholder="Visa Card"
                onChangeText={text => setVisa(text)}
            /> */}
            <TextInput
                style={styles.input}
                placeholder="Mobile Number"
                onChangeText={text => setMobileNumber(text)}
            />
            
            </View>
            <TouchableOpacity
                style={styles.purchaseButton}
                onPress={handlePurchase}
                disabled={isLoading}
            >
                <Text style={styles.buttonText}>{isLoading ? 'Processing...' : 'Confirm Purchase'}</Text>
            </TouchableOpacity>
            <Text style={styles.purchaseMessage}>{purchaseMessage}</Text>
        </View>
        </ScrollView>

    );
};

const styles = StyleSheet.create({
    container: {
       flex: 1,
        backgroundColor: 'hsla(0, 15%, 100%, 0.7)',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 30,
        marginVertical: 5, // Adjust vertical margin
        borderColor: '#a86556',
        height:800,
    },
    scrollContainer: {
        marginBottom: 16,
        maxHeight: 100, // Adjust the max height as needed
        width:300,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 50,
        color: '#a86556',
    },
    totalPrice: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#a86556',
    },
    
    itemContainer: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 6,
        marginBottom: 16,
        //width: '100%',
    },
    purchaseButton: {
        backgroundColor: '#a86556',
        padding: 12,
        borderRadius: 8,
        marginTop: 16,
        width: '90%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    purchaseMessage: {
        marginTop: 16,
        color: '#a86556',
        fontSize: 16,
    },
    inputContainer: {
        width: '90%',
        alignItems: 'center',
        borderRadius: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
    },
    input: {
        backgroundColor: '#fff',
        height: 40,
        width: '90%',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        marginBottom: 16,
        paddingHorizontal: 10,
    },

});

export default PurchaseScreen;
