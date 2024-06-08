//SignupScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet,TouchableOpacity,Text } from 'react-native';
import emailValidator from 'email-validator';
import GoogleSignIn from './google';
import { signupScreenStyles as styles } from '../styles/SignupScreenStyles'; // Import styles
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from expo/vector-icons
import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome icons

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [eyeIconColor, setEyeIconColor] = useState('gray');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [confirm, setConfirm] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    setEyeIconColor(showPassword ? 'gray' : 'black');
  };

  const handleRegister = async () => {
    // Validate email format on the frontend
    if (!emailValidator.validate(email)) {
        return Alert.alert('Error', 'Invalid email format');
    }

    // Ensure all fields are provided
    if (!email || !password || !firstName || !lastName ||!mobile||!confirm)   {
        return Alert.alert('Error', 'Please provide all required fields');
    }

    if (password !== confirm) {
      return Alert.alert('Error', 'Password and confirm password do not match');
    }

    try {
        const response = await fetch('http://192.168.1.120:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({firstName, lastName, email, password, mobile }),
        });
        const data = await response.json();
        if (data.success) {
            Alert.alert('Success', data.message);
            // Optionally, you can clear the input fields after successful registration
           
            setFirstName('');
            setLastName('');
             setEmail('');
            setPassword('');
            setConfirm('');
            setMobile('');
        } else {
            Alert.alert('Error', data.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

  return (
    <View style={styles.container}>
          <Text style={styles.title}>Sign Up</Text>
    <View style={styles.inputContainer}>
      <FontAwesome name="user" size={24} color="#a86556" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
    </View>
    <View style={styles.inputContainer}>
      <FontAwesome name="user" size={24} color="#a86556" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
    </View>
    <View style={styles.inputContainer}>
      <FontAwesome name="envelope" size={21} color="#a86556" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
    </View>
    {/*   <View style={styles.inputContainer}>
      <FontAwesome name="lock" size={24} color="#a86556" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
    </View>*/}
  

    <View style={styles.inputContainer}>
        <FontAwesome name="lock" size={23} color="#a86556" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.eyeIcon} onPress={togglePasswordVisibility}>
          <Ionicons
            name={showPassword ? 'eye' : 'eye-off'}
            size={24}
            color="#a86556"
          />
        </TouchableOpacity>
      </View>

    <View style={styles.inputContainer}>
      <FontAwesome name="lock" size={24} color="#a86556" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Confirm password"
        secureTextEntry
        value={confirm}
        onChangeText={setConfirm}
      />
    </View>
    <View style={styles.inputContainer}>
      <FontAwesome name="mobile" size={24} color="#a86556" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Mobile number"
        value={mobile}
        onChangeText={setMobile}
      />
    </View>


    <TouchableOpacity
          style={styles.button}
          onPress={handleRegister}
          >
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>

    


   
{/*<GoogleSignIn /> */}

  </View>

    
  );
};



export default SignupScreen; 