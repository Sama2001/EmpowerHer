// HomeScreen.js

import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ImageBackground ,Image,Animated} from 'react-native';

const HomeScreen = ({ navigation }) => {

  const [animation] = useState(new Animated.Value(0));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Start the animation when the component mounts
    startAnimation();

    // Simulate loading delay (remove this in production)
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 5000); // Increased duration to 3 seconds

    // Clean up timeout
    return () => clearTimeout(timeout);
  }, []);

  const startAnimation = () => {
    Animated.loop(
      Animated.timing(animation, {
        toValue: 1,
        duration: 7000, // Adjust duration as needed
        useNativeDriver: true,
      })
    ).start();
  };

  const animatedStyles = {
    opacity: animation.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 1, 0],
    }),
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
       {/* <Animated.Text style={[styles.title, styles.animatedTitle, animatedStyles]}>EmpowerHer</Animated.Text> */}
       <Animated.Image
          source={require('../assets/logo1.png')} // Replace 'path_to_your_logo.png' with the actual path to your logo image
          style={[styles.Alogo, animatedStyles]}
        />
      
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Add Image component for the logo */}
      <Image
        source={require('../assets/logo1.png')} // Replace 'logo.png' with the actual path to your logo image
        style={styles.logo}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.signupText}>Don't have an account?</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Signup')}
        >
          <Text style={styles.buttonText}>Signup</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
 
  container: {
   // backgroundColor:'#eeddd9',
    backgroundColor: 'hsla(0, 15%, 90%, 0.3)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'rgba(187, 123, 107, 0.79)', 
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: 300,
    alignItems: 'center',
  },

  title: {
    fontFamily: 'Helvetica',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff', // white
    marginTop: 130, // Adjust as needed
    marginLeft:130,
    marginBottom:80,
  },
  signupText: {
    marginTop: 20, // Adjust as needed for spacing
    fontSize: 16,
    color: '#6b6c6e',
    
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffff', 
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop:10,
  },
  logo: {
    width: 200, // Adjust width and height as needed
    height: 200,
    alignSelf: 'center', // Center the logo horizontally
    marginTop: -150, // Adjust as needed for spacing
    marginBottom:70,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffff', // Background color for the loading screen
  },
  Alogo: {
    marginBottom:100,
    width: 250, // Adjust width and height as needed
    height: 250,
  },
});

export default HomeScreen;
