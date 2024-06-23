// TasksModal.js
import React from 'react';
import { Modal, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Manager as styles } from '../styles/ManagerStyles'; // Import styles from the separated file
import { format } from 'date-fns';
import { Ionicons } from '@expo/vector-icons'; // Assuming you are using Expo for vector icons

const TasksModal = ({ visible, onClose, tasks }) => {
    const formatDeadline = (deadline) => {
        return format(new Date(deadline), 'dd-MM-yyyy');
      };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer3}>
        <View style={styles.modalContent3}>
          <Text style={styles.modalTitle}>Tasks</Text>
          <ScrollView>
            {tasks.length > 0 ? (
              tasks.map((task, index) => (
                <View key={index} style={styles.taskItem}>
                  <Text style={styles.taskText}>Description: {task.description}</Text>
                  <Text style={styles.taskText}>Deadline:{formatDeadline(task.deadline)}</Text>
                  <Text style={styles.taskText}>Progress:{task.progress}</Text>
                  <Text style={styles.taskText}>Status:{task.status}</Text>


                </View>
              ))
            ) : (
              <Text style={styles.noTasksText}>No tasks found</Text>
            )}
          </ScrollView>
          <View style={styles.closeButtonContainer3}>
        <TouchableOpacity onPress={onClose} style={styles.CloseButton3}>
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>
        </View>
      </View>
    </Modal>
  );
};

export default TasksModal;
