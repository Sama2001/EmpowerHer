import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, Alert } from 'react-native';
import axios from 'axios';
import { StoreScreenStyles as styles } from '../styles/storeStyles'; // Import styles

const AdminStoreScreen = ({ navigation, route }) => {
  const { authToken, memberId, userId } = route.params;
  const [products, setProducts] = useState([]);
  const [pickedImages, setPickedImages] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

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
    // Implement pickImage logic as before
  };

  const addProduct = async (values) => {
    // Implement addProduct logic as before
  };

  // Dropdown menu component for all products
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

    const handleEditProduct = () => {
      navigation.navigate('EditProduct', { productId, authToken });
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

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        numColumns={2}
        keyExtractor={(item) => item._id}
        columnWrapperStyle={styles.columnWrapper}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.productContainer}
            onPress={() => navigation.navigate('ProductDetails', { productId: item._id, authToken, userId })}
          >
            {item.images.length > 0 && (
              <Image source={{ uri: item.images[0] }} style={styles.productImage} />
            )}
            <Text>{item.productName}</Text>
            <Text>₪{item.price}</Text>

            {item.quantity == 0 && (
            <Text style={styles.soldOutLabel}>Sold Out</Text>
             )}

            <View style={styles.editButtonContainer}>
              <TouchableOpacity style={styles.editButton} onPress={() => setShowDropdown(item._id)}>
                <Text style={styles.editButtonText}>...</Text>
              </TouchableOpacity>
              {showDropdown === item._id && <DropdownMenu productId={item._id} />}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default AdminStoreScreen;
