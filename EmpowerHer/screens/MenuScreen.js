import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TouchableOpacity, StyleSheet, Alert ,Image} from 'react-native';

const LoggedInScreen = ({ navigation, route }) => {
  const { authToken} = route.params; // Add this line to define authToken state

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

  const navigateToPage1 = () => {
    navigation.navigate('About');
  };

  const navigateToPage2 = () => {
    navigation.navigate('Login');
  };

  const navigateToPage3 = () => {
    navigation.navigate('Signup');
  };
  const navigateToPage4 = () => {
    navigation.navigate('Profile', { authToken });
  };
  

  return (
    <View style={styles.container}>
        <Image
        source={require('../assets/logo1.png')} // Replace 'logo.png' with the actual path to your logo image
        style={styles.logo}
      />
     {/*<Text>You are logged in!</Text>*/} 
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuButton} onPress={() => navigateToPage1('About')}>
          <Text style={styles.menuButtonText}>Page 1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton} onPress={() => navigateToPage2('Login')}>
          <Text style={styles.menuButtonText}>Page 2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton} onPress={() => navigateToPage3('Signup')}>
          <Text style={styles.menuButtonText}>Page 3</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton} onPress={() => navigateToPage4('Profile', { authToken })}>

          <Text style={styles.menuButtonText}>Profile</Text>
       </TouchableOpacity> 
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    margin:7,
    borderWidth:5,
    borderRadius:20,
    borderColor:'#a86556',

  },
  menuContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 20,
    marginTop:-19,
  },
  menuButton: {
    width: 350,
    height: 50,
    //backgroundColor: 'rgba(187, 123, 107, 0.79)',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderBottomWidth:2,
    borderBottomEndRadius:10,
    borderBottomColor:'#6b6c6e',
  },
  menuButtonText: {
    color: '#a86556',
    fontWeight: 'bold',
  },
  logoutButton: {
    width: 300,
    height: 40,
    marginTop: 60,
   // backgroundColor: 'rgba(187, 123, 107, 0.79)',
   borderWidth:1.5,
    borderColor:'rgba(187, 123, 107, 0.79)',
    borderRadius:10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,

  },
  logoutButtonText: {
    color: '#6b6c6e',
    fontWeight: 'bold',
  },
  logo: {
    width: 200, // Adjust width and height as needed
    height: 200,
    alignSelf: 'center', // Center the logo horizontally
    marginTop: -100, // Adjust as needed for spacing
    marginBottom:70,
  },
});

export default LoggedInScreen;