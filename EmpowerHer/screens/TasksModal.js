// TasksModal.js
import React from 'react';
import { Modal, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Manager as styles } from '../styles/ManagerStyles'; // Import styles from the separated file
import { format } from 'date-fns';

const TasksModal = ({ visible, onClose, tasks }) => {
    const formatDeadline = (deadline) => {
        return format(new Date(deadline), 'dd-MM-yyyy');
      };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
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
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default TasksModal;
