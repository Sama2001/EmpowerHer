import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, Alert,TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Expo for icons

const ProductDetailsScreen = ({ route ,navigation}) => {
    const { productId, authToken,userId } = route.params;
    const [product, setProduct] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        fetchProductDetails();
    }, []);

    const fetchProductDetails = async () => {
        try {
            const response = await axios.get(`http://192.168.1.120:3000/product/${productId}`, {
                headers: {
                    'Authorization': authToken,
                },
            });
            if (response.data.success) {
                setProduct(response.data.product);
            } else {
                Alert.alert('Error', response.data.message);
            }
        } catch (error) {
            console.error('Error fetching product:', error);
            Alert.alert('Error', 'Failed to fetch product details');
        }
    };

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

    const handleAddToCart = () => {
        navigation.navigate('AddToCart', { authToken,product,userId});
    };
    

    const handleBuyNow = () => {
        // Handle buy now functionality here
        Alert.alert('Purchased', `You have purchased ${product.productName}.`);
    };


    if (!product) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }



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

            <View style={styles.dotsContainer}>
                {product.images.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.dot,
                            { backgroundColor: index === currentImageIndex ? 'black' : 'lightgrey' }
                        ]}
                    />
                ))}
            </View>

            
            <View style={styles.detailsContainer}>
            <Text style={styles.price}>Price: ₪{product.price}</Text>

               
                {/* <Text style={styles.details}>Quantity: {product.quantity}</Text>*/}
            </View>

            <View style={styles.detailsContainer1}>
                <View style={styles.detailRow}>
                    <Text style={styles.label}>Description:</Text>
                    <Text style={styles.value}>{product.description}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.label}>Category:</Text>
                    <Text style={styles.value}>{product.category}</Text>
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
                    <Text style={styles.buttonText}>Add to Cart</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.buyButton]} onPress={handleBuyNow}>
                    <Text style={styles.buttonText}>Buy Now</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',

    },
    leftButton: {
        left: -20,
    },
    rightButton: {
        right: -20,
    },
    title: {
        fontSize: 24,
        marginBottom: 10,
        textAlign: 'center',
    },
    dotsContainer: {
        flexDirection: 'row',
        marginTop: 3,
    },
    dot: {
        width: 8,
        height: 8,
        marginHorizontal: 4,
        borderRadius:20,
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

    productImage: {
        borderTopRightRadius:10,
        borderTopLeftRadius:12,

        width: 320,
        height: 320,
        resizeMode: 'contain',
    },
   
    price:{
      marginTop:20,
      marginRight:220,
      fontWeight:'bold',
    },
    
    //Price///
    detailsContainer: {
        
        marginTop:-31,
        marginBottom:30,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth:1,
        borderColor:"lightgrey",
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
        width:320,
    },

    detailsContainer1: {
        flex: 1,
        marginBottom: 50,
        justifyContent: 'center',
        alignItems: 'flex-start',
        borderWidth: 1,
        borderColor: "lightgrey",
        borderRadius: 10,
        padding: 5,
        width: 320,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginVertical: 5,
    },
    label: {
        marginLeft:10,
        fontWeight: '400',
        flex: 1,
    },
    value: {
        flex: 2,
    },

    buttonContainer: {
        flexDirection: 'column',
        marginTop: 20,
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        marginVertical: 20,
    },
    buyButton: {
        backgroundColor: '#28a745',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },

});



export default ProductDetailsScreen;
