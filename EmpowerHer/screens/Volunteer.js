import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity,ScrollView } from 'react-native';
import { VolunteerFormStyles  as styles } from '../styles/VolunteerStyle';

const VolunteerForm = () => {
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    // Perform form submission logic here
    console.log('Form submitted!');
    console.log('Full Name:', fullName);
    console.log('Address:', address);
    console.log('Mobile Number:', mobileNumber);
    console.log('Email:', email);
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
    <Text style={styles.label}>Upload CV</Text>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Choose file</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.Submitbutton} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default VolunteerForm;
