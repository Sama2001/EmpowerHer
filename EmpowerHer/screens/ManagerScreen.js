import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, StyleSheet, Image,Linking,ScrollView,TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Manager as styles } from '../styles/ManagerStyles'; // Import styles from the separated file
import ProjectPicturesModal from '../screens/ProjectPicturesModal';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; 

const ManagerScreen = ({ navigation,route }) => {
  const [membershipData, setMembershipData] = useState([]);
  const [membersData, setMembersData] = useState([]);
  const [internsData, setInternsData] = useState([]);
  const [opportunitiesData, setOpportunitiesData] = useState([]);
  const [showMembershipForms, setShowMembershipForms] = useState(false); // State for showing/hiding membership forms
  const [showMembers, setShowMembers] = useState(false); // State for showing/hiding membership forms
  const [showInterns, setShowInterns] = useState(false); // State for showing/hiding membership forms
  const [showOpportunitiesForms, setShowOpportunitiesForms] = useState(false); // State for showing/hiding membership forms
  const [showModal, setShowModal] = useState(false);
  const {authToken} = route.params;


  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };


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

  const fetchmembersData = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        console.error('Error: authToken is not provided');
        return;
      }

      const response = await fetch('http://192.168.1.120:3000/Gmembers', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
      });

      const data = await response.json();
      console.log('Response data:', data); // Log the response data

      if (data.success) {
        setMembersData(data.membersData); // Correctly set opportunities data
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      console.error('Error fetching opportunities data:', error);
      Alert.alert('Error', 'An error occurred while fetching opportunities data');
    }
  };

  const fetchInternsData = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        console.error('Error: authToken is not provided');
        return;
      }
  
      const response = await fetch('http://192.168.1.120:3000/interns', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
      });
  
      const data = await response.json();
      console.log('Response data:', data); // Log the response data
  
      if (data.success) {
        setInternsData(data.internshipData); // Set the interns data in state
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      console.error('Error fetching interns data:', error);
      Alert.alert('Error', 'An error occurred while fetching interns data');
    }
  };
  

  const toggleMembershipForms = () => {
    setShowMembershipForms(!showMembershipForms); // Toggle the state

  };

  const toggleMembers = () => {
    setShowMembers(!showMembers); // Toggle the state

  };

  const toggleInterns = () => {
    setShowInterns(!showInterns); // Toggle the state

  };


  const toggleOpportunitiesForms = () => {
    setShowOpportunitiesForms(!showOpportunitiesForms); // Toggle the state

  };

  useEffect(() => {
    fetchMembershipData();
    fetchOpportunitiesData();
    fetchmembersData();
    fetchInternsData();
  }, []);

  const openPDF = (pdfUrl) => {
    Linking.openURL(pdfUrl);
  };


  const handleApprove = async (form) => {
    try {
      // Extract member data from the form object
      const memberData = {
        fullName: form.fullName,
        address: form.address,
        mobileNumber:form.mobile,
        emailAddress: form.email,
        projectSummary:form.projectSummary,
            };
  
      // Make a POST request to add the member to the members table
      const response = await fetch('http://192.168.1.120:3000/members', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authToken, // Assuming you have a token for authentication
        },
        body: JSON.stringify(memberData), // Send member data in the request body
      });
  
      const data = await response.json();
      if (data.success) {
        // If member is successfully added to the members table, remove it from memberships
        const response = await fetch(`http://192.168.1.120:3000/membership/${form._id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': authToken, // Replace with your actual token
          },
        });
        setMembershipData(prevData => prevData.filter(item => item._id !== form._id));

        // Perform any additional actions as needed (e.g., updating UI, refreshing data)
      } else {
        Alert.alert('Error', data.message); // Display error message if request fails
      }
    } catch (error) {
      console.error('Error adding member:', error);
      Alert.alert('Error', 'Failed to add member');
    }
  };


  const handleApproveOpp = async (opportunity) => {
    try {
      // Extract member data from the form object
      const OppData = {
        fullName: opportunity.fullName,
        address: opportunity.address,
        mobileNumber:opportunity.mobile,
        emailAddress: opportunity.email,
            };
  
      // Make a POST request to add the member to the members table
      const response = await fetch('http://192.168.1.120:3000/internships', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authToken, // Assuming you have a token for authentication
        },
        body: JSON.stringify(OppData), // Send member data in the request body
      });
  
      const data = await response.json();
      if (data.success) {
        // If member is successfully added to the members table, remove it from memberships
        const response = await fetch(`http://192.168.1.120:3000/opportunity/${opportunity._id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': authToken, // Replace with your actual token
          },
        });
        setOpportunitiesData(prevData => prevData.filter(item => item._id !== opportunity._id));

        // Perform any additional actions as needed (e.g., updating UI, refreshing data)
      
      } else {
        Alert.alert('Error', data.message); // Display error message if request fails
      }
    } catch (error) {
      console.error('Error adding internship:', error);
      Alert.alert('Error', 'Failed to add internship');
    }
  };

  const handleReject = async (form) => {
    try {
      // Make a DELETE request to delete the membership application
      const response = await fetch(`http://192.168.1.120:3000/membership/${form._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authToken, // Assuming you have a token for authentication
        },
      });
      setMembershipData(prevData => prevData.filter(item => item._id !== form._id));

      const data = await response.json();
      if (data.success) {
        // Perform any additional actions as needed (e.g., updating UI, refreshing data)
      } else {
        Alert.alert('Error', data.message); // Display error message if request fails
      }
    } catch (error) {
      console.error('Error rejecting membership:', error);
      Alert.alert('Error', 'Failed to reject membership');
    }
  };

  const handleRejectOpp = async (opportunity) => {
    try {
      // Make a DELETE request to delete the membership application
      const response = await fetch(`http://192.168.1.120:3000/opportunity/${opportunity._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authToken, // Assuming you have a token for authentication
        },
      });
      setOpportunitiesData(prevData => prevData.filter(item => item._id !== opportunity._id));

      const data = await response.json();
      if (data.success) {
        // Perform any additional actions as needed (e.g., updating UI, refreshing data)
      } else {
        Alert.alert('Error', data.message); // Display error message if request fails
      }
    } catch (error) {
      console.error('Error rejecting internship:', error);
      Alert.alert('Error', 'Failed to reject internship');
    }
  };
  
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center',margin:10,borderWidth:1,borderColor:'gray' }}>

    <View style={styles.container}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Manager Screen</Text>
      
      {/*memberships */}      
      <TouchableOpacity
  style={showMembershipForms ? styles.button1 : styles.button}
  onPress={toggleMembershipForms}
