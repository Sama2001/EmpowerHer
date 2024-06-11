import React from 'react';
import { Modal, View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const SalesModal = ({ visible, sales, onClose }) => {
  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <Text style={styles.title}>Sales Modal</Text>

        <ScrollView contentContainerStyle={styles.scrollView}>
          {sales.length > 0 && (
            sales.map((sale, index) => (
              <View key={index} style={styles.saleContainer}>
                <Text style={styles.label}>Quantity:</Text>
                <Text style={styles.text}>{sale.quantity}</Text>
                <Text style={styles.label}>Product ID:</Text>
                <Text style={styles.text}>{sale.productId}</Text>
              </View>
            ))
          )}
        </ScrollView>

        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Close Modal</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
