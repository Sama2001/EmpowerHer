import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, Text, Alert, TouchableOpacity,TextInput } from 'react-native';
import { tasksScreenStyles as styles } from '../styles/TasksScreenStyles';
import { format } from 'date-fns';

const TasksScreen = ({ route, navigation }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { authToken, memberId } = route.params;
  const [selectedTask, setSelectedTask] = useState(null);
  const [newProgress, setNewProgress] = useState('');


  useEffect(() => {
    const fetchTasks = async () => {
        console.log('token:',authToken);
      if (!authToken) {
        console.error('Error: authToken is not provided');
        return;
      }
      try {
        const response = await fetch(`http://192.168.1.120:3000/tasks/${memberId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': authToken, // Pass the authToken in the request headers
          },
        });

        const data = await response.json();

        if (response.ok && data.success) {
          setTasks(data.tasks);
        } else {
          Alert.alert('Error', data.message);
        }
      } catch (err) {
        console.error('Error fetching tasks:', err);
        setError(err.message || 'Error fetching tasks');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [authToken,memberId]);


  const handleUpdateProgress = async (taskId) => {
    try {
      const percentage = `${parseFloat(newProgress)}%`;

      const response = await fetch(`http://192.168.1.120:3000/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authToken,
        },
        body: JSON.stringify({ progress: percentage }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task._id === taskId ? data.task : task))
        );
        setNewProgress('');
        setSelectedTask(null);
        Alert.alert('Success', 'Task progress updated successfully');
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (err) {
      console.error('Error updating task progress:', err);
      Alert.alert('Error', err.message || 'Failed to update task progress');
    }
  };

  const navigateToHome = () => {
    navigation.navigate('Home', { authToken });
  };

  const formatDeadline = (deadline) => {
    return format(new Date(deadline), 'dd-MM-yyyy');
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tasks</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text style={styles.taskTitle}>Task description:{item.description}</Text>
            <Text style={styles.taskDeadline}>Deadline: {formatDeadline(item.deadline)}</Text>
            <Text style={styles.taskDescription}>Progress: {item.progress}</Text>
            {selectedTask === item._id ? (
              <View>
                <TextInput
                  style={styles.progressInput}
                  placeholder="Enter new progress"
                  value={newProgress}
                  onChangeText={setNewProgress}
                  keyboardType="numeric"
                />
                <TouchableOpacity
                  style={styles.updateButton}
                  onPress={() => handleUpdateProgress(item._id)}
                >
                  <Text style={styles.buttonText}>Update Progress</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => setSelectedTask(item._id)}
              >
                <Text style={styles.buttonText}>Edit Progress</Text>
              </TouchableOpacity>
            )}

          </View>
        )}
      />
      <TouchableOpacity style={styles.button} onPress={navigateToHome}>
        <Text style={styles.buttonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TasksScreen;
