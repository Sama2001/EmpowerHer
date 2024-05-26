import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, Alert } from 'react-native';
import axios from 'axios';

const ProductDetailsScreen = ({ route }) => {
    const { productId, authToken } = route.params;
    const [product, setProduct] = useState(null);

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


            <View style={styles.productImageContainer}>
            <FlatList
    data={[...product.images, product]}
    keyExtractor={(item, index) => index.toString()}
    renderItem={({ item }) => {
        if (typeof item === 'string') {
            return (
                <Image source={{ uri: item }} style={styles.productImage} />
            );
        } else {
            return (
                <View style={styles.detailsContainer}>
                    <Text style={styles.title}>{item.productName}</Text>
                    <Text style={styles.description}>{item.description}</Text>
                    <Text style={styles.details}>Price: ${item.price}</Text>
                    <Text style={styles.details}>Category: {item.category}</Text>
                    <Text style={styles.details}>Quantity: {item.quantity}</Text>
                </View>
            );
        }
    }}
/>

        </View>

          {/* <Text style={styles.description}>{product.description}</Text>
                    <Text style={styles.details}>Price: ${product.price}</Text>
                    <Text style={styles.details}>Category: {product.category}</Text>
                    <Text style={styles.details}>Quantity: {product.quantity}</Text>*/}  
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
    title: {
        fontSize: 24,
        marginBottom: 10,
        marginTop:30,
        textAlign: 'center',
    },
    productImage: {
        width: 200,
        height: 200,
       marginTop:50, 
       marginLeft:10,
},
    description: {
        marginBottom: 5,
        textAlign: 'center',
    },
    details: {
        marginBottom: 5,
        textAlign: 'center',
    },
    detailsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});



export default ProductDetailsScreen;
