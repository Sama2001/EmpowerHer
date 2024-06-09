import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity,TextInput } from 'react-native';
import { useCart } from './CartContext';

const Purchase = ({ route, navigation }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [purchaseMessage, setPurchaseMessage] = useState('');
    const { userId, product = [] ,quantity} = route.params || {}; // Provide a default empty array for product
    const [City, setCity] = useState('');
    const [Country, setCountry] = useState('');
    const [Street, setStreet] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');

   // const { userId,product } = route.params;
   console.log("Product in PurchaseScreen:", product); // Log product

    const { clearCart } = useCart();
    const totalPrice = product.price * quantity;

    const handlePurchase = async () => {
        setIsLoading(true);
        try {

            if (!Country || !City || !Street  || !mobileNumber) {
                setPurchaseMessage('Please fill out all fields');
                return;
            }
                const CustomersBody = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({  userId, cartItems: [{ ...product, quantity }] , Country, City, Street, mobileNumber,TotalAmount:totalPrice })
                };
                const responseCutomers = await fetch('http://192.168.1.120:3000/Customers', CustomersBody);
                if (!responseCutomers.ok) {
                    throw new Error('Failed to save customer details');
                }
                const dataCustomers = await responseCutomers.json();
                if (!dataCustomers.success) {
                    throw new Error(customersData.message || 'Failed to save customer details');
                }
                const { success: successCustomers, message: messageCustomers } = dataCustomers;


            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, cartItems: [{ ...product, quantity }] })
            };
    
            const response = await fetch('http://192.168.1.120:3000/purchase', requestOptions);
            const data = await response.json();
    
            const requestOptionsPOST = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cartItems: [{ ...product, quantity }] })
            };
            const responsePOST = await fetch('http://192.168.1.120:3000/purchase', requestOptionsPOST);
            const dataPOST = await responsePOST.json();
            const { success: successPOST, message: messagePOST } = dataPOST;

            const { success, message } = data;
            if (success && successPOST && successCustomers) {
                setPurchaseMessage('Purchase successful!');
    
                // Clear cart items locally or navigate to another screen
                 //clearCart(userId);
            } else {
                setPurchaseMessage('Failed to process purchase');
            }
        } catch (error) {
            console.error('Error purchasing:', error);
            setPurchaseMessage('An error occurred. Please try again later.');
        }
        setIsLoading(false);
    };

    

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Confirm Purchase</Text>
            {product ? (
                <View style={styles.itemContainer}>
                    <Text>{product.productName}</Text>
                    <Text>Quantity: {quantity}</Text>
                    <Text>Price: ₪{product.price.toFixed(2)}</Text>
                    <Text>Total: ₪{(product.price * quantity).toFixed(2)}</Text>
                </View>
            ) : (
                <Text>No product available for purchase.</Text>
            )}
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
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        alignItems: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#a86556',
    },
    itemContainer: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        width: '100%',
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

    purchaseButton: {
        backgroundColor: '#a86556',
        padding: 12,
        borderRadius: 8,
        marginTop: 16,
        width: '100%',
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
});


export default Purchase;
