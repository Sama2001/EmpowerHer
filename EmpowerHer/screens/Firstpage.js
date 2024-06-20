import React, { useState, useRef,useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Animated,Image,Alert } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; 
import * as SecureStore from 'expo-secure-store';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import  Ionicons  from '@expo/vector-icons';
import { useMessageCount } from './MessageContext'; // Corrected path

import { useCart } from './CartContext'; // Assuming you have a CartContext

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
  const [userId, setUserId] = useState(null);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [greeting, setGreeting] = useState('');
  const { cartItems } = useCart(); // Access the cartItems from the context
  //console.log('Cart Items:', cartItems);
  const { messageCount, resetMessageCount, incrementMessageCount } = useMessageCount(); // Access the messageCount and reset function from the context

  const userCartItems = cartItems.filter(item => item.userId === userId);

  const totalUniqueItemsInCart = [...new Set(userCartItems.map(item => item._id))].length;

  const handleLogout = async () => {
    try {
      // Clear authentication token from AsyncStorage
      await SecureStore.deleteItemAsync('authToken');
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
const loadProfilePicture = async (userId) => {
  try {
    const sanitizedEmail = sanitizeKey(userId);
    const profilePictureKey = `${sanitizedEmail}_profilePictureURI`; 
   // console.log(`Loading profile picture with key: ${profilePictureKey}`);
    const uriString = await SecureStore.getItemAsync(profilePictureKey);
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
        console.log('No member ID found for this user');

      }
    } catch (error) {
      //console.error('Error fetching member ID:', error);
     // Alert.alert('Error', 'An error occurred while fetching member ID');
    }
  };
  
  const sanitizeKey = (key) => {
    if (!key) {
      //console.error('Error: Key is null or undefined');
      return null;
    }
    const sanitizedKey = key.replace(/[^a-zA-Z0-9.-_]/g, '_');
    //console.log('Sanitized Key:', sanitizedKey);
    return sanitizedKey;
  };
  const getCurrentGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return { message: 'Good Morning', icon: 'white-balance-sunny' };
    } else if (currentHour < 18) {
      return { message: 'Good Afternoon', icon: 'weather-sunny' };
    } else {
      return { message: 'Good Evening', icon: 'weather-night' };
    }
  };
  const { message, icon } = getCurrentGreeting();


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
            const { _id,firstName, lastName,email,mobile} = data.user;
            setFirstName(firstName);
            setLastName(lastName);
            setEmail(email);
            setMobile(mobile);
            setUserId(_id);
            loadProfilePicture(_id); // Load profile picture after setting userId
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
  console.log('Message count updated:', messageCount); // Check messageCount value
}, [messageCount]);

useEffect(() => {
  fetchUserInfo();
  loadProfilePicture(userId);
  const fadeInAnimation = Animated.timing(fadeAnim, {
    toValue: 1,
    duration: 3000,
    useNativeDriver: true,
  });
  const loopAnimation = Animated.loop(fadeInAnimation);

  loopAnimation.start();

  return () => loopAnimation.stop();
}, [fadeAnim , resetMessageCount]); 

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

  const navigateToStore = () => {

      navigation.navigate('store', { authToken,memberId,userId });
      
  };

 /* const navigateToCart = () => {
   // navigation.navigate('Cart', { authToken, memberId});
   // Example navigation code to navigate to the ShoppingCartScreen
navigation.navigate('Cart', { userId: userId });

  };*/
  const navigateToCart = () => {
    if (userId) {
        navigation.navigate('Cart', { authToken,userId });
    } else {
        Alert.alert('Error', 'User ID not found');
    }
};

  const navigateToChatScreen = () =>
     { if (userId)
       {
        console.log('LOG Before reset: messageCount', messageCount);
        resetMessageCount(); // Reset message count from context
        console.log('LOG After reset: messageCount', messageCount); 
        navigation.navigate('Chat', { authToken, userId,messageCount });
    } else {
      Alert.alert('Error', 'User ID not found');
    }
  };


  return (
    
    <View style={styles.container}>
        <TouchableOpacity style={styles.menuIconContainer} onPress={toggleMenu}>
        <MaterialIcons name="menu" size={30} color="#a86556"  />
      </TouchableOpacity>



      <View style={styles.iconRow}>
      <TouchableOpacity style={styles.iconContainer} onPress={navigateToCart}>
          <MaterialCommunityIcons name="cart-outline" size={28} color="#a86556" />
          {totalUniqueItemsInCart > 0 && (
            <View style={styles.notification}>
              <Text style={styles.notificationText}>{totalUniqueItemsInCart}</Text>
            </View>
          )}
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.iconContainer, styles.circularIconContainer]} onPress={navigateToChatScreen}>
          <MaterialCommunityIcons name="message-processing-outline" size={28} color="#a86556" />
          {messageCount > 0 && (
            <View style={styles.notification}>
              <Text style={styles.notificationText}>{messageCount}</Text>
            </View>
          )}
          
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.iconContainer}>
          <MaterialCommunityIcons name="bell-outline" size={28} color="#a86556" />
         
        </TouchableOpacity>
      </View>
     
      <ScrollView>

      <View style={styles.greetingContainer}>
          <MaterialCommunityIcons name={icon} size={24} color="yellow" marginLeft={5} marginRight={-5}/>
          <Text style={styles.greetingText}>{message}, {firstName}</Text>
        </View>
      <Animated.View style={[styles.empowerHerContainer, { opacity: fadeAnim }]}>
          <Text style={styles.empowerHerText}>EmpowerHer</Text>
        </Animated.View>
      {/* Menu Button */}
     

      {/* Content */}
      <View style={styles.container1}>
      <ScrollView style={styles.contentContainer}>
        <View style={styles.aboutSection}>
          <View style={styles.aboutItem}>
            <MaterialCommunityIcons name="eye" size={24} color="#a86556" style={styles.aboutIcon} />
            <Text style={styles.aboutText}>
              Vision: Aspiring for a capable and influential Palestinian woman in a society that enjoys social justice and democracy, pioneering to contribute to achieving sustainable economic development.
            </Text>
          </View>
          <View style={styles.aboutItem}>
            <MaterialCommunityIcons name="bullseye" size={24} color="#a86556" style={styles.aboutIcon} />
            <Text style={styles.aboutText}>
              Mission: The Palestinian Businesswomen's
               Association "Asala" is a Palestinian institution 
               that works to empower Palestinian women with limited resources 
               to reach their economic and social rights through a comprehensive and 
               sustainable developmental approach based on their needs and aspirations.
            </Text>
          </View>
          <View style={styles.aboutItem}>
            <MaterialCommunityIcons name="heart" size={24} color="#a86556" style={styles.aboutIcon} />
            <Text style={styles.aboutText}>
              Values: Accountability, Professionalism, Commitment, 
              Rights-based Approach, Participation-based Approach, Solidarity, Innovation, Empowerment.
            </Text>
          </View>
          <View style={styles.aboutItem}>
            <MaterialCommunityIcons name="star" size={24} color="#a86556" style={styles.aboutIcon} />
            <Text style={styles.aboutText}>
              Goals: Asala aims to enhance the necessary skills
               of Palestinian women and strengthen their opportunities
                for successful contribution to society and its development,
                 aiming for equality in rights and access to resources and institutions. 
                 To achieve this goal, Asala's staff commit to values of transparency, democracy,
                  and social justice, and have developed a variety of services since its founding to
                   enable women to better organize their projects to benefit from economic opportunities.
            </Text>
          </View>
        </View>
      </ScrollView>
