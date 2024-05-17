import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, Text, Alert, TouchableOpacity } from 'react-native';
import { tasksScreenStyles as styles } from '../styles/TasksScreenStyles';

const TasksScreen = ({ route, navigation }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { authToken, memberId } = route.params;


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

  const navigateToHome = () => {
    navigation.navigate('Home', { authToken });
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
            <Text style={styles.taskTitle}>{item.description}</Text>
            <Text style={styles.taskDescription}>{item.progress}</Text>
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
