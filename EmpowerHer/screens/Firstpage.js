import React, { useState, useRef,useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Animated,Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; 
import * as SecureStore from 'expo-secure-store';

import { firstPageStyles as styles } from '../styles/FirstPageStyles'; 

const FirstPage = ({ navigation, route,result }) => {
  const { authToken, profilePicture: initialProfilePicture } = route.params;
  const [profilePicture, setProfilePicture] = useState(initialProfilePicture);
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const menuWidth = useRef(new Animated.Value(0)).current; 
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');



  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle menu visibility
    // Animate menu width
    Animated.timing(menuWidth, {
      toValue: isMenuOpen ? 0 : 200, // Adjust the width as needed
      duration: 300, // Duration of the animation
      useNativeDriver: false,
    }).start();
  };

////////////////
  const loadProfilePicture = async () => {
    try {
      const uriString = await SecureStore.getItem('profilePictureURI');
      if (uriString !== null) {
        setProfilePicture(uriString); // Use URI string directly
      }
    } catch (error) {
      console.error('Error loading profile picture:', error);
    }
  };

  const fetchUserInfo = async () => {
    try {

        if (!authToken) {
            console.error('Error: authToken is not provided');
            return;
        }
        const token = authToken; 
        const response = await fetch('http://192.168.1.120:3000/Gprofile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            }
        });
        const data = await response.json();
        if (data.success) {
            const { firstName, lastName,email,mobile } = data.user;
            setFirstName(firstName);
            setLastName(lastName);
            setEmail(email);
            setMobile(mobile);
           
        } else {
            Alert.alert('Error', data.message);
        }
    } catch (error) {
        console.error('Error fetching user info:', error);
        Alert.alert('Error', 'An error occurred while fetching user info');
    }
};

useEffect(() => {
  fetchUserInfo();
  loadProfilePicture();
}, ); 

  const navigateToPage4 = async() => {

   navigation.navigate('Profile', { authToken});

  };

  return (
    <View style={styles.container}>
      {/* Menu Button */}
      <TouchableOpacity style={styles.menuIconContainer} onPress={toggleMenu}>
        <MaterialIcons name="menu" size={30} color="#a86556" />
      </TouchableOpacity>
      
      {/* Content */}
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.contentContainer}>
          {/* Add your content here */}
        </View>
      </ScrollView>

      {/* Menu */}
      <Animated.View style={[styles.menuContainer, { width: menuWidth }]}>
        {/* Profile Button */}
        <TouchableOpacity style={styles.profileButton} onPress={navigateToPage4}>
        <View style={styles.profileInfoContainer}>
        {profilePicture && <Image source={{ uri: profilePicture }} style={styles.profilePicture} />}
        <Text style={styles.menuItemText}>
      {firstName !== '' && lastName !== '' ? `${firstName} ${lastName}` : 'Loading...'}
    </Text>
        </View>
  </TouchableOpacity>
        
        {/* Other Menu Items */}
        {/* Add more menu items as needed */}
      </Animated.View>
    </View>
  );
};


export default FirstPage;
