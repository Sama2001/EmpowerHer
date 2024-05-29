import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create the CartContext
const CartContext = createContext();

// Create a provider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Function to save cart items to AsyncStorage
  const saveCartItems = async (items) => {
    try {
      await AsyncStorage.setItem('cartItems', JSON.stringify(items));
    } catch (error) {
      console.error('Error saving cart items:', error);
    }
  };

  {/*  const resetCart = async () => {
    try {
      await AsyncStorage.removeItem('cartItems');
      setCartItems([]);
    } catch (error) {
      console.error('Error resetting cart:', error);
    }
  }; */}

  // Function to retrieve cart items from AsyncStorage
  const loadCartItems = async () => {
    try {
      const storedItems = await AsyncStorage.getItem('cartItems');
      if (storedItems !== null) {
        setCartItems(JSON.parse(storedItems));
      }
    } catch (error) {
      console.error('Error loading cart items:', error);
    }
  };

  // Load cart items when the component mounts
  useEffect(() => {
    loadCartItems();
  }, []);

  // Function to get the cart items for a specific user
  const getCart = (userId) => {
    return cartItems.filter(item => item.userId === userId);
  };

  // Function to add an item to the cart
  const addToCart = (userId, item) => {
    const updatedCart = [...cartItems, { ...item, userId }];
    setCartItems(updatedCart);
    saveCartItems(updatedCart);
  };

  // Function to remove an item from the cart
  const removeFromCart = (userId, itemId) => {
    const updatedCart = cartItems.filter(item => !(item.userId === userId && item._id === itemId));
    setCartItems(updatedCart);
    saveCartItems(updatedCart);
  };

  return (
    <CartContext.Provider value={{ cartItems, getCart, addToCart, removeFromCart}}>
      {children}
    </CartContext.Provider>
  );
};

// Create a custom hook to use the CartContext
export const useCart = () => {
  return useContext(CartContext);
};
