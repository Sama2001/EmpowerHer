import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Membership as styles } from '../styles/MemberShipStyles'; // Import styles

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

  const handleSubmit = () => {
    // Perform form submission logic here
    // You can submit the form data to your backend or perform any other action
    console.log('Form submitted!');
    console.log('Full Name:', fullName);
    console.log('Address:', address);
    console.log('Mobile Number:', mobileNumber);
    console.log('Email:', email);
    console.log('Education Level:', educationLevel);
    console.log('Age:', age);
    console.log('Website/Facebook Link:', websiteLink);
    console.log('Project Sector:', projectSector);
    console.log('Project Location:', projectLocation);
    console.log('Project Summary:', projectSummary);
    console.log('Project Pictures:', projectPictures);

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

      <TouchableOpacity style={styles.button1} onPress={handleSubmit}>
        <Text style={styles.buttonText1}>choose pictures</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};



export default MembershipForm;