>
  <Text style={styles.buttonText}>{showMembershipForms ? "Hide Membership Forms" : "Show Membership Forms"}</Text>
</TouchableOpacity>

      {showMembershipForms && membershipData.length === 0 && (
        <Text>No forms found</Text>
      )}

      {showMembershipForms && membershipData.length > 0 && (
        membershipData.map((form, index) => (

          <View key={index} style={styles.formContainer}>
            <Text style={styles.formTitle}>Form {index + 1}</Text>
            <View style={{ flexDirection: 'row' }}>
            <Text style={[styles.title, styles.text]}>Full Name:</Text>
            <Text style={styles.text}>{form.fullName}</Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
            <Text style={[styles.title, styles.text]}>Address: </Text>
            <Text style={styles.text}>{form.address}</Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
            <Text style={[styles.title, styles.text]}>Email Address: </Text>
            <Text style={styles.text}>{form.email}{form.emailAddress}</Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
            <Text style={[styles.title, styles.text]}>Mobile: </Text>
            <Text style={styles.text}>{form.mobile}</Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
            <Text style={[styles.title, styles.text]}>Education: </Text>
            <Text style={styles.text}>{form.education}</Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
            <Text style={[styles.title, styles.text]}>Age: </Text>
            <Text style={styles.text}>{form.age}</Text>
            </View>

          
            <View style={{ flexDirection: 'row' }}>
            <Text style={[styles.title, styles.text]}>Social media link:</Text>
            <Text style={styles.link} onPress={() => Linking.openURL(form.socialMediaLink)}>
              {form.socialMediaLink}
             </Text>
             </View>

            <View style={{ flexDirection: 'row' }}>
            <Text style={[styles.title, styles.text]}>Project locatiton: </Text>
            <Text style={styles.text}>{form.projectLocation}</Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
            <Text style={[styles.title, styles.text]}>Project sector: </Text>
            <Text style={styles.text}>{form.projectSector}</Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
            <Text style={[styles.title, styles.text]}>Project summary: </Text>
            <Text style={styles.text}>{form.projectSummary}</Text>
            </View>

            {/* Render project pictures 
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
*/}

            <TouchableOpacity onPress={openModal} style={styles.button}>
        <Text style={styles.buttonText}>View Pictures</Text>
      </TouchableOpacity>

      {showModal && (
        <ProjectPicturesModal projectPictures={form.projectPictures} onClose={closeModal} />
      )}
      

      <View style={styles.buttonContainer}>
  <TouchableOpacity style={styles.button} onPress={() => handleApprove(form)}>
    <Text style={styles.buttonText1}>Approve</Text>
  </TouchableOpacity>


  
  <TouchableOpacity style={styles.button1} onPress={() => handleReject(form)}>
    <Text style={styles.buttonText1}>Reject</Text>
  </TouchableOpacity>
</View>

            {/* Add more fields as needed */}
       
          </View>
        ))
      )}


