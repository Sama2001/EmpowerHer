import React, { useState, useRef,useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Animated,Image,Alert } from 'react-native';
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
  const [memberId, setMemberId] = useState(null);

  const handleLogout = async () => {
    try {
      // Clear authentication token from AsyncStorage
      await AsyncStorage.removeItem('authToken');
      Alert.alert('Logging out');
      // Navigate back to the login screen
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error removing authentication token:', error);
    }
  };

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


  const fetchMemberIdByEmail = async (email) => {
    try {
      const response = await fetch(`http://192.168.1.120:3000/members/${email}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authToken,
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch member data');
      }
  
      const data = await response.json();
  
      if (data && data.memberId) {
        setMemberId(data.memberId);
      } else {
        Alert.alert('Error', 'Member not found');
      }
    } catch (error) {
      console.error('Error fetching member ID:', error);
      Alert.alert('Error', 'An error occurred while fetching member ID');
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
                   fetchMemberIdByEmail(email);

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

  const navigateToProfile = async() => {

   navigation.navigate('Profile', {authToken});

  };

  const navigateToMembership = async() => {

    navigation.navigate('Member', {authToken});
 
   };

   
  const navigateToVolunteer = async() => {

    navigation.navigate('volunteer', {authToken});
 
   };

   const navigateToTasks = () => {
    if (memberId) {
      navigation.navigate('tasks', { authToken, memberId });
    } else {
      
      Alert.alert('Error', 'Member ID not found');
    }
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
        <TouchableOpacity style={styles.profileButton} onPress={navigateToProfile}>
        <View style={styles.profileInfoContainer}>
        {profilePicture && <Image source={{ uri: profilePicture }} style={styles.profilePicture} />}
        <Text style={styles.menuItemText}>
      {firstName !== '' && lastName !== '' ? `${firstName} ${lastName} ` : 'Loading...'}
    </Text>
        </View>
  </TouchableOpacity>

  <TouchableOpacity style={styles.MemberButton} onPress={navigateToMembership}>
       
        <Text style={styles.menuItemText}> Membership </Text>
  </TouchableOpacity>

  <TouchableOpacity style={styles.OpButton} onPress={navigateToVolunteer}>
       
       <Text style={styles.menuItemText}> Opportunities </Text>
 </TouchableOpacity>

 <TouchableOpacity style={styles.TasksButton} onPress={navigateToTasks}>
       
       <Text style={styles.menuItemText}> Tasks </Text>
 </TouchableOpacity>

 <View style={styles.contentContainer}>
         
 
          
        </View>

  <TouchableOpacity style={styles.logout} onPress={handleLogout}>
    <MaterialIcons name="exit-to-app" size={24} color="#a86556" style={styles.menuItemIcon} />
    <Text style={styles.menuItemText}>Logout</Text>
  </TouchableOpacity>



      </Animated.View>
    </View>
  );
};


export default FirstPage;
