//app.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import MenuScreen from './screens/MenuScreen';
import AboutScreen from './screens/AboutScreen';
import ProfileScreen from './screens/ProfileScreen';
import FirstPage from './screens/Firstpage';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="First" component={FirstPage} />


      </Stack.Navigator>
    </NavigationContainer>
  );
}






/*import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');*/

 /* const handleRegister = async () => {
      // Validate email format on the frontend
      if (!emailValidator.validate(email)) {
          return Alert.alert('Error', 'Invalid email format');
      }

      // Ensure all fields are provided
      if (!email || !password || !firstName || !lastName) {
          return Alert.alert('Error', 'Please provide all required fields');
      }

      try {
          const response = await fetch('http://192.168.1.120:3000/register', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email, password, firstName, lastName }),
          });
          const data = await response.json();
          if (data.success) {
              Alert.alert('Success', data.message);
              // Optionally, you can clear the input fields after successful registration
              setEmail('');
              setPassword('');
              setFirstName('');
              setLastName('');
          } else {
              Alert.alert('Error', data.message);
          }
      } catch (error) {
          console.error('Error:', error);
      }
  };*/

  /*const handleLogin = async () => {
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
        Alert.alert('Success', data.message);
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };*/

  /*return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
                style={styles.input}
                placeholder="First Name"
                value={firstName}
                onChangeText={setFirstName}
            />
            <TextInput
                style={styles.input}
                placeholder="Last Name"
                value={lastName}
                onChangeText={setLastName}
            />
            <Button title="Register" onPress={handleRegister} />
            <Button title="Login" onPress={handleLogin} />
    </View>
  );*/
//}

/*const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '80%',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
}
);*/