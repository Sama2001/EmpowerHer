import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Expo for icons
import { useCart } from './CartContext';
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
addToCart(userId, { ...product, quantity });

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
            <TouchableOpacity onPress={handleAddToCart} style={styles.addToCartButton}>
                <Text style={styles.addToCartButtonText}>Add to Cart</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
       // marginBottom: 10,
        marginTop:-50,
    },
    productImage: {
        borderTopRightRadius:10,
        borderTopLeftRadius:12,

        width: 320,
        height: 320,
        resizeMode: 'contain',
    },
    leftButton: {
        left: -20,
        top:170,

    },
    dotsContainer: {
        flexDirection: 'row',
        marginTop: 50,
        marginLeft:-100,
    },
    dot: {
        width: 8,
        height: 8,
        marginHorizontal: 4,
        borderRadius:20,
    },
    rightButton: {
        right: -20,
        top:170,
    },
    productImage: {
        width: 320,
        height: 320,
        marginBottom: 100,
    },
    imageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    navButton: {
        position: 'absolute',
        top: '50%',
        transform: [{ translateY: -12 }],
        zIndex: 1,    
    },

    quantity: {
        fontSize: 16,
        marginBottom: 10,
        marginTop:-30,
    },
    quantityContainer: {
        flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 100,
    },
    quantityButton: {
        borderWidth: 1,
        borderColor: 'black',
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginHorizontal: 10,
    },
});

export default AddToCart;