{/* opportunities */}
<TouchableOpacity
  style={showOpportunitiesForms ? styles.button1 : styles.button}
  onPress={toggleOpportunitiesForms}
>
  <Text style={styles.buttonText}>{showOpportunitiesForms ? "Hide Opportunities Forms" : "Show Opportunities Forms"}</Text>
</TouchableOpacity>
{showOpportunitiesForms && opportunitiesData.length === 0 && (
        <Text>No opportunities found</Text>
      )}

        {showOpportunitiesForms && opportunitiesData.length > 0 && (
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

<View style={styles.buttonContainer}>
  <TouchableOpacity style={styles.button} onPress={() => handleApproveOpp(opportunity)}>
    <Text style={styles.buttonText1}>Approve</Text>
  </TouchableOpacity>


  
  <TouchableOpacity style={styles.button1} onPress={() => handleRejectOpp(opportunity)}>
    <Text style={styles.buttonText1}>Reject</Text>
  </TouchableOpacity>
</View>

          </View>
        ))
      )}


{/* members */}

<TouchableOpacity
  style={showMembers ? styles.button1 : styles.button}
  onPress={toggleMembers}
>
  <Text style={styles.buttonText}>{showMembers ? "Hide Members" : "Show Members"}</Text>
</TouchableOpacity>

{showMembers && membersData.length === 0 && (
        <Text>No Members found</Text>
      )}

        {showMembers && membersData.length > 0 && (
        membersData.map((member, index) => (
          <View key={index} style={styles.opportunityContainer}>
            <Text style={styles.opportunityTitle}>Member {index + 1}</Text>
            <Text>Name: {member.fullName}</Text>
            <Text>Address: {member.address}</Text>

            <TouchableOpacity style={styles.Taskbutton} onPress={() => handleApproveOpp(opportunity)}>
           <Text style={styles.buttonText1}>Assign task</Text>
           </TouchableOpacity>
          </View>



        ))
        
      )}


{/*interns */}
<TouchableOpacity
  style={showInterns ? styles.button1 : styles.button}
  onPress={toggleInterns}
>
  <Text style={styles.buttonText}>{showInterns ? "Hide Interns " : "Show Interns"}</Text>
</TouchableOpacity>
{showInterns && internsData.length === 0 && (
        <Text>No interns found</Text>
      )}

        {showInterns && internsData.length > 0 && (
        internsData.map((interns, index) => (
          <View key={index} style={styles.opportunityContainer}>
            <Text style={styles.opportunityTitle}>Intern {index + 1}</Text>
            <Text>Name: {interns.fullName}</Text>
            <Text>Address: {interns.address}</Text>
        
          </View>
        ))
      )}

<TouchableOpacity style={styles.logout} onPress={handleLogout}>
    <MaterialIcons name="exit-to-app" size={30} color="#a86556" style={styles.logoutIcon} />
    <Text style={styles.logoutText}>Logout</Text>
  </TouchableOpacity>

    </View>
    </ScrollView>

  );
};


export default ManagerScreen;
