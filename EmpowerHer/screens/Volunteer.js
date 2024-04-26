import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity,ScrollView } from 'react-native';
import { VolunteerFormStyles  as styles } from '../styles/VolunteerStyle';
import * as DocumentPicker from 'expo-document-picker'; // Import DocumentPicker
import axios from 'axios';


const VolunteerForm = ({route}) => {
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [mobile, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');

  const [cv, setCvFiles] = useState([]); // State to store selected CV files

  const {authToken} = route.params;

  useEffect(() => {
    // Fetch user info when component mounts
    console.log(authToken);
        fetchUserInfo();
  },[]); 
  
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
            const { email,mobile } = data.user;
            setEmail(email);
            setMobileNumber(mobile);
        } else {
            Alert.alert('Error', data.message);
        }
    } catch (error) {
        console.error('Error fetching user info:', error);
        Alert.alert('Error', 'An error occurred while fetching user info');
    }
};

const handleChooseFile = async () => {
  try {
    const result = await DocumentPicker.getDocumentAsync({
      type: 'application/pdf', // Specify the type of files you want to allow the user to select
      multiple: true, // Allow multiple selection
    });
    console.log('Document Picker Result:', result);

    if (!result.canceled) {
      // Update selected files state
      if (Array.isArray(result.assets)) {
        // If multiple files are selected
        setCvFiles([...cv, ...result.assets]);
      } else {
        // If a single file is selected
        setCvFiles([...cv, result]);
      }
      console.log('Selected Files:', cv);
    } else {
      console.log('File selection cancelled or URI undefined.');
    }
  } catch (error) {
    console.error('Error selecting files:', error);
  }
};

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('fullName', fullName);
      formData.append('address', address);
      formData.append('mobile', mobile);
      formData.append('email', email);
      
     
      cv.forEach((file, index) => {
        formData.append(`cv`, file);
      });
        const token = authToken; 
      const response = await axios.post('http://192.168.1.120:3000/opportunities', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': token,

        },
      });
      console.log('opportunities application submitted:', response.data);
      // Optionally, you can navigate to a success screen or show a success message
    } catch (error) {
      console.error('Error submitting opportunities application:', error);
      // Handle error, show alert, etc.
    }
  };
  return (

    <View style={styles.container}>
      <Text style={styles.title}>Volunteer/Internship Form</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Mobile Number"
        value={mobile}
        onChangeText={setMobileNumber}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
    <Text style={styles.label}>Upload CV</Text>
      <TouchableOpacity style={styles.button} onPress={handleChooseFile}>
        <Text style={styles.buttonText}>Choose file</Text>
      </TouchableOpacity>
      <View>
        {cv.map((file, index) => (
          <Text key={index}>{file.name}</Text>
        ))}
      </View>

      <TouchableOpacity style={styles.Submitbutton} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default VolunteerForm;
