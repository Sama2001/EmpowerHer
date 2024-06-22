import React, { useState, useEffect } from 'react';
import { View, Text, Alert, StyleSheet,Platform, Image,Linking,ScrollView,TouchableOpacity,TextInput,Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Manager as styles } from '../styles/ManagerStyles'; // Import styles from the separated file
import ProjectPicturesModal from '../screens/ProjectPicturesModal';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; 
import { Picker } from '@react-native-picker/picker'; // Import Picker from '@react-native-picker/picker'
import TaskForm from './TaskForm';
import TasksModal from './TasksModal'; 
import MembershipFormsModal from './MembershipFormsModal'; 
import OpportunitiesModal  from './oppModal';
import MembersModal from './membersModal';
import InternsModal from './internsModal';
import SalesModal from './SalesModal'; 
import OrdersModal from './ordersModal';
import DateTimePicker from '@react-native-community/datetimepicker'; // Import DateTimePicker from '@react-native-community/datetimepicker'
import * as ImagePicker from 'expo-image-picker';

const ManagerScreen = ({ navigation,route }) => {
  const [membershipData, setMembershipData] = useState([]);
  const [membersData, setMembersData] = useState([]);
  const [internsData, setInternsData] = useState([]);
  const [opportunitiesData, setOpportunitiesData] = useState([]);
  const [showMembershipForms, setShowMembershipForms] = useState(false); 
  const [showMembers, setShowMembers] = useState(false); 
  const [showInterns, setShowInterns] = useState(false); 
  const [showOpportunitiesForms, setShowOpportunitiesForms] = useState(false); 
  const [showModal, setShowModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null); 
  const [showTaskForm, setShowTaskForm] = useState(false);
  const {authToken} = route.params;
  const [selectedMembers, setSelectedMembers] = useState(Array(internsData.length).fill(null));
  const [selectedMemberData, setSelectedMemberData] = useState(null);
  const [tasksModalVisible, setTasksModalVisible] = useState(false);
  const [tasks, setTasks] = useState([]); 
  const [showMembersModal, setShowMembersModal] = useState(false); 
  const [showInternsModal, setShowInternsModal] = useState(false);
  const [sales, setSales] = useState([]); 
  const [salesModalVisible, setSalesModalVisible] = useState(false); 

  const [showOrdersModal, setShowOrdersModal] = useState(false);
  const [orders, setOrders] = useState([]);

  const [images, setImages] = useState([]); // State for project pictures
  const [description, setDescription] = useState('');
  const [maxAttendance, setMAttendance] = useState('');
  const [date, setDate] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false); // State to toggle date picker visibility

  const openMembersModal = () => {
    setShowMembersModal(true);
  };

  // Function to close members modal
  const closeMembersModal = () => {
    setShowMembersModal(false);
  };

  const openInternsModal = () => {
    setShowInternsModal(true);
    // Fetch interns data here if needed
  };

  const closeInternsModal = () => {
    setShowInternsModal(false);
  };

  const openSalesModal = async () => {
    try {
      await fetchsales();
      setSalesModalVisible(true);
    } catch (error) {
      console.error('Error opening sales modal:', error);
      Alert.alert('Error', 'An error occurred while opening the sales modal');
    }
  };

  const openOrdersModal = async () => {
    try {
      await fetchOrders();
      setShowOrdersModal(true);
    } catch (error) {
      console.error('Error opening sales modal:', error);
      Alert.alert('Error', 'An error occurred while opening the sales modal');
    }
  };
  


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
  const fetchMemberTasks = async (memberId) => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        console.error('Error: authToken is not provided');
        return;
      }

      const response = await fetch(`http://192.168.1.120:3000/tasks/${memberId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
      });

      const data = await response.json();
      console.log('Response data:', data); // Log the response data

      if (data.success) {
        setTasks(data.tasks); // Set tasks for the specific member
        setTasksModalVisible(true); // Show the modal with tasks
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      console.error('Error fetching member tasks:', error);
      Alert.alert('Error', 'An error occurred while fetching member tasks');
    }
  };

  const fetchsales = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        console.error('Error: authToken is not provided');
        return;
      }

      const response = await fetch(`http://192.168.1.120:3000/sales`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
      });

      const data = await response.json();
      console.log('Response data:', data); // Log the response data

      if (data.success) {
        setSales(data.sales); 
       // setSalesModalVisible(true); 
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      console.error('Error fetching sales:', error);
      Alert.alert('Error', 'An error occurred while fetching sales');
    }
  };

  const fetchOrders = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        console.error('Error: authToken is not provided');
        return;
      }
  
      const response = await fetch(`http://192.168.1.120:3000/orders`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
      });
  
      // Check if response status is ok
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log('Response data:', data); // Log the response data
  
      if (data.success) {
        setOrders(data.customers);
        //setShowOrdersModal(true); // Show modal after fetching orders

      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      Alert.alert('Error', 'An error occurred while fetching orders');
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
    fetchsales();
    fetchOrders();

  }, []);

  const openPDF = (pdfUrl) => {
    Linking.openURL(pdfUrl);
  };

  const handlePictureSelection = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 3],
        quality: 1,
        allowsMultipleSelection: true, // Enable multiple selection if available
      });

      console.log('Image Picker Result:', result);

      if (!result.canceled) {
        const selectedURIs = result.assets.map((asset) => asset.uri);
        setImages([...images, ...selectedURIs]);
        console.log('Selected Pictures:', selectedURIs);
      } else {
        console.log('Image selection cancelled or URI undefined.');
      }
    } catch (error) {
      console.error('Error selecting picture:', error);
    }
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false); // Hide date picker
    setDate(currentDate); // Update selected date
  };
  
  const postEvent = async (eventData) => {
    try {
      const token = authToken; // Assuming authToken is stored or retrieved
      if (!token) {
        console.error('Error: authToken is not provided');
        return;
      }
      console.log('Sending description:', description);

      const isoDate = date.toISOString(); // Convert selected date to ISO format

      const maxAttendanceNumber = parseInt(maxAttendance);

      // Validate maxAttendance to ensure it's a number
      if (isNaN(maxAttendanceNumber)) {
        console.error('maxAttendance must be a number');
        return;
      }
  
      const formData = new FormData();
      formData.append('description', description);
      formData.append('maxAttendance', maxAttendanceNumber);
      formData.append('date',isoDate);
      images.forEach((uri, index) => {

        const uriParts = uri.split('.');
        const fileType = uriParts[uriParts.length - 1];
        
        formData.append('images', {
          uri,
          name: `images_${index}.${fileType}`,
          type: `image/${fileType}`,
        });
      });  
      const response = await fetch('http://192.168.1.120:3000/events', {
        method: 'POST',
        headers: {
          Authorization: token,
          'Content-Type': 'multipart/form-data',

        },
        body: formData,
      });
  
      const data = await response.json();
      if (response.ok) {
        console.log('Event added successfully:', data);
        console.log('Sending description:', eventData.description);

        // Handle success (optional)
      } else {
        console.error('Failed to add event:', data.message);
        // Handle error (optional)
      }
    } catch (error) {
      console.error('Error adding event:', error);
      // Handle network or other errors (optional)
    }
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
        fetchInternsData();

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
        emailAddress: opportunity.email,
        skills:opportunity.skills,
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

        const emailResponse = await fetch('http://192.168.1.120:3000/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': authToken, // Assuming you have a token for authentication
          },
          body: JSON.stringify({ email: opportunity.email, fullName: opportunity.fullName  }),
        });
  
        const emailData = await emailResponse.json();
        if (!emailData.success) {
          Alert.alert('Error', emailData.message);
        }      
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
  
  const handleMemberChange = (index, value) => {
    const selectedMember = membersData.find(member => member.fullName === value);
    setSelectedMember(selectedMember); // Update selectedMember state
    const updatedSelectedMembers = [...selectedMembers];
    updatedSelectedMembers[index] = selectedMember;
    setSelectedMembers(updatedSelectedMembers);
  };
  

  const handleConnect = async (internId, selectedMemberId,selectedSuggestedMemberId) => {
    try {
      // Make a PUT request to update the Internship document with the selected memberId
      const memberIdToUse = selectedSuggestedMemberId || selectedMemberId;

      const response = await fetch(`http://192.168.1.120:3000/Internship/${internId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authToken, // Replace with your actual token
        },
        body: JSON.stringify({ employeeId: memberIdToUse }), // Send selected memberId in the request body
      });
  
      const data = await response.json();
      if (data.success) {
        // Perform any additional actions as needed (e.g., updating UI, refreshing data)
        Alert.alert('Success', 'Connected successfully');
      } else {
        Alert.alert('Error', data.message); // Display error message if request fails
      }
    } catch (error) {
      console.error('Error connecting member:', error);
      Alert.alert('Error', 'Failed to connect member');
    }
  };
  
  
  const handleAssignTask = async (description, deadline) => {
    try {
      // Make a POST request to assign a task to the member
      console.log('task')
      const memberId = selectedMemberData?._id;

      const response = await fetch('http://192.168.1.120:3000/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authToken, // Assuming you have a token for authentication
        },
        body: JSON.stringify({ memberId,description, deadline }),
      });

      const data = await response.json();
      if (data.success) {
        // If task is successfully assigned, perform any additional actions as needed
        Alert.alert('Success', 'Task assigned successfully');
      } else {
        Alert.alert('Error', data.message); // Display error message if request fails
      }
    } catch (error) {
      console.error('Error assigning task:', error);
      Alert.alert('Error', 'Failed to assign task');
    }
  };

  const openTaskForm = (memberData) => {
    setSelectedMemberData(memberData); // Set the selected member's data
    setShowTaskForm(true); // Open the task form
  };

  const navigateToStore = () => {

    navigation.navigate('AdminStore', { authToken });
    
};

  // Function to close the task form
  const closeTaskForm = () => {
    setSelectedMemberData(null); // Reset selected member's data
    setShowTaskForm(false); // Close the task form
  };
  

  return (
    <ScrollView contentContainerStyle={{}}>
    <View style={styles.container}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Manager Screen</Text>
      {/*membership forms */}      

      <TouchableOpacity style={styles.button} onPress={() => setShowMembershipForms(true)}>
          <Text style={styles.buttonText}>Membership Forms</Text>
        </TouchableOpacity>
 <MembershipFormsModal
        visible={showMembershipForms}
        onClose={() => setShowMembershipForms(false)}
        membershipData={membershipData}
        handleApprove={handleApprove}
        handleReject={handleReject}
      />

      {/*opportunities forms */}      
<TouchableOpacity style={styles.button} onPress={() => setShowOpportunitiesForms(true)}>
          <Text style={styles.buttonText}>Opportunities Forms</Text>
        </TouchableOpacity>
 <OpportunitiesModal
        visible={showOpportunitiesForms}
        onClose={() => setShowOpportunitiesForms(false)}
        opportunitiesData={opportunitiesData}
        handleApproveOpp={handleApproveOpp}
        handleRejectOpp={handleRejectOpp}
      />

        {/*  MembersModal  */}
<TouchableOpacity style={styles.button} onPress={openMembersModal}>
          <Text style={styles.buttonText}>Show Members</Text>
        </TouchableOpacity>

        <MembersModal
          visible={showMembersModal}
          onClose={closeMembersModal}
          membersData={membersData}
          openTaskForm={openTaskForm}
          showTaskForm={showTaskForm}
          closeTaskForm={closeTaskForm}
          handleAssignTask={handleAssignTask}
          fetchMemberTasks={fetchMemberTasks}
          selectedMemberData={selectedMemberData}
          tasks={tasks} // Pass tasks data to MembersModal
          tasksModalVisible={tasksModalVisible} // Pass tasks modal visibility state
          setTasksModalVisible={setTasksModalVisible} 
        />

<TouchableOpacity   style={ styles.button} onPress={openInternsModal}>
        <Text style={styles.buttonText}>Show Interns</Text>
      </TouchableOpacity>

      <InternsModal 
      visible={showInternsModal} 
      onClose={closeInternsModal} 
      internsData={internsData} 
      membersData={membersData}
      handleConnect={handleConnect}
      />
      

<TouchableOpacity style={styles.button} onPress={openSalesModal}>
          <Text style={styles.buttonText}>Show Sales</Text>
        </TouchableOpacity>
        <SalesModal
          visible={salesModalVisible}
          onClose={() => setSalesModalVisible(false)}
          sales={sales}
        />


<TouchableOpacity style={styles.button} onPress={openOrdersModal}>
          <Text style={styles.buttonText}>Show Orders</Text>
        </TouchableOpacity>
        <OrdersModal visible={showOrdersModal} 
        onClose={() => setShowOrdersModal(false)} 
        orders={orders} 
        />
<TouchableOpacity style={styles.button} onPress={navigateToStore}>
          <Text style={styles.buttonText}>Store</Text>
        </TouchableOpacity>
        

<TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />
        <TextInput
          style={styles.input}
          placeholder="maximum attendance"
          value={maxAttendance}
          onChangeText={setMAttendance}
          keyboardType='numeric'
        />
      
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <Text>Select Date</Text>
        </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date || new Date()}
          mode="datetime"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
          style={Platform.OS === 'android' ? styles.pickerText : undefined}
        />
      )}

<TouchableOpacity style={styles.button1} onPress={handlePictureSelection}>
        <Text style={styles.buttonText1}>choose pictures</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logout} onPress={postEvent}>
    <MaterialIcons name="exit-to-app" size={30} color="#a86556" style={styles.logoutIcon} />
    <Text style={styles.logoutText}>add event</Text>
  </TouchableOpacity>
 

 

 
 

  <TouchableOpacity style={styles.logout} onPress={handleLogout}>
    <MaterialIcons name="exit-to-app" size={30} color="#a86556" style={styles.logoutIcon} />
    <Text style={styles.logoutText}>Logout</Text>
  </TouchableOpacity>
    </View>
    </ScrollView>

  );
};


export default ManagerScreen;