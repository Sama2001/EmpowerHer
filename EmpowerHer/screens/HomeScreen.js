// HomeScreen.js

import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ImageBackground ,Image,Animated} from 'react-native';
import { homeScreenStyles as styles} from '../styles/HomeScreenStyles'; // Import the styles from HomeScreenStyles.js

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
          style={styles.buttonS}
          onPress={() => navigation.navigate('Signup')}
        >
          <Text style={styles.buttonText1}>Signup</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};



export default HomeScreen;
