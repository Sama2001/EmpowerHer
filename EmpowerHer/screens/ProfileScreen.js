//profileScreen
import React, {useState, useEffect} from 'react';
import { View, TextInput, Button, Image, StyleSheet ,Alert,Text,TouchableOpacity} from 'react-native';
//import * as ImagePicker from 'react-native-image-picker';
import * as ImagePicker from 'expo-image-picker';
import * as SecureStore from 'expo-secure-store';
import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome icons
import { profileScreenStyles as styles } from '../styles/ProfileScreenStyles'; // Import styles

const ProfileScreen = ({route,navigation}) => {
    //const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const {authToken} = route.params;
    const [showOldPassword, setShowOldPassword] = useState(false); // State variable to control old password visibility
    const [showNewPassword, setShowNewPassword] = useState(false); // State variable to control new password visibility
    const [changePasswordVisible, setChangePasswordVisible] = useState(false); // State variable to control visibility of password change fields

    const handleChangePasswordPress = () => {
      setChangePasswordVisible(true);
  };

    const navigateToFirstPage = () => {
      navigation.navigate('First', { authToken, profilePicture });
  };


  const saveProfilePicture = async (result) => {
    try {
      if (!result.assets || result.assets.length === 0) {
        console.error('Error: No assets found in ImagePicker result');
        return;
      }
  
      const selectedAsset = result.assets[0];
      const uriString = selectedAsset.uri;
  
      await SecureStore.setItem('profilePictureURI', uriString);
    } catch (error) {
      console.error('Error saving profile picture:', error);
    }
  };

////////////////
  const loadProfilePicture = async () => {
    try {
      const uriString = await SecureStore.getItem('profilePictureURI');
      if (uriString !== null) {
        setProfilePicture(uriString); // Use URI string directly
      }
    } catch (error) {
      console.error('Error loading profile picture:', error);
    }
  };
  
  /////////////////////////
  const handleChoosePhoto = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log("Image Picker Result:", result);

      
      if (!result.canceled) {
      
        // Save the URI to AsyncStorage
        setProfilePicture(result.uri);
        saveProfilePicture(result); // Pass the entire result object

    }
    } catch (error) {
      console.error("Error selecting image:", error);
    }
  };
  
  useEffect(() => {
    // Fetch user info when component mounts
    console.log('Auth Token:', authToken);
    fetchUserInfo();
    loadProfilePicture();
  }, [profilePicture]); ////new

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
            const { firstName, lastName,email,mobile } = data.user;
            setFirstName(firstName);
            setLastName(lastName);
            setEmail(email);
            setMobile(mobile);
        } else {
            Alert.alert('Error', data.message);
        }
    } catch (error) {
        console.error('Error fetching user info:', error);
        Alert.alert('Error', 'An error occurred while fetching user info');
    }
};

  const handleSaveChanges = async () => {
   console.log("hh")
    try {
        if (!authToken) {
            console.error('Error: authToken is not provided');
            return;
          }
      const token = authToken; // authToken is the JWT token received after login
    
      /////////////////////////
      
      const formData = new FormData();
    
      // Append profile data
      formData.append('firstName', firstName);
      formData.append('lastName', lastName);
      formData.append('mobile', mobile);
      formData.append('email', email);
      formData.append('oldPassword', oldPassword);
      formData.append('newPassword', newPassword);

    if (profilePicture) {
      const localUri = profilePicture;
      const filename = localUri.split('/').pop();
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : 'image';
      formData.append('profilePicture', { uri: localUri, name: filename, type });
    }
    ////////////////////

    const response = await fetch('http://192.168.1.120:3000/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body: formData,
      // body: JSON.stringify({ firstName, lastName }),
       


      });
      const responseData = await response.json();

      console.log(token);
      if (response.ok) {
        // Profile updated successfully
        Alert.alert('Success', 'Profile updated successfully');
      } 
      if (response.status === 400 && responseData.message === 'Incorrect old password') {
        // Incorrect old password
        Alert.alert('Error', 'Old password is incorrect');
      } else if (response.status === 400 && responseData.message.includes('New password must be')) {
        // Weak password
        Alert.alert('Error', 'New password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character');
      }
      else {
        // Error updating profile
        Alert.alert('Error', 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
      Alert.alert('Error', 'An error occurred while updating profile');
    }
  };
  

  return (
    <View style={styles.container}>
      

    <Image source={{ uri: profilePicture }} style={styles.profilePicture} /> 
    <Button title="Edit Profile Picture" onPress={handleChoosePhoto} />

      <Text style={styles.text}>Email: {email}</Text>
      <Text style={styles.text}>            Mobile Number: {mobile}</Text>
      <TextInput
        style={styles.input}
        value={firstName}
        onChangeText={setFirstName}
        placeholder="first Name"
      />
      <TextInput
        style={styles.input}
        value={lastName}
        onChangeText={setLastName}
        placeholder="last name"
      />
 

 <TouchableOpacity style={styles.button1}
    onPress={handleChangePasswordPress} 

 >
 <Text style={styles.buttonText1}>Change password</Text>

            </TouchableOpacity>
{changePasswordVisible && (

                <>

                    <TextInput
                        style={styles.input}
                        value={oldPassword}
                        onChangeText={setOldPassword}
                        placeholder="Old Password"
                        secureTextEntry={!showOldPassword}
                    />
                    <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowOldPassword(!showOldPassword)}>
                        <FontAwesome name={showOldPassword ? 'eye' : 'eye-slash'} size={22} color="#a86556" />
                    </TouchableOpacity>

                    <TextInput
                        style={styles.input}
                        value={newPassword}
                        onChangeText={setNewPassword}
                        placeholder="New Password"
                        secureTextEntry={!showNewPassword}
                    />
                    <TouchableOpacity style={styles.eyeIcon1} onPress={() => setShowNewPassword(!showNewPassword)}>
                        <FontAwesome name={showNewPassword ? 'eye' : 'eye-slash'} size={22} color="#a86556" />
                    </TouchableOpacity>
                </>
            )}

<TouchableOpacity 
style={styles.button}
onPress={handleSaveChanges}
>
 <Text style={styles.buttonText}>Save Changes</Text>
 </TouchableOpacity>

 <TouchableOpacity style={styles.button2}
 onPress={navigateToFirstPage}
 >
 <Text style={styles.buttonText}>Back to Home</Text>
 </TouchableOpacity>

     

    
    </View>
  );
};


export default ProfileScreen;
