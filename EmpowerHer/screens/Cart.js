import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Expo for icons
import { useCart } from './CartContext';
import { CartScreenStyles as styles } from '../styles/cartStyles'; // Import styles

const ShoppingCartScreen = ({ route,navigation }) => {
    
    const { userId } = route.params;
    const { getCart, removeFromCart, incrementItemQuantity, decrementItemQuantity } = useCart();
    //const cartItems = getCart(userId);
    const cartItems = getCart(userId) || [];

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

    const handlePurchaseNavigation = () => {
        console.log("cartItems in ShoppingCartScreen before navigation:", cartItems); // Log cartItems before navigation
        navigation.navigate('Purchase', { userId, cartItems }); // Navigate to PurchaseScreen with userId and cartItems
    };

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
                                {/*  <Text style={styles.itemText}>{item.productName}</Text> 
                                <Text style={styles.itemText}>Quantity: {item.quantity}</Text>
                                */ }
<View style={styles.itemDetails}>
                                <View style={styles.quantityControls}>
                                <Text style={styles.itemText}>Quantity:</Text>

                                    <TouchableOpacity onPress={() => decrementItemQuantity(userId, item._id)} style={styles.quantityButton}>
                                        <Ionicons name="remove" size={20} color="black" />
                                    </TouchableOpacity>
                                    <Text style={styles.quantityText}>{item.quantity}</Text>
                                    <TouchableOpacity onPress={() => incrementItemQuantity(userId, item._id)} style={styles.quantityButton}>
                                        <Ionicons name="add" size={20} color="black" />
                                    </TouchableOpacity>
                                </View>

                                <Text style={styles.itemText}>Price:    ₪{item.price.toFixed(2)}</Text>
                                <Text style={styles.itemText}>Total:    ₪{(item.price * item.quantity).toFixed(2)}</Text>
                                </View>
                               
                            </View>
                            <TouchableOpacity  onPress={() => removeFromCart(userId, item._id)} 
                                style={styles.Button}>
                               <Text style={styles.ButtonText}>Delete</Text>
                               </TouchableOpacity>
                        </View>
                    ))}
                </>
            )}
            {/*<Button title="Reset Cart" onPress={handleResetCart} /> */}
            {/**     {cartItems.length > 0 && (
                <Text style={styles.totalPrice}>Total Price: ₪{totalPrice.toFixed(2)}</Text>
            )}

{cartItems.length > 0 && (  
<TouchableOpacity style={styles.Button1} onPress={handlePurchaseNavigation} >
            <Text>Proceed to Purchase</Text>
        </TouchableOpacity>
)}*/}

{cartItems.length > 0 && (
  <View style={styles.container1}>
    <Text style={styles.totalPrice}>Total Price: ₪{totalPrice.toFixed(2)}</Text>
  
   
      <TouchableOpacity style={styles.Button1} onPress={handlePurchaseNavigation}>
        <Text>Proceed to Purchase</Text>
      </TouchableOpacity>
  </View>
)}

        
        </ScrollView>
    );
};


export default ShoppingCartScreen;
