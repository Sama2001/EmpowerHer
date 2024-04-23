// AboutScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated,Image } from 'react-native';

const AboutScreen = ({ navigation }) => {
  const [animation] = useState(new Animated.Value(0));
  const [isLoading, setIsLoading] = useState(true);

  /*useEffect(() => {
    // Start the animation when the component mounts
    startAnimation();

    // Simulate loading delay (remove this in production)
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 4000); // Increased duration to 3 seconds

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
       <Animated.Image
          source={require('../assets/logo1.png')} // Replace 'path_to_your_logo.png' with the actual path to your logo image
          style={[styles.logo, animatedStyles]}
        />
      
      </View>
    );
  }*/

  // After loading is complete, render the About screen
  return (

    <View style={styles.container}>
      <Text>You are on the About Screen!</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.buttonContainer}>
        <Text style={styles.button}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#cc6699',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  button: {
    padding: 10,
   // backgroundColor: 'blue',
    color: 'white',
    borderRadius: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffff', // Background color for the loading screen

  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  logo: {
    width: 250, // Adjust width and height as needed
    height: 250,
  },
 /* animatedTitle: {
    textAlign: 'center',
    margin:150,
    width: '100%', // Make the text centered  
  },*/
});

export default AboutScreen;
