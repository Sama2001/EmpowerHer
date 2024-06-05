// AddProductScreen.js

import React, { useState,useEffect } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Image, Alert,ScrollView,TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons';
import { AddProductScreenStyles as styles } from '../styles/AddproductStyles'; // Import styles

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
    const categories = ['Clothes And Crochet', 'Food', 'Home','Accessories']; // List of selectable categories
    const [showDropdown, setShowDropdown] = useState(false);

    const handleCategoryPress = () => {
        setShowDropdown(!showDropdown);
    };

    const handleCategorySelect = (selectedCategory) => {
        setCategory(selectedCategory);
        setShowDropdown(false);
    };
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
           <TouchableOpacity style={styles.input1} onPress={handleCategoryPress}>
           <Text style={[styles.categoryText, !category && styles.defaultCategoryText]}>
        {category || 'Select Category'}
    </Text>
                    <FontAwesome name="caret-down" size={20} color="black" style={styles.arrowIcon}/>
            </TouchableOpacity>
            {showDropdown && (
               <ScrollView style={styles.dropdown}>
               {categories.map((item, index) => (
                   <TouchableOpacity key={index} style={styles.dropdownItem} onPress={() => handleCategorySelect(item)}>
                       <Text>{item}</Text>
                   </TouchableOpacity>
               ))}
           </ScrollView>
            )}
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



export default AddProduct;
