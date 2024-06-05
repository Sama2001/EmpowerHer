import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useCart } from './CartContext';

const Purchase = ({ route, navigation }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [purchaseMessage, setPurchaseMessage] = useState('');
    const { userId, product = [] ,quantity} = route.params || {}; // Provide a default empty array for product
   // const { userId,product } = route.params;
   console.log("Product in PurchaseScreen:", product); // Log product

    const { clearCart } = useCart();

    const handlePurchase = async () => {
        setIsLoading(true);
        try {
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, cartItems: [{ ...product, quantity }] })
            };
    
            const response = await fetch('http://192.168.1.120:3000/purchase', requestOptions);
            const data = await response.json();
    
            const { success, message } = data;
            if (success) {
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
