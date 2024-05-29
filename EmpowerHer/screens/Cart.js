import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Expo for icons
import { useCart } from './CartContext';

const ShoppingCartScreen = ({ route }) => {
    const { userId } = route.params;
    const { getCart, removeFromCart } = useCart();
    const cartItems = getCart(userId);
   // const { resetCart } = useCart();
{/* const handleResetCart = () => {
        resetCart(); // Call the resetCart function from the CartContext
      }; */}
   

    // State to track the current image index for each item
    const [imageIndices, setImageIndices] = useState(cartItems.reduce((acc, item) => {
        acc[item._id] = 0;
        return acc;
    }, {}));

    // Handler to go to the next image
    const handleNextImage = (itemId, totalImages) => {
        setImageIndices((prevIndices) => ({
            ...prevIndices,
            [itemId]: (prevIndices[itemId] + 1) % totalImages
        }));
    };

    // Handler to go to the previous image
    const handlePrevImage = (itemId, totalImages) => {
        setImageIndices((prevIndices) => ({
            ...prevIndices,
            [itemId]: (prevIndices[itemId] - 1 + totalImages) % totalImages
        }));
    };

    // Calculate the total price for each item and the total price for all items
    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>Shopping Cart</Text>
            {cartItems.length === 0 ? (
                <View style={styles.emptyCartContainer}>
                    <Image source={require('../assets/EmptyCart.png')} style={styles.emptyCartImage} />
                    <Text style={styles.emptyCartText}>Your cart is empty!</Text>
                </View>
            ) : (
                <>
                
                    {cartItems.map(item => (
                        <View key={item._id} style={styles.itemContainer}>
                        <Text style={styles.itemNameText}>{item.productName}</Text>

                            <Image source={{ uri: item.images[imageIndices[item._id]] }} style={styles.image} />
                            <View style={styles.navigationButtons}>
                                <View style={styles.navButtonContainer}>
                                    {imageIndices[item._id] > 0 && (
                                        <TouchableOpacity onPress={() => handlePrevImage(item._id, item.images.length)}>
                                            <Ionicons name="chevron-back" size={24} color="black" />
                                        </TouchableOpacity>
                                    )}
                                </View>
                                <View style={styles.navButtonContainer1}>
                                    {imageIndices[item._id] < item.images.length - 1 && (
                                        <TouchableOpacity onPress={() => handleNextImage(item._id, item.images.length)}>
                                            <Ionicons name="chevron-forward" size={24} color="black" />
                                        </TouchableOpacity>
                                    )}
                                </View>
                            </View>
                            <View style={styles.itemDetails}>
                                {/*  <Text style={styles.itemText}>{item.productName}</Text>*/}
                                <Text style={styles.itemText}>Quantity: {item.quantity}</Text>
                                <Text style={styles.itemText}>Price: ₪{item.price.toFixed(2)}</Text>
                                <Text style={styles.itemText}>Total: ₪{(item.price * item.quantity).toFixed(2)}</Text>

                                <TouchableOpacity  onPress={() => removeFromCart(userId, item._id)} 
                                style={styles.Button}>
                               <Text style={styles.ButtonText}>Delete</Text>
                               </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </>
            )}
            {/*<Button title="Reset Cart" onPress={handleResetCart} /> */}
            {cartItems.length > 0 && (
                <Text style={styles.totalPrice}>Total Price: ₪{totalPrice.toFixed(2)}</Text>
            )}
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    container: {
        padding: 16,
        height:1000,
        backgroundColor: '#fff',
        alignItems: 'center', // Center align the content
        height:1300,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
        color:'#a86556',
    },
    itemContainer: {
        borderWidth:2,
        marginBottom: 16,
        padding: 16,
        borderWidth: 2,
        borderColor: '#ddd',
        borderRadius: 8,
        backgroundColor: '#f9f9f9',
        width: '100%', // Make sure item containers take full width
        alignItems: 'center',
        borderColor: '#a86556',

    },
    image: {
        width: 230,
        height: 230,
        marginBottom: 10,
        borderRadius: 8,
    },
  
    navigationButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%', // Ensure the buttons take full width
        paddingHorizontal: 50, // Add padding to evenly space the buttons
        marginTop: 10,
    },
    navButtonContainer: {
        flex: 1, // Each button container takes half of the space
        alignItems: 'flex-start', // Align the "Previous" button to the start
        bottom:130,
    },
    navButtonContainer1: {
        flex: 1, // Each button container takes half of the space
        alignItems: 'flex-end', // Align the "Previous" button to the start
        bottom:130,

    },
    navButton: {
        padding: 10,
    },
    itemDetails: {
        alignItems: 'center',
    },
    itemText: {
        fontSize: 16,
        marginBottom: 4,
    },
    itemNameText: {
        fontWeight:'bold',
        fontSize: 16,
        marginBottom: 7,
    },
    totalPrice: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 16,
        textAlign: 'center',
    },
    emptyCartContainer: {
        height:750,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyCartImage: {
        width: 270,
        height: 270,
        marginBottom:290,
        marginTop:-70,
        resizeMode: 'contain',
    },
    emptyCartText: {
        fontSize: 20,
        marginTop: -250,
    },
    Button: {
        backgroundColor: 'grey',
        borderRadius: 5,
        padding: 10,
        marginTop: 10,
        //marginRight:100,
        width: 100,
        alignItems: 'center',
        borderColor:'rgba(187, 123, 107, 0.79)',
        borderWidth:1,
        //borderRadius: 50,
      },
      ButtonText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
      },
});

export default ShoppingCartScreen;
