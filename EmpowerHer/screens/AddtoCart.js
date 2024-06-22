import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity,Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Expo for icons
import { useCart } from './CartContext';
import { AddCartScreenStyles as styles } from '../styles/AddcartStyles'; // Import styles

const AddToCart = ({ route,navigation }) => {
    const { product, userId } = route.params;
    const [quantity, setQuantity] = useState(1);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const { addToCart } = useCart(); // Use the addToCart function from the CartContext

    const handleNextImage = () => {
        if (currentImageIndex < product.images.length - 1) {
            setCurrentImageIndex(currentImageIndex + 1);
        }
    };

    const handlePrevImage = () => {
        if (currentImageIndex > 0) {
            setCurrentImageIndex(currentImageIndex - 1);
        }
    };

    const handleIncreaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    const handleDecreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleAddToCart = () => {
        console.log('User ID:', userId);
addToCart(userId, { ...product, quantity, imageUrl: product.images[currentImageIndex] });
Alert.alert('Added to cart');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{product.productName}</Text>
<View style={styles.imageContainer}>
                {currentImageIndex > 0 && (
                     <TouchableOpacity 
                     onPress={handlePrevImage} 
                     style={[styles.navButton, styles.leftButton]}
                     disabled={currentImageIndex === 0}
                 >
                     <Ionicons 
                         name="chevron-back" 
                         size={24} 
                         color="black"
                     />
                 </TouchableOpacity>
                )}
                
                <Image source={{ uri: product.images[currentImageIndex] }} style={styles.productImage} />
                
                {currentImageIndex < product.images.length - 1 && (
                    <TouchableOpacity 
                        onPress={handleNextImage} 
                        style={[styles.navButton, styles.rightButton]}
                    >
                        <Ionicons 
                            name="chevron-forward" 
                            size={24} 
                            color="black" 
                        />
                    </TouchableOpacity>

                )}
                 
              
            </View>  

            <Text style={styles.quantity}>Quantity:</Text>

            <View style={styles.quantityContainer}>

                <TouchableOpacity onPress={handleDecreaseQuantity} style={styles.quantityButton}>
                    <Text>-</Text>
                </TouchableOpacity>
                <Text>{quantity}</Text>
                <TouchableOpacity onPress={handleIncreaseQuantity} style={styles.quantityButton}>
                    <Text>+</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.iconButton} onPress={handleAddToCart}>
            <Text style={styles.buttonText1}>Add</Text>
                    <Ionicons name="cart" size={24} color="#a86556" />
                    <Ionicons name="add" size={12} color="#a86556" style={styles.plusIcon} />
                </TouchableOpacity>

            {/** <TouchableOpacity onPress={handleAddToCart} style={styles.addToCartButton}>
                <Text style={styles.addToCartButtonText}>Add to Cart</Text>
            </TouchableOpacity>*/}
        </View>
    );
};



export default AddToCart;
