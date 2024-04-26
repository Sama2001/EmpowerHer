import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Membership as styles } from '../styles/MemberShipStyles'; // Import styles
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';

const MembershipForm = () => {
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [educationLevel, setEducationLevel] = useState('');
  const [age, setAge] = useState('');
  const [websiteLink, setWebsiteLink] = useState('');
  const [projectSector, setProjectSector] = useState('');
  const [projectLocation, setProjectLocation] = useState('');
  const [projectSummary, setProjectSummary] = useState('');
  const [projectPictures, setProjectPictures] = useState([]); // State for project pictures

  
  const handlePictureSelection = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        multiple: true, // Enable multiple selection
      });
      console.log('Image Picker Result:', result); // Log the result object

  
      if (!result.canceled) {
        // Extract URIs of selected pictures from the assets array
        const selectedURIs = result.assets.map((asset) => asset.uri);
        
        // Update selected pictures state
        setProjectPictures([...projectPictures, ...selectedURIs]);
        console.log('Selected Pictures:', projectPictures); // Log selected pictures
      }

      else {
        console.log('Image selection cancelled or URI undefined.');
      }
    } catch (error) {
      console.error('Error selecting picture:', error);
    }
  };


  
const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('fullName', fullName);
      formData.append('address', address);
      formData.append('mobileNumber', mobileNumber);
      formData.append('email', email);
      formData.append('education', educationLevel);
      formData.append('age', age);
      formData.append('socialMediaLink', websiteLink);
      formData.append('projectSector', projectSector);
      formData.append('projectLocation', projectLocation);
      formData.append('projectSummary', projectSummary);
      
      projectPictures.forEach((uri, index) => {

        const uriParts = uri.split('.');
        const fileType = uriParts[uriParts.length - 1];
        
        formData.append('projectPictures', {
          uri,
          name: `projectPictures_${index}.${fileType}`,
          type: `projectPictures/${fileType}`,
        });
      });

      const response = await axios.post('http://192.168.1.120:3000/membership', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Membership application submitted:', response.data);
      // Optionally, you can navigate to a success screen or show a success message
    } catch (error) {
      console.error('Error submitting membership application:', error);
      // Handle error, show alert, etc.
    }
  };

  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Membership Form</Text>
      <View style={styles.section}>
        <Text style={styles.label}>Personal Information</Text>
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
          value={mobileNumber}
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
        <TextInput
          style={styles.input}
          placeholder="Education Level and Specialization"
          value={educationLevel}
          onChangeText={setEducationLevel}
        />
        <TextInput
          style={styles.input}
          placeholder="Age"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Website/Facebook Link"
          value={websiteLink}
          onChangeText={setWebsiteLink}
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Project Information</Text>
       
        <TextInput
          style={styles.input}
          placeholder="Project Sector"
          value={projectSector}
          onChangeText={setProjectSector}
       
       />

        <TextInput
          style={styles.input}
          placeholder="Project Location"
          value={projectLocation}
          onChangeText={setProjectLocation}
        />
        <TextInput
          style={[styles.input, { height: 120 }]} // Increase height for project summary
          placeholder="Project Summary"
          value={projectSummary}
          onChangeText={setProjectSummary}
          multiline
        />

        
      </View>
      <Text style={styles.label}>Project pictures</Text>

      <TouchableOpacity style={styles.button1} onPress={handlePictureSelection}>
        <Text style={styles.buttonText1}>choose pictures</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};



export default MembershipForm;
