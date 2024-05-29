// AddProductScreen.js

import React, { useState,useEffect } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Image, Alert,TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const AddProduct = ({ navigation, route }) => {
    const { authToken, memberId } = route.params;
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [quantity, setQuantity] = useState('');
    const [pickedImages, setPickedImages] = useState([]);
    const [products, setProducts] = useState([]);
    
    const fetchProducts = async () => {
        try {
          const response = await axios.get('http://192.168.1.120:3000/products', {
            headers: {
              'Authorization': authToken,
            },
          });
          setProducts(response.data.products);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };

     const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'You need to grant camera roll permissions to add a product image.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPickedImages([...pickedImages, result.assets[0].uri]);
    }
  };

  const addProduct = async (values) => {
    const parsedPrice = parseFloat(values.price.trim()); // Trim leading and trailing whitespaces
    console.log('Parsed price:', parsedPrice);
    
    if (isNaN(parsedPrice)) {
      Alert.alert('Error', 'Please enter a valid price');
      return;
    }
  
    if (pickedImages.length === 0) {
      Alert.alert('Error', 'Please pick at least one image');
      return;
    }
  
    const formData = new FormData();
    pickedImages.forEach((image, index) => {
      const uriParts = image.split('.');
      const fileType = uriParts[uriParts.length - 1];
  
      formData.append('images', {
        uri: image,
        name: `Product_${index}.${fileType}`,
        type: `image/${fileType}`,
      });
    });
    formData.append('memberId', memberId);
    formData.append('productName', values.productName);
    formData.append('description', values.description);
    formData.append('price', parsedPrice);
    formData.append('category', values.category);
    formData.append('quantity', values.quantity);
  
    try {
      const response = await axios.post('http://192.168.1.120:3000/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': authToken,
        },
      });
  
      if (response.data.success) {
        Alert.alert('Success', 'Product added successfully');
        setPickedImages([]);
        setDescription('');
        setCategory('');
        setPrice('');
        setProductName('');
        setQuantity('');
        fetchProducts();

      } else {
        Alert.alert('Error', response.data.message);
      }
    } catch (error) {
      console.error('Error adding product:', error);
      Alert.alert('Error', 'Failed to add product');
    }
  };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add Product</Text>
       
            <TextInput
                style={styles.input}
                placeholder="Product Name"
                value={productName}
                onChangeText={(text) => setProductName(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Description"
                value={description}
                onChangeText={(text) => setDescription(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Price"
                keyboardType="numeric"
                value={price}
                onChangeText={(text) => setPrice(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Category"
                value={category}
                onChangeText={(text) => setCategory(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Quantity"
                value={quantity}
                onChangeText={(text) => setQuantity(text)}
            />
           {/*<Button title="Pick Images" onPress={pickImage} />*/} 
            <TouchableOpacity   onPress={pickImage} style={styles.Button}>
            <Text style={styles.ButtonText}>Pick Images</Text>
          </TouchableOpacity>
            <View style={styles.imagePreview}>
                {pickedImages.map((imageUri, index) => (
                    <Image key={index} source={{ uri: imageUri }} style={styles.image} />
                ))}
            </View>

            
           {/*<Button 
  title="Add Product" 
  onPress={() => addProduct({ productName, description, price, category, quantity })} 
/>   */}      

<TouchableOpacity   onPress={() => addProduct({ productName, description, price, category, quantity })} 
 style={styles.button}>
            <Text style={styles.buttonText}>Add Product</Text>
          </TouchableOpacity>

 
          


        </View>
        
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'hsla(0, 15%, 100%, 0.7)',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 20,
      borderWidth: 4,
      borderRadius: 30,
      margin: 5,
      borderColor: '#a86556',
    },
    title: {
        fontSize: 24,
        marginTop:-50,
        marginBottom: 70,
        color:'gray',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        width: '100%',
    },
    imagePreview: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 10,
    },
    image: {
        width: 100,
        height: 100,
        margin: 5,
    },
    button: {
      backgroundColor: 'rgba(187, 123, 107, 0.79)',
      borderRadius: 8,
      padding: 12,
      marginTop: 60,
      width: 250,
      alignItems: 'center',
      borderRadius: 50,
    },
    buttonText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#ffff',
    },
    Button: {
      backgroundColor: '#ffff',
      borderRadius: 5,
      padding: 10,
      marginTop: 10,
      //marginRight:100,
      width: 250,
      alignItems: 'center',
      borderColor:'rgba(187, 123, 107, 0.79)',
      borderWidth:1,
      //borderRadius: 50,
    },
    ButtonText: {
      fontSize: 15,
      fontWeight: 'bold',
      color: 'rgba(187, 123, 107, 0.79)',
    },
});

export default AddProduct;
