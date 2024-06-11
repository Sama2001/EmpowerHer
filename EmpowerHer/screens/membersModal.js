import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal ,ScrollView} from 'react-native';
import { Manager as styles } from '../styles/ManagerStyles'; // Import styles from the separated file
import TaskForm from './TaskForm';
import TasksModal from './TasksModal'; // Import the TaskModal component
import { Ionicons } from '@expo/vector-icons'; // Assuming you are using Expo for vector icons

const MembersModal = ({ visible, onClose, membersData, openTaskForm, showTaskForm, closeTaskForm, handleAssignTask, fetchMemberTasks, selectedMemberData,tasks,tasksModalVisible, setTasksModalVisible  }) => {

 
    return (
      
    <Modal visible={visible} animationType="slide" transparent={false} >
      <Text style={styles.membersTitle}>Members</Text>

              <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center',margin: 10 }}>

      <View style={styles.modalContainer}>

        {membersData.length === 0 && (
          <Text>No Members found</Text>
        )}
        {membersData.length > 0 && (
          membersData.map((member, index) => (
            <View key={index} style={styles.opportunityContainer}>
             {/*  <Text style={styles.opportunityTitle}>Member {index + 1}</Text>*/}
              <Text style={styles.opportunityTitle}>{member.fullName}</Text>
              <Text style={styles.email}>Email: {member.email}{member.emailAddress}</Text>
              <Text style={styles.mobileNumber}>Mobile number: {member.mobileNumber}</Text>
              <Text style={styles.address}>Address: {member.address}</Text>

              <TouchableOpacity onPress={() => openTaskForm(member)} style={styles.Taskbutton}>
                <Text>Add Task</Text>
              </TouchableOpacity>

              {showTaskForm && (
                <TaskForm
                  visible={showTaskForm}
                  onClose={closeTaskForm}
                  onAssignTask={handleAssignTask}
                  memberData={selectedMemberData} // Pass the selected member's data as props
                />
              )}

<TouchableOpacity onPress={() => fetchMemberTasks(member._id)} style={styles.Taskbutton}>
                                <Text>View Tasks</Text>
                            </TouchableOpacity>

            </View>
          ))
        )}
       
  
                        <TasksModal
                            visible={tasksModalVisible}
                            onClose={() => setTasksModalVisible(false)}
                            tasks={tasks}
                        />
                 
          
      </View>
      </ScrollView>
      <View style={styles.closeButtonContainer2}>
        <TouchableOpacity onPress={onClose} style={styles.CloseButton}>
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>


    </Modal>
  );
};

export default MembersModal;