</View>
<View style={styles.additionalContainer}>

<ScrollView>
<Text style={styles.sectionTitle}>Join Us</Text>
  <Text style={styles.additionalText}>
    Asala Palestinian Businesswomen's Association started its
     membership program in 2019, granting beneficiaries the opportunity
      to join the association and benefit more from the exhibitions, workshops,
       and trainings it conducts in various fields related to market access, 
       capacity building, mobilization, and advocacy. Members can choose the membership 
       category that suits them and the size of their project. Asala aims to increase its
        membership and expand its beneficiary base to achieve its mission of empowering Palestinian 
        women economically</Text>
  <TouchableOpacity style={styles.membershipButton} onPress={navigateToMembership}>
    <Text style={styles.membershipButtonText}>Membership</Text>
  </TouchableOpacity>
  </ScrollView>
</View>

<View style={styles.contentSection}>
  <Text style={styles.sectionTitle}>Store</Text>
  <Text style={styles.sectionText}>
    Asala's store offers a variety of products produced by Palestinian women, including handicrafts, food items, clothing, jewelry, and gifts. Purchasing these products supports local women and contributes to boosting the local economy and promoting sustainable development in Palestine.
  </Text>
  <TouchableOpacity style={styles.button} onPress={navigateToStore}>
    <Text style={styles.buttonText}>Visit Store</Text>
  </TouchableOpacity>
</View>


      {/* Menu */}
      <Animated.View style={[styles.menuContainer, { width: menuWidth }]}>
        {/* Profile Button */}
        <TouchableOpacity style={styles.profileButton} onPress={navigateToProfile}>
        <View style={styles.profileInfoContainer}>
        {profilePicture && <Image source={{ uri: profilePicture }} style={styles.profilePicture} />}
        <Text style={styles.PmenuItemText}>
      {firstName !== '' && lastName !== '' ? `${firstName} ${lastName} ` : 'Loading...'}
    </Text>
        </View>
  </TouchableOpacity>

  {memberId ? (
          <TouchableOpacity style={styles.TasksButton} onPress={navigateToTasks}>
         <MaterialCommunityIcons name="clipboard-list-outline" size={24} color="#a86556" />
            <Text style={styles.menuItemText}> My tasks </Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.placeholderContainer} />
        )}


  <TouchableOpacity style={styles.MemberButton} onPress={navigateToMembership}>

        <Text style={styles.menuItemText}> Membership </Text>

  </TouchableOpacity>
  <TouchableOpacity style={styles.OpButton} onPress={navigateToVolunteer}>
       
       <Text style={styles.menuItemText}> Opportunities </Text>
 </TouchableOpacity>



 <TouchableOpacity style={styles.StoreButton} onPress={navigateToStore}>
        <Text style={styles.menuItemText}> Store </Text>
      </TouchableOpacity>
      
     
 <View style={styles.contentContainer}>
         
 
          
        </View>

  <TouchableOpacity style={styles.logout} onPress={handleLogout}>
    <MaterialIcons name="exit-to-app" size={24} color="#a86556" style={styles.menuItemIcon} />
    <Text style={styles.menuItemText}>Logout</Text>
  </TouchableOpacity>



      </Animated.View>
      </ScrollView>

    </View>
  );
};


export default FirstPage;
