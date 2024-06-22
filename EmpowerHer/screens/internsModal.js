import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons'; // Assuming you are using Expo for vector icons

const InternsModal = ({ visible, onClose, internsData, membersData, handleConnect }) => {
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [selectedSuggestedMembers, setSelectedSuggestedMembers] = useState([]);

  useEffect(() => {
    setSelectedMembers(Array(internsData.length).fill(null));
    setSelectedSuggestedMembers(Array(internsData.length).fill(null));
  }, [internsData]);

  const handleMemberChange = (index, value) => {
    const selectedMember = membersData.find(member => member.fullName === value);
    const updatedSelectedMembers = [...selectedMembers];
    updatedSelectedMembers[index] = selectedMember;
    setSelectedMembers(updatedSelectedMembers);
  };

  const handleSuggestedMemberChange = (index, value) => {
    const selectedMember = membersData.find(member => member.fullName === value);
    const updatedSelectedSuggestedMembers = [...selectedSuggestedMembers];
    updatedSelectedSuggestedMembers[index] = selectedMember;
    setSelectedSuggestedMembers(updatedSelectedSuggestedMembers);
  };

  const suggestMembers = (internSkills, members) => {
    const internSkillsLower = typeof internSkills === 'string' ? internSkills.toLowerCase().split(', ') : [];
    
    const suggestedMembers = members.filter(member => {
      const projectSummaryLower = typeof member.projectSummary === 'string' ? member.projectSummary.toLowerCase().split(', ') : [];
  
      const isMatch = internSkillsLower.some(skill => {
        return projectSummaryLower.some(summary => {
          return summary.includes(skill);
        });
      });
  
      return isMatch;
    });
  
    console.log('Suggested Members:', suggestedMembers);
    return suggestedMembers;
  };
  

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Interns</Text>
          <ScrollView style={styles.scrollView}>
            {internsData.map((intern, index) => {
              const suggestedMembers = suggestMembers(intern.skills, membersData);
              return (
                <View key={index} style={styles.internContainer}>
                  <Text style={styles.name}>{intern.fullName}</Text>
                  <Text style={styles.email}>Email: {intern.emailAddress}</Text>
                  <Text style={styles.address}>Address: {intern.address}</Text>
                  <Text style={styles.mobileNumber}>Mobile number: {intern.mobileNumber}</Text>
                  <Text style={styles.mobileNumber}>Skills: {intern.skills}</Text>

                  <Text style={styles.pickerLabel}>All Members:</Text>
                  <Picker
                    selectedValue={selectedMembers[index]?.fullName}
                    onValueChange={(value) => handleMemberChange(index, value)}>
                    <Picker.Item label="Select a member" value={null} />
                    {membersData.map((member, memberIndex) => (
                      <Picker.Item key={memberIndex} label={member.fullName} value={member.fullName} />
                    ))}
                  </Picker>

                  <Text style={styles.pickerLabel}>Suggested Members:</Text>
                  <Picker
                    selectedValue={selectedSuggestedMembers[index]?.fullName}
                    onValueChange={(value) => handleSuggestedMemberChange(index, value)}>
                    <Picker.Item label="Select a suggested member" value={null} />
                    {suggestedMembers.map((member, memberIndex) => (
                      <Picker.Item key={memberIndex} label={member.fullName} value={member.fullName} />
                    ))}
                  </Picker>


                  <TouchableOpacity
                    style={styles.connectButton}
                    onPress={() => handleConnect(intern._id, selectedMembers[index]?._id, selectedSuggestedMembers[index]?._id)}>
                    <Text style={styles.connectButtonText}>Connect</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </ScrollView>
          <View style={styles.closeButtonContainer}>
            <TouchableOpacity onPress={onClose} style={styles.Closebutton}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Closebutton:{
    padding: 3,
    borderRadius:10,
    backgroundColor: 'rgba(187, 123, 107, 0.6)',
  },
  closeButtonContainer: {
    position: 'absolute',
    top: 65, // Adjust as needed
    right:30,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom:15,
  },
  email: {
    fontSize: 16,
    color: 'black',
    marginBottom:10,
  },
  address: {
    fontSize: 16,
    color: 'black',
    marginBottom:10,
  },
  mobileNumber: {
    fontSize: 16,
    color: 'black',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '100%',
    height: '100%',
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 20,
    marginTop:30,
    fontWeight:'bold',
    color:'rgba(187, 123, 107, 1)',
  },
  scrollView: {
    flex: 1,
    width: 350,
  },
  internContainer: {
    marginTop: 10,
    marginBottom: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
    width: 350,
  },
  connectButton: {
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(187, 123, 107, 0.8)',
  },
  connectButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  pickerLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
});

export default InternsModal;
