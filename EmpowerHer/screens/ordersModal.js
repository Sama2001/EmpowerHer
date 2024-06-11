import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, ScrollView } from 'react-native';

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


{/* {orders && orders.length > 0 ? (
            orders.map((order, index) => (
              <View key={index} style={styles.orderContainer}>
                <Text style={styles.orderTitle}>Order {index + 1}</Text>
                <Text>Quantity: {order.quantity}</Text>
                <Text>Product Id: {order.productId}</Text>
                <Text>Country: {order.Country} {order.country}</Text>
                <Text>Date: {order.date} </Text>


              </View>
            ))
          ) : (
            <Text style={styles.noOrdersText}>No orders found</Text>
          )}*/}

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

        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Close Modal</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
};

export default OrdersModal;
