import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const EditProductScreen = ({ navigation, route }) => {
  const { authToken } = route.params;
  const productId = route.params.productId; // Get productId from route params

  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');

  useEffect(() => {
    fetchProductDetails();
  }, []);

  const fetchProductDetails = async () => {
    try {
      const response = await fetch(`http://192.168.1.120:3000/product/${productId}`, {
        method: 'GET',
        headers: {
          'Authorization': authToken,
          'Content-Type': 'application/json' // You may need to adjust the content type based on your backend requirements
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch product details');
      }
  
      const data = await response.json();
  
      const product = data.product;
      setProductName(product.productName);
      setDescription(product.description);
      setPrice(product.price.toString()); // Convert price to string
      setCategory(product.category);
      setQuantity(product.quantity.toString()); // Convert quantity to string
    } catch (error) {
      console.error('Error fetching product details:', error);
      Alert.alert('Error', error.message);
    }
  };
  
  

  const handleUpdateProduct = async () => {
    try {
      const response = await fetch(`http://192.168.1.120:3000/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authToken,
        },
        body: JSON.stringify({
          productName,
          description,
          price: parseFloat(price), // Convert price back to float
          category,
          quantity: parseInt(quantity), // Convert quantity back to integer
        }),
      });
  
      // Debug: Log the response status and text
      console.log('Response status:', response.status);
      const responseText = await response.text();
      console.log('Response text:', responseText);
  
      if (!response.ok) {
        Alert.alert('Error', `Failed to update product: ${responseText}`);
        return;
      }
  
      const data = JSON.parse(responseText);
  
      if (data.success) {
        Alert.alert('Success', 'Product updated successfully');
        //fetchProductDetails();
        //navigation.goBack(); // Navigate back to the previous screen after successful update
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      console.error('Error updating product:', error);
      Alert.alert('Error', 'Failed to update product');
    }
  };
  

  return (
    <View style={styles.container}>
      <Text>Edit Product</Text>
      <TextInput
        style={styles.input}
        placeholder="Product Name"
        value={productName}
        onChangeText={setProductName}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
     <View style={styles.inputContainer}>

  <TextInput
    style={styles.input}
    placeholder="Price"
    keyboardType="numeric"
    value={price}
    onChangeText={setPrice}
  />
</View>
      <TextInput
        style={styles.input}
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
      />
      <TextInput
        style={styles.input}
        placeholder="Quantity"
        keyboardType="numeric"
        value={quantity}
        onChangeText={setQuantity}
      />
      <Button title="Update Product" onPress={handleUpdateProduct} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center', // Align items vertically in the center
  },
  currency: {
    fontSize: 16, // Adjust size as needed
    
  },
});

export default EditProductScreen;
