import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert, TouchableOpacity, StyleSheet,Animated ,Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from expo/vector-icons
import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome icons

import emailValidator from 'email-validator';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { loginScreenStyles as styles } from '../styles/LoginScreenStyles'; // Import styles

const LoginScreen = ({ navigation,route }) => {
  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [eyeIconColor, setEyeIconColor] = useState('gray');
  const [authTokenl] = useState('');


 
  const handleLogin = async () => {

    try {

      const response = await fetch('http://192.168.1.120:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      
      if (data.success) {

        const token = data.token;
       
        if (token) {
          // Store token and its expiration time in AsyncStorage
          const expirationTime = new Date().getTime() + '1h'; // 5 seconds
          await AsyncStorage.setItem('authToken', token);
          //setAuthToken(token); // Set authToken state or update context if using state management
          await AsyncStorage.setItem('authTokenExpiration', expirationTime.toString());
          Alert.alert('Success', data.message);
          console.log(email);

             setEmail('');
            setPassword('');
          navigation.navigate('First',{ authToken: token  });

        } else {
          Alert.alert('Error', 'Token not received from server');
        }
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  

  const checkTokenExpiration = async () => {
    const expirationTime = await AsyncStorage.getItem('authTokenExpiration');
    if (expirationTime && new Date().getTime() > parseInt(expirationTime)) {
      // Token has expired, clear token and navigate to login screen
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('authTokenExpiration');
      navigation.navigate('Login');
      Alert.alert('Session Expired', 'Your session has expired. Please log in again.');
    }
  };

  
useEffect(() => {
    const intervalId = setInterval(checkTokenExpiration, 1000); // Check every second
    return () => clearInterval(intervalId);
  }, []);

  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    setEyeIconColor(showPassword ? 'gray' : 'black');
  };

  

  return (
    
    <View style={styles.container}>
            <Text style={styles.title}>Welcome back</Text>

            <View style={styles.inputContainer}>
      <FontAwesome name="envelope" size={19} color="#a86556" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
    </View>
         

      <View style={styles.inputContainer}>
        <FontAwesome name="lock" size={23} color="#a86556" style={styles.icon} />
        <TextInput
          style={[styles.input, styles.passwordInput]}
          placeholder="Password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.eyeIcon} onPress={togglePasswordVisibility}>
          <Ionicons
            name={showPassword ? 'eye-off' : 'eye'}
            size={24}
            color="#a86556"
          />
        </TouchableOpacity>
      </View>


    <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

    </View>
  );
};

export default LoginScreen;
