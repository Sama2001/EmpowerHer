import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Assuming you are using Expo for vector icons

const SalesModal = ({ visible, sales, onClose }) => {

  const [productNames, setProductNames] = useState({});

  const fetchProductName = async (productId) => {
    try {
      const response = await fetch(`http://192.168.1.120:3000/product/${productId}`);
      const data = await response.json();
      if (data.success) {
        const { productName } = data.product; // Assuming your product object has a 'productName' field
        return productName;
      } else {
        console.error('Failed to fetch product details:', data.message);
        return 'Product Name Unavailable'; // Default name if fetch fails
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      return 'Product Name Unavailable'; // Default name if fetch fails
    }
  };

  const fetchProductNames = async () => {
    const productNamesMap = {};
    for (const sale of sales) {
      const productName = await fetchProductName(sale.productId);
      productNamesMap[sale.productId] = productName;
    }
    setProductNames(productNamesMap);
  };

  useEffect(() => {
    if (visible && sales.length > 0) {
      fetchProductNames();
    }
  }, [visible, sales]);

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <Text style={styles.title}>Sales </Text>

        <ScrollView contentContainerStyle={styles.scrollView}>
          {sales.length > 0 && (
            sales.map((sale, index) => (
              <View key={index} style={styles.saleContainer}>
                  <Text style={styles.label}>Product ID:</Text>
                  <Text style={styles.text}>{sale.productId}</Text>

                  <Text style={styles.label}>Product Name:</Text>
                  <Text style={styles.text}>{productNames[sale.productId] || 'Loading...'}</Text>

                <Text style={styles.label}>Quantity:</Text>
                <Text style={styles.text}>{sale.quantity}</Text>
              

              </View>
            ))
          )}
        </ScrollView>

        <View style={styles.closeButtonContainer2}>
        <TouchableOpacity onPress={onClose} style={styles.CloseButton}>
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>

{/**  <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Close Modal</Text>
        </TouchableOpacity>*/}
       
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'hsla(0, 15%, 100%, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderRadius: 30,
    //margin: 20,
    marginTop:50,
    borderColor: '#a86556',
  },
  closeButtonText: {
    fontSize: 16,
    color: 'blue',
  },
  closeButtonContainer2: {
    position: 'absolute',
    top:18,
    right:25,
  },
  CloseButton:{
    
    padding: 3,
    borderRadius:10,
    backgroundColor: 'rgba(187, 123, 107, 0.6)',

  },

  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  scrollView: {
    alignItems: 'center',
    height:1500,

  },
  saleContainer: {
    marginBottom: 20,
    borderWidth: 1,
    padding: 10,
    width: 300,
    borderRadius: 10,
    alignItems: 'center',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    marginBottom: 5,
  },
  closeButton: {
    marginTop: 20,
  },
  closeButtonText: {
    fontSize: 16,
    color: 'blue',
  },
});

export default SalesModal;
