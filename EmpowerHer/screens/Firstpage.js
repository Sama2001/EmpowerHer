import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Animated } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // Import MaterialIcons

const FirstPage = ({ navigation, route }) => {
  const { authToken} = route.params;
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to track menu visibility
  const menuWidth = useRef(new Animated.Value(0)).current; // Animated value for menu width

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle menu visibility
    // Animate menu width
    Animated.timing(menuWidth, {
      toValue: isMenuOpen ? 0 : 200, // Adjust the width as needed
      duration: 300, // Duration of the animation
      useNativeDriver: false,
    }).start();
  };

  const navigateToPage4 = async() => {

   navigation.navigate('Profile', { authToken });

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
          <Text style={styles.menuItemText}>Profile</Text>
        </TouchableOpacity>
        
        {/* Other Menu Items */}
        {/* Add more menu items as needed */}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'white',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  contentContainer: {
    // Add your content container styles
  },
  profileButton: {
    position: 'absolute',
    top: 70,
    left: 5,
    padding: 10,
    borderRadius: 10,
    borderBottomWidth:2,
    borderColor:'#a86556',
    width:150,
    zIndex: 2, // Ensure the profile button is above the menu
  },
  menuIconContainer: {
    position: 'absolute',
    top: 10, // Adjust top position as needed
    left: 5, // Adjust left position as needed
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1, // Ensure the menu button is above the menu
  },
  menuContainer: {
    borderTopRightRadius:30,
    borderBottomRightRadius:30,
    backgroundColor: 'rgba(128, 128, 128, 0.1)', // Semi-transparent gray background color
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0, // Ensure the menu is behind other elements
  },
  menuItemText: {
    fontSize: 16,
    // Add any other styles for menu item text
  },
});

export default FirstPage;
