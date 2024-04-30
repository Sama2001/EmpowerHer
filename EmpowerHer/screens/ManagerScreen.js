import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, StyleSheet, Image,Linking,ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../styles/ManagerStyles'; // Import styles from the separated file

const ManagerScreen = ({ navigation }) => {
  const [membershipData, setMembershipData] = useState([]);
  const [opportunitiesData, setOpportunitiesData] = useState([]);
  const [showMembershipForms, setShowMembershipForms] = useState(false); // State for showing/hiding membership forms
  const [showOpportunitiesForms, setShowOpportunitiesForms] = useState(false); // State for showing/hiding membership forms

  const handleLogout = async () => {
    // Clear authToken and authTokenExpiration from AsyncStorage
    await AsyncStorage.removeItem('authToken');
    await AsyncStorage.removeItem('authTokenExpiration');

    // Navigate to the login screen
    navigation.navigate('Login');
  };

  const fetchMembershipData = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        console.error('Error: authToken is not provided');
        return;
      }

      const response = await fetch('http://192.168.1.120:3000/Gmembership', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
      });

      const data = await response.json();
      console.log('Response data:', data); // Log the response data

      if (data.success) {
        setMembershipData(data.membershipData); // Correctly set membership data
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      console.error('Error fetching membership data:', error);
      Alert.alert('Error', 'An error occurred while fetching membership data');
    }
  };

  const fetchOpportunitiesData = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        console.error('Error: authToken is not provided');
        return;
      }

      const response = await fetch('http://192.168.1.120:3000/Gopportunities', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
      });

      const data = await response.json();
      console.log('Response data:', data); // Log the response data

      if (data.success) {
        setOpportunitiesData(data.opportunitiesData); // Correctly set opportunities data
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      console.error('Error fetching opportunities data:', error);
      Alert.alert('Error', 'An error occurred while fetching opportunities data');
    }
  };

  const toggleMembershipForms = () => {
    setShowMembershipForms(!showMembershipForms); // Toggle the state

  };

  const toggleOpportunitiesForms = () => {
    setShowOpportunitiesForms(!showOpportunitiesForms); // Toggle the state

  };

  useEffect(() => {
    fetchMembershipData();
    fetchOpportunitiesData();

  }, []);

  const openPDF = (pdfUrl) => {
    Linking.openURL(pdfUrl);
  };


  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>

    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Manager Screen</Text>
      <Button title="Logout" onPress={handleLogout} />
      <Button title={showMembershipForms ? "Hide Membership Forms" : "Show Membership Forms"} onPress={toggleMembershipForms} />
      <Button title={showOpportunitiesForms ? "Hide Opportunities Forms" : "Show Opportunities Forms"} onPress={toggleOpportunitiesForms} />

     
      {showMembershipForms && membershipData.length === 0 && (
        <Text>No forms found</Text>
      )}

      {showMembershipForms && membershipData.length > 0 && (
        membershipData.map((form, index) => (
          <View key={index} style={styles.formContainer}>
            <Text style={styles.formTitle}>Form {index + 1}</Text>
            <Text>Full Name: {form.fullName}</Text>
            <Text>Address: {form.address}</Text>
            <Text>Email Address: {form.email}{form.emailAddress}</Text>

            {/* Render project pictures */}
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              {form.projectPictures.map((picture, picIndex) => (
                <Image
                  key={picIndex}
                  source={{ uri: `http://192.168.1.120:3000/${picture.replace(/\\/g, '/')}` }}
                 // source={{ uri: `data:image/png;base64,${form.projectPictures}` }}

                  style={{ width: 50, height: 50, marginRight: 10 }}
                  onError={(error) => console.error('Error loading image:', error)}
                />
              ))}
            </View>
            {/* Add more fields as needed */}
          </View>
        ))
      )}


{opportunitiesData.length === 0 && (
        <Text>No opportunities found</Text>
      )}

        {showOpportunitiesForms && membershipData.length > 0 && (
        opportunitiesData.map((opportunity, index) => (
          <View key={index} style={styles.opportunityContainer}>
            <Text style={styles.opportunityTitle}>Opportunity {index + 1}</Text>
            <Text>Name: {opportunity.fullName}</Text>
            <Text>Address: {opportunity.address}</Text>

           
            {/* Render PDF files */}
            {opportunity.cv && opportunity.cv.map((pdfFile, pdfIndex) => (
            <Button
            key={pdfIndex}
            title={`View PDF ${pdfIndex + 1}`}
            onPress={() => {
              const pdfUrl = `http://192.168.1.120:3000/${pdfFile.replace(/\\/g, '/')}`;
              openPDF(pdfUrl);
            }}
          />
            ))}
          </View>
        ))
      )}
    </View>
    </ScrollView>

  );
};


export default ManagerScreen;
