import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Assuming you are using Expo for vector icons

const OrdersModal = ({ visible, orders, onClose }) => {
  //console.log('Orders:', orders); // Log the orders prop
  const [products, setProducts] = useState([]);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await Promise.all(
          orders.map(async (order) => {
            const response = await fetch(`http://192.168.1.120:3000/product/${order.productId}`);
            const data = await response.json();
            return data.success ? data.product : null;
          })
        );
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [orders]);


  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <Text style={styles.title}>Orders Modal</Text>




        <ScrollView contentContainerStyle={styles.scrollView}>
         


{products.length > 0 ? (
            products.map((product, index) => (
              <View key={index} style={styles.orderContainer}>
                <Text style={styles.orderTitle}>Order {index + 1}</Text>
                <Text>Product Name: {product ? product.productName : 'Unknown'}</Text>
                <Text>Product ID: {orders[index].productId} </Text>
                <Text>Quantity: {orders[index].quantity}</Text>
                <Text>Country: {orders[index].Country} {orders[index].country} </Text>
                <Text>City: {orders[index].City} {orders[index].city} </Text>
                <Text>Date: {orders[index].date} </Text>
                <Text>Total Amount: ₪{orders[index].TotalAmount}{orders[index].totalAmount}</Text>

                {/* Add more order details as needed */}
              </View>
            ))
          ) : (
            <Text style={styles.noOrdersText}>No products found for the orders</Text>
          )}
        </ScrollView>

       

{/** <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Close Modal</Text>
        </TouchableOpacity> */}
        <View style={styles.closeButtonContainer2}>
        <TouchableOpacity onPress={onClose} style={styles.CloseButton}>
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>

      </View>
    </Modal>
  );
};

const styles = {
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
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  scrollView: {
    alignItems: 'center',
  },
  orderContainer: {
    marginBottom: 20,
    borderWidth: 1,
    padding: 10,
    width: 400,
    borderRadius: 10,
  },
  orderTitle: {
    fontWeight: 'bold',
  },
  noOrdersText: {
    marginBottom: 20,
  },
  closeButton: {
    marginTop: 20,
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
};

export default OrdersModal;
