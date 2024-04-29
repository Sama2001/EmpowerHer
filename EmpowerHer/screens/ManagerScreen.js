import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ManagerScreen = ({ navigation }) => {
  const [membershipData, setMembershipData] = useState([]);

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

  useEffect(() => {
    fetchMembershipData();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Manager Screen</Text>
      <Button title="Logout" onPress={handleLogout} />
      <Button title="Fetch Membership Data" onPress={fetchMembershipData} />

      {membershipData.length === 0 ? (
        <Text>No forms found</Text>
      ) : (
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
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
    width: '80%',
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default ManagerScreen;
