import React, { useState } from 'react';
import { View, TextInput, Button, Modal, Platform, StyleSheet, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'; // Import DateTimePicker from '@react-native-community/datetimepicker'

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
        {/* Render selected member's data */}
        {memberData && (
          <View style={styles.memberInfo}>
            <Text style={styles.memberInfoTitle}>Selected Member:</Text>
            <Text>Name: {memberData.fullName}</Text>
            <Text>Email: {memberData.emailAddress}</Text>
            {/* Add more member fields here as needed */}
          </View>
        )}

        <TextInput
          style={styles.input}
          placeholder="Task Description"
          value={description}
          onChangeText={text => setDescription(text)}
        />
        <Button title="Select Deadline" onPress={() => setShowDatePicker(true)} />
        {showDatePicker && (
          <DateTimePicker
            value={deadline}
            mode="datetime" // Change mode to 'date' if you only want to select the date
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={(event, selectedDate) => {
              setShowDatePicker(Platform.OS === 'ios');
              setDeadline(selectedDate || deadline); // If user cancels, keep the current deadline
            }}
          />
        )}
        <Button title="Assign Task" onPress={handleAssignTask} />
        <Button title="Close" onPress={onClose} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'pink',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  memberInfo: {
    marginBottom:-5,
    color:'pink',
  },
  memberInfoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color:'white',
  },
});

export default TaskForm;
