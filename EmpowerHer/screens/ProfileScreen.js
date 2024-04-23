//profileScreen
import React, {useState, useEffect} from 'react';
import { View, TextInput, Button, Image, StyleSheet ,Alert,Text} from 'react-native';
//import * as ImagePicker from 'react-native-image-picker';
import * as ImagePicker from 'expo-image-picker';
import * as SecureStore from 'expo-secure-store';

const ProfileScreen = ({route}) => {
    //const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const {authToken} = route.params;


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
}, []);

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
      console.log(token);
      if (response.ok) {
        // Profile updated successfully
        Alert.alert('Success', 'Profile updated successfully');
      } else {
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
            <Button title="Choose Profile Picture" onPress={handleChoosePhoto} />

    <Image source={{ uri: profilePicture }} style={styles.profilePicture} /> 

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
 
<Text style={styles.text}>Email: {email}</Text>
      <Text style={styles.text}>Mobile Number: {mobile}</Text>
    
      <Button title="Save Changes" onPress={handleSaveChanges} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '80%',
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
});

export default ProfileScreen;
