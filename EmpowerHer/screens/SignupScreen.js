//SignupScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet,TouchableOpacity,Text } from 'react-native';
import emailValidator from 'email-validator';
import GoogleSignIn from './google';
import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome icons
const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');

  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [confirm, setConfirm] = useState('');



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
    <View style={styles.inputContainer}>
      <FontAwesome name="lock" size={24} color="#a86556" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    
  },

  button:{
    backgroundColor: 'rgba(187, 123, 107, 0.79)', 
    borderRadius: 8,
    padding:12,
    marginTop: 10,
    width: 250,
    alignItems: 'center',
    borderRadius:50,
    
  },

  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffff', 
  },

  icon: {
    position: 'absolute',
    left: 10, // Adjust the left position as needed
  },
  inputContainer: {
 backgroundColor:'#ffff',
    width:'85%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 17,
   
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingLeft: 40, // Added padding to align text after the icon
  },
  title: {
    color:'#6b6c6e',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop:-60,
    marginBottom: 50, // Adjust as needed for spacing
  
  },
});

export default SignupScreen; 