import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList, Image, Alert, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { StoreScreenStyles as styles } from '../styles/storeStyles'; // Import styles
import axios from 'axios';

const StoreScreen = ({ navigation, route }) => {
    const { authToken, memberId,userId } = route.params;
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [quantity, setQuantity] = useState('');
    const [products, setProducts] = useState([]);
    const [pickedImages, setPickedImages] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = (productId) => {
      setShowDropdown(showDropdown === productId ? null : productId);
    }

  useEffect(() => {
    fetchProducts();
  }, []);

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
        fetchProducts();
        setPickedImages([]);
        setShowForm(false);
      } else {
        Alert.alert('Error', response.data.message);
      }
    } catch (error) {
      console.error('Error adding product:', error);
      Alert.alert('Error', 'Failed to add product');
    }
  };
  


   const DropdownMenu = ({ productId }) => {
    const handleDeleteProduct = async () => {
      try {
        const response = await fetch(`http://192.168.1.120:3000/product/${productId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': authToken, // Assuming authToken is defined
          },
        });
    
        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(`Failed to delete product: ${errorMessage}`);
        }
        fetchProducts();
        Alert.alert('Success', 'Product deleted successfully');
        // Handle navigation or other UI updates after successful deletion
      } catch (error) {
        console.error('Error deleting product:', error);
        Alert.alert('Error', 'Failed to delete product');
      }
    };

    const handleShowDetails = () => {
      navigation.navigate('ProductDetails', { productId, authToken, userId });
  };

  const handleEditProduct = ()=>{
    navigation.navigate('EditProduct', { productId, authToken }); // Navigate to EditProduct screen with product ID and auth token
   };

    return (
      <View style={styles.dropdown}>
        <TouchableOpacity style={styles.dropdownItem} onPress={handleEditProduct}>
          <Text>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.dropdownItem} onPress={handleDeleteProduct}>
          <Text>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.dropdownItem} onPress={handleShowDetails}>
              <Text>Show details</Text>
          </TouchableOpacity>
      </View>
    );
  };
 

const DropdownMenu2 = ({ productId }) => {
  const handleShowDetails = () => {
      navigation.navigate('ProductDetails', { productId, authToken, userId });
  };

  return (
      <View style={styles.dropdown}>
          <TouchableOpacity style={styles.dropdownItem} onPress={handleShowDetails}>
              <Text>Show details</Text>
          </TouchableOpacity>
      </View>
  );
};

  return (
    <View style={styles.container}>
     {/*<Text style={styles.title}>Store</Text> */} 
      

      <TouchableOpacity 
            style={styles.Button} 
            onPress={() => navigation.navigate('AddProduct', { authToken, memberId })}
            >        
            <Text style={styles.ButtonText}>+ Add Product</Text>
           </TouchableOpacity>

       {/**   <Button
    title="Add "
    onPress={() => navigation.navigate('AddProduct', { authToken, memberId })}
/> */}    
   

      <FlatList
        data={products}
        numColumns={2}
        keyExtractor={(item) => item._id}
        columnWrapperStyle={styles.columnWrapper}
        renderItem={({ item }) => (
            <TouchableOpacity 
            style={styles.productContainer} 
            onPress={() => navigation.navigate('ProductDetails', { productId: item._id, authToken,userId })}
        >        
         {/*  {item.images.map((imageUri, index) => (
              <Image key={index} source={{ uri: imageUri }} style={styles.productImage} />
            ))}*/} 
             {item.images.length > 0 && (
                            <Image source={{ uri: item.images[0] }} style={styles.productImage} />
                        )}
            <Text>{item.productName}</Text>
            <Text>₪{item.price}</Text>


            {item.memberId === memberId && ( // Check if the memberId matches the current userId
      <View style={styles.editButtonContainer}>
      <TouchableOpacity style={styles.editButton} onPress={() => toggleDropdown(item._id)}>
        <Text style={styles.editButtonText}>...</Text>
      </TouchableOpacity>
      {showDropdown === item._id && <DropdownMenu  productId={item._id}/>}
    </View>
    )}
    
{item.memberId !== memberId && ( // Check if the memberId doesn't match the current userId
      <View style={styles.editButtonContainer}>

          <TouchableOpacity style={styles.editButton}  onPress={() => toggleDropdown(item._id)}>
        <Text style={styles.editButtonText}>...</Text>
                            </TouchableOpacity>

      {showDropdown === item._id &&  <DropdownMenu2 productId={item._id} />}
     </View>
                        )}
           </TouchableOpacity> 


        )}


      />
    </View>
  );
};

export default StoreScreen;

{/*       <Button title="Add Product" onPress={() => setShowForm(!showForm)} />

      {showForm && (
        <View style={styles.form}>
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

          <Button title="Pick Images" onPress={pickImage} />
          <View style={styles.imagePreview}>
            {pickedImages.map((imageUri, index) => (
              <Image key={index} source={{ uri: imageUri }} style={styles.image} />
            ))}
          </View>
          <Button 
   title="Add Product" 
  onPress={() => addProduct({ productName, description, price, category, quantity })} 
/>

          
        </View>
      )}
      */}