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
    backgroundColor: '#ffffff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
    backgroundColor: '#f0f0f0',
    textAlign: 'center',
  },
  notificationItemContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ededed',
  },
  notificationItem: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 15,
    elevation: 2,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  notificationBody: {
    fontSize: 16,
    color: '#555555',
    marginBottom: 10,
  },
  notificationTimestamp: {
    fontSize: 14,
    color: '#888888',
  },
  emptyMessage: {
    alignSelf: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#555555',
  },
});

export default NotificationScreen;
