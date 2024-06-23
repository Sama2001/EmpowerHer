import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';

const NotificationScreen = ({ navigation, route }) => {
  const [notifications, setNotifications] = useState([]);
  const { authToken, memberId } = route.params ?? {};

  const navigateToTasks = () => {
    if (memberId) {
      navigation.navigate('tasks', { authToken, memberId });
    } else {
      Alert.alert('Error', 'Member ID not found');
    }
  };

  const fetchNotifications = async () => {
    try {
        const response = await fetch(`http://192.168.1.120:3000/notifications?memberId=${memberId}`, {
            headers: {
              Authorization: authToken, // Pass auth token in headers if required by your backend
            },
          });
                const data = await response.json();
      if (data.success) {
        setNotifications(data.notifications || []);
      } else {
        console.error('Failed to fetch notifications:', data.message);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  useEffect(() => {
    if (memberId && authToken) {
      fetchNotifications();
    }
  }, [memberId, authToken]);

  const renderNotificationItem = ({ item }) => (
    <TouchableOpacity onPress={navigateToTasks}>
      <View style={styles.notificationItem}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationBody}>{item.body}</Text>
        <Text style={styles.notificationTimestamp}>{new Date(item.timestamp).toLocaleString()}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notifications</Text>
      {notifications.length > 0 ? (
        <FlatList
          data={notifications}
          renderItem={renderNotificationItem}
          keyExtractor={item => item._id}
        />
      ) : (
        <Text style={styles.emptyMessage}>No notifications found</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  notificationItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  notificationBody: {
    fontSize: 16,
  },
  notificationTimestamp: {
    fontSize: 14,
    color: '#888',
  },
  emptyMessage: {
    alignSelf: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});

export default NotificationScreen;
