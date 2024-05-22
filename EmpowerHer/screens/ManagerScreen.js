import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, StyleSheet, Image,Linking,ScrollView,TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Manager as styles } from '../styles/ManagerStyles'; // Import styles from the separated file
import ProjectPicturesModal from '../screens/ProjectPicturesModal';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; 
import { Picker } from '@react-native-picker/picker'; // Import Picker from '@react-native-picker/picker'
import TaskForm from './TaskForm';
import TasksModal from './TasksModal'; // Import the TasksModal component
import MembershipFormsModal from './MembershipFormsModal'; // Import the MembershipFormsModal component
import OpportunitiesModal  from './oppModal';
import MembersModal from './membersModal';

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
  const [selectedMember, setSelectedMember] = useState(null); // State for selected member from dropdown
  const [showTaskForm, setShowTaskForm] = useState(false);
  const {authToken} = route.params;
  const [selectedMembers, setSelectedMembers] = useState(Array(internsData.length).fill(null));
  const [selectedMemberData, setSelectedMemberData] = useState(null);
  const [tasksModalVisible, setTasksModalVisible] = useState(false); // State for task modal visibility
  const [tasks, setTasks] = useState([]); // State for tasks data
  const [showMembersModal, setShowMembersModal] = useState(false); // State for showing/hiding members modal

  const openMembersModal = () => {
    setShowMembersModal(true);
  };

  // Function to close members modal
  const closeMembersModal = () => {
    setShowMembersModal(false);
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
  
  const handleMemberChange = (index, value) => {
    const selectedMember = membersData.find(member => member.fullName === value);
    setSelectedMember(selectedMember); // Update selectedMember state
    const updatedSelectedMembers = [...selectedMembers];
    updatedSelectedMembers[index] = selectedMember;
    setSelectedMembers(updatedSelectedMembers);
  };
  

  const handleConnect = async (internId, selectedMemberId) => {
    try {
      // Make a PUT request to update the Internship document with the selected memberId
      const response = await fetch(`http://192.168.1.120:3000/Internship/${internId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authToken, // Replace with your actual token
        },
        body: JSON.stringify({ employeeId: selectedMemberId }), // Send selected memberId in the request body
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

  // Function to close the task form
  const closeTaskForm = () => {
    setSelectedMemberData(null); // Reset selected member's data
    setShowTaskForm(false); // Close the task form
  };
  

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center',margin:10,borderWidth:1,borderColor:'gray' }}>

    <View style={styles.container}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Manager Screen</Text>

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

<TouchableOpacity style={styles.button} onPress={openMembersModal}>
          <Text style={styles.buttonText}>Show Members</Text>
        </TouchableOpacity>

        {/* Render MembersModal component */}
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
        />

      {/*memberships */}      
     {/* <TouchableOpacity
  style={showMembershipForms ? styles.button1 : styles.button}
  onPress={toggleMembershipForms}
>
  <Text style={styles.buttonText}>{showMembershipForms ? "Hide Membership Forms" : "Show Membership Forms"}</Text>
</TouchableOpacity>

      {showMembershipForms && membershipData.length === 0 && (
        <Text>All forms are reviewd </Text>
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
          

            <TouchableOpacity onPress={openModal} style={styles.button}>
        <Text style={styles.buttonText}>View Pictures</Text>
      </TouchableOpacity>

      {showModal && (
        <ProjectPicturesModal projectPictures={form.projectPictures} onClose={closeModal} />
      )}
      

      <View style={styles.buttonContainer}>
  <TouchableOpacity style={styles.Approve} onPress={() => handleApprove(form)}>
    <Text style={styles.buttonText}>Approve</Text>
  </TouchableOpacity>


  
  <TouchableOpacity style={styles.Reject} onPress={() => handleReject(form)}>
    <Text style={styles.buttonText}>Reject</Text>
  </TouchableOpacity>
</View>
       
          </View>
        ))
      )}*/} 


{/* opportunities */}


{/* <TouchableOpacity
  style={showOpportunitiesForms ? styles.button1 : styles.button}
  onPress={toggleOpportunitiesForms}
>
  <Text style={styles.buttonText}>{showOpportunitiesForms ? "Hide Opportunities Forms" : "Show Opportunities Forms"}</Text>
</TouchableOpacity>
{showOpportunitiesForms && opportunitiesData.length === 0 && (
        <Text>All forms are reviewd </Text>
      )}

        {showOpportunitiesForms && opportunitiesData.length > 0 && (
        opportunitiesData.map((opportunity, index) => (
          <View key={index} style={styles.opportunityContainer}>
            <Text style={styles.opportunityTitle}>Opportunity {index + 1}</Text>
            <Text>Name: {opportunity.fullName}</Text>
            <Text>Address: {opportunity.address}</Text>
         
          
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
  <TouchableOpacity style={styles.Approve} onPress={() => handleApproveOpp(opportunity)}>
    <Text style={styles.buttonText}>Approve</Text>
  </TouchableOpacity>


  
  <TouchableOpacity style={styles.Reject} onPress={() => handleRejectOpp(opportunity)}>
    <Text style={styles.buttonText}>Reject</Text>
  </TouchableOpacity>
</View>

          </View>
        ))
      )}*/}
      
    


{/* members */}



{/* <TouchableOpacity
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

            <TouchableOpacity onPress={() => openTaskForm(member)} style={styles.Taskbutton}>
                <Text>Add Task</Text>
              </TouchableOpacity>

      <TaskForm
                visible={showTaskForm}
                onClose={closeTaskForm}
                onAssignTask={handleAssignTask}
                memberData={selectedMemberData} // Pass the selected member's data as props
              />
                <TouchableOpacity onPress={() => fetchMemberTasks(member._id)} style={styles.Taskbutton}>
                <Text>View Tasks</Text>
              </TouchableOpacity>
          </View>



        ))
        
      )}*/}


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
            <Text>Email: {interns.email}</Text>
            <Text>Address: {interns.address}</Text>
             
             
             {/* Dropdown for selecting members */}
             <Picker
        selectedValue={selectedMembers[index]?.fullName}
        onValueChange={(value) => handleMemberChange(index, value)}>
        <Picker.Item label="Select a member" value={null} />
        {membersData.map((member, memberIndex) => (
          <Picker.Item key={memberIndex} label={member.fullName} value={member.fullName} />
        ))}
      </Picker>
      {selectedMembers[index] && (
        <View style={styles.selectedMemberInfo}>
          <Text style={styles.selectedMemberTitle}>Selected Member:</Text>
          <Text>Name: {selectedMembers[index]._id}</Text>
          <Text>Email: {selectedMembers[index].emailAddress}</Text>
          {/* Add more fields here as needed */}
        </View>
      )}
            <TouchableOpacity 
  style={styles.Taskbutton} 
  onPress={() => handleConnect(interns._id, selectedMembers[index]?._id)}
>
  <Text style={styles.buttonText1}>Connect</Text>
</TouchableOpacity>

          </View>
        ))
      )}

<TouchableOpacity style={styles.logout} onPress={handleLogout}>
    <MaterialIcons name="exit-to-app" size={30} color="#a86556" style={styles.logoutIcon} />
    <Text style={styles.logoutText}>Logout</Text>
  </TouchableOpacity>

  <TasksModal
        visible={tasksModalVisible}
        onClose={() => setTasksModalVisible(false)}
        tasks={tasks}
      />

    </View>
    </ScrollView>

  );
};


export default ManagerScreen;
