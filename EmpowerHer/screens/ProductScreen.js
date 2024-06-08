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
        navigation.navigate('BuyNow', { authToken,product,userId});

       // Alert.alert('Purchased', `You have purchased ${product.productName}.`);
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
            <TouchableOpacity style={[styles.button, styles.buyButton]} onPress={handleBuyNow}>
                    <Text style={styles.buttonText}>Buy Now</Text>
                </TouchableOpacity>

            <TouchableOpacity style={styles.iconButton} onPress={handleAddToCart}>
            <Text style={styles.buttonText1}>Add to Cart</Text>
                    <Ionicons name="cart" size={24} color="#a86556" />
                    <Ionicons name="add" size={12} color="#a86556" style={styles.plusIcon} />
                </TouchableOpacity>
               
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: 'hsla(0, 15%, 100%, 0.7)',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        borderWidth: 4,
        borderRadius: 30,
        borderColor: '#a86556',

        margin: 5,
        height:700,

    },
    iconButton: {
        backgroundColor: 'white',
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#a86556',
       marginBottom:35,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    plusIcon: {
        position: 'absolute',
        top: 0,
        right: 70,
        fontSize: 16,
    },
    leftButton: {
        left: -20,
    },
    rightButton: {
        right: -20,
    },
    title: {
        fontSize: 24,
        marginBottom: 5,
        marginTop:12,
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
        
        marginTop:-30,
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
        marginBottom: 35,
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
        fontWeight: 'bold',
        flex: 1,
    },
    value: {
        flex: 2,
    },

    buttonContainer: {
        flexDirection: 'column',
        marginTop: 5,
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        marginVertical: 20,
    },
    buyButton: {
        backgroundColor: '#a86556',
        padding: 12,
        borderRadius: 5,
       marginTop:15,
         width:300,
        marginBottom:35,
        alignItems: 'center',
        justifyContent: 'center',

    },
    buttonText: {
        color: 'white',
        fontWeight:'bold',
        fontSize: 16,
        marginRight:10,
    },
    buttonText1: {
        color: 'grey',
        fontWeight:'bold',
        fontSize: 16,
        marginRight:15,
    },

});



export default ProductDetailsScreen;
