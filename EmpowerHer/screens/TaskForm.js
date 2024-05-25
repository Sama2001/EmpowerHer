import React, { useState } from 'react';
import { View, TextInput, Button, Modal, Platform, Text,TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'; // Import DateTimePicker from '@react-native-community/datetimepicker'
import { TaskForm as styles } from '../styles/TaskFormStyle'; // Import styles
import { Ionicons } from '@expo/vector-icons'; // Assuming you are using Expo for vector icons

const TaskForm = ({ visible, onClose, onAssignTask, memberData }) => {
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState(new Date()); // Initialize deadline with current date
  const [showDatePicker, setShowDatePicker] = useState(false); // State to toggle date picker visibility
  console.log('Member Data:', memberData);

  const handleAssignTask = () => {
    // Check if description is not empty
    if (description.trim() === '') {
      // Show an error message or do nothing
      return;
    }

    // Call onAssignTask function passed from parent component
    onAssignTask(description, deadline);

    // Reset form fields
    setDescription('');
    setDeadline(new Date()); // Reset deadline to current date
  };

  if (!visible) {
    return null; // If modal is not visible, don't render anything
  }

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        {memberData && (
          <View style={styles.memberInfo}>
            <Text style={styles.memberInfoTitle}>Selected Member:</Text>
            <Text>Name: {memberData.fullName}</Text>
            <Text>Email: {memberData.emailAddress|| memberData.email}</Text>
            {/* Add more member fields here as needed */}
          </View>
        )}

        <TextInput
          style={styles.input}
          placeholder="Task Description"
          placeholderTextColor="gray" 
          value={description}
          onChangeText={text => setDescription(text)}
        />
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.selectDate}>
        <Text style={styles.buttonText}>Select Deadline</Text>
          </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={deadline}
            mode="datetime" // Change mode to 'date' if you only want to select the date
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={(event, selectedDate) => {
              setShowDatePicker(Platform.OS === 'ios');
              setDeadline(selectedDate || deadline); // If user cancels, keep the current deadline
            }}
            textColor={Platform.OS === 'ios' ? 'black' : undefined} // iOS specific text color
          style={Platform.OS === 'android' ? styles.pickerText : undefined} // Android specific style
          />
        )}
       {/* <Button title="Assign Task" onPress={handleAssignTask} />*/} 

        <TouchableOpacity onPress={() => {handleAssignTask} } style={styles.selectDate}>
        <Text style={styles.buttonText}>Assign Task</Text>
          </TouchableOpacity>

        <TouchableOpacity onPress={onClose} style={styles.CloseButton}>
            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>
      </View>
    </Modal>
  );
};


export default TaskForm;
