import React from 'react';
import { View, Text, Button,Image } from 'react-native';
import { useCart } from './CartContext';

const ShoppingCartScreen = ({route}) => {
    const { userId } = route.params;
    const { getCart, removeFromCart } = useCart();
    const cartItems = getCart(userId);

    console.log('Cart Items:', cartItems); // Log the cartItems array here
  
    return (
        <View>
        <Text>Shopping Cart</Text>
        {cartItems.map(item => (
            <View key={item._id}>
                <Text>{item.name} - Name: {item.productName}</Text>
                <Text>{item.name} - Quantity: {item.quantity}</Text>
                <Button title="Remove" onPress={() => removeFromCart(userId, item._id)} />
            </View>
        ))}
    </View>
    );
  };
  

export default ShoppingCartScreen;
