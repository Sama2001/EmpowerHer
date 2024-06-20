import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Modal, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { db } from '../firebase'; // Adjust path if necessary
import uuid from 'uuid';
import { useMessageCount } from './MessageContext';
import { MessageContext } from './MessageContext'; // Adjust path as necessary

const ChatScreen = ({ route }) => {
  const { authToken, userId } = route.params;
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false); // Initially hidden
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [chats, setChats] = useState([]);
  const [chatModalVisible, setChatModalVisible] = useState(false); // <-- Add state for full-screen chat modal
  const {  setMessageCount ,resetMessageCount} = useMessageCount();
  const { messageCount, incrementMessageCount } = useMessageCount();

  // Fetch users and current user details on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://192.168.1.120:3000/users', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': authToken,
          },
        });
        const data = await response.json();
        setUsers(data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
 

    const fetchCurrentUser = async () => {
      try {
        const response = await fetch(`http://192.168.1.120:3000/user/${userId}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': authToken,
          },
        });
        const data = await response.json();
        setCurrentUser(data.user);
      } catch (error) {
        console.error('Error fetching current user:', error);
      }
    };

    fetchUsers();
    fetchCurrentUser();
  }, [authToken, userId]);


  
  useEffect(() => {
    const fetchMessageCount = async () => {
      if (!currentUser) return;

      try {
        const recipientChatSnapshots = await db
          .collection('chat-empowerher')
          .where('recipientId', '==', currentUser._id)
          .get();

        const messageCount = recipientChatSnapshots.docs.length;
        setMessageCount(messageCount);
      } catch (error) {
        console.error('Error fetching message count:', error);
      }
    };

    fetchMessageCount();
  }, [currentUser,setMessageCount]);

  // Fetch chats where currentUser is either sender or recipient
  useEffect(() => {
    const fetchChats = async () => {
      if (!currentUser) return;
  
      try {
        const senderChatSnapshots = await db
          .collection('chat-empowerher')
          .where('user._id', '==', currentUser._id)
          .get();
  
        const recipientChatSnapshots = await db
          .collection('chat-empowerher')
          .where('recipientId', '==', currentUser._id)
          .get();
  
        const senderChats = senderChatSnapshots.docs.map(doc => doc.data());
        const recipientChats = recipientChatSnapshots.docs.map(doc => doc.data());
      
      
        // Merge and sort chats by createdAt descending
        const mergedChats = [...senderChats, ...recipientChats];
        const sortedChats = mergedChats.sort((a, b) => b.createdAt - a.createdAt);
  
        // Group chats by the other user's ID (sender or recipient)
        const groupedChats = {};
        sortedChats.forEach(chat => {
          const otherUserId = chat.user._id === currentUser._id ? chat.recipientId : chat.user._id;
          if (!groupedChats[otherUserId] || chat.createdAt > groupedChats[otherUserId].createdAt) {
            groupedChats[otherUserId] = chat;
          }
        });
  
        // Convert object back to array and sort by latest message
        const finalChats = Object.values(groupedChats).sort((a, b) => b.createdAt - a.createdAt);
        setChats(finalChats);
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };
  
    fetchChats();
  }, [currentUser]);
  
  // Fetch messages when a user selects a chat recipient
  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedUser || !currentUser) return;

      const chatId = generateChatId(currentUser._id, selectedUser._id);

      const unsubscribe = db
        .collection('chat-empowerher')
        .where('chatId', '==', chatId)
        .orderBy('createdAt', 'desc')
        .onSnapshot(snapshot => {
          const fetchedMessages = snapshot.docs.map(doc => ({
            _id: doc.id,
            text: doc.data().text,
            createdAt: doc.data().createdAt.toDate(),
            user: doc.data().user,
            recipientId: doc.data().recipientId,
          }));

          // Set messages state; if no messages found, set an empty array
          setMessages(fetchedMessages.length > 0 ? fetchedMessages : []);
        });
      return () => unsubscribe();
    };

    fetchMessages();
  }, [selectedUser, currentUser]);

  // Function to handle sending messages
  const onSend = useCallback(async (messages = []) => {
    try {
      const chatId = generateChatId(userId, selectedUser._id);

      const newMessages = messages.map(message => ({
        ...message,
        _id: message._id || uuid.v4(),
        user: {
          _id: currentUser._id,
          name: `${currentUser.firstName} ${currentUser.lastName}`,
        },
        chatId,
        recipientId: selectedUser._id,
        recipientName: `${selectedUser.firstName} ${selectedUser.lastName}`,
      }));

      await Promise.all(
        newMessages.map(async message => {
          await db.collection('chat-empowerher').add(message);
        })
      );
      setMessageCount(messageCount + newMessages.length);

    } catch (error) {
      console.error('Error sending message:', error);
    }
  }, [userId, selectedUser, currentUser,setMessageCount]);

  // Function to handle selecting a user to chat with
 const handleUserSelect = async (user) => {
    setSelectedUser(user);
    setModalVisible(false);
    setChatModalVisible(true); // Open full-screen chat modal

  };

  const closeChatModal = () => {
    setChatModalVisible(false);
    setSelectedUser(null); // Clear selected user when closing modal
  };

  // Function to open modal for selecting user
  const openModal = () => {
    setModalVisible(true);
  };

  // Rendering the chat screen
  return (
    <View style={{ flex: 1 }}>
<View style={styles.totalReceivedMessages}>
        <Text style={styles.messageCountText}>Messages received: {messageCount}</Text>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Select a User to Chat With</Text>
            <FlatList
              data={users}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.userItem}
                  onPress={() => handleUserSelect(item)}
                >
                  <Text style={styles.userName}>{item.firstName} {item.lastName}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      {/* Render a button to open modal if no user is selected */}
      {!selectedUser && (
        <TouchableOpacity style={styles.newChatButton} onPress={openModal}>
          <Text style={styles.newChatButtonText}>New Chat</Text>
        </TouchableOpacity>
      )}

      {/* Render chats list */}
      <FlatList
  data={chats}
  keyExtractor={item => item._id}
  renderItem={({ item }) => {
    const otherUser = item.user._id === currentUser._id ? item.recipientName : item.user.name;
    const lastMessage = item.user._id === currentUser._id ? `You: ${item.text}` : item.text;
    return (
      <TouchableOpacity
        style={styles.chatItem}
        onPress={() => handleUserSelect({
          _id: item.user._id === currentUser._id ? item.recipientId : item.user._id,
          firstName: otherUser.split(' ')[0],
          lastName: otherUser.split(' ')[1],
        })}
      >
        <Text style={styles.chatUserName}>{otherUser}</Text>
        <Text style={styles.lastMessage}>
          {lastMessage ? lastMessage : ''}
        </Text>
      </TouchableOpacity>
    );
  }}
/>


      {/* Render GiftedChat when a user is selected */}
      {selectedUser && currentUser && (
          <Modal
          animationType="slide"
          visible={chatModalVisible}
          onRequestClose={closeChatModal}
        >

        <View style={{ flex: 1 }}>
          <View style={styles.header}>
          <TouchableOpacity onPress={closeChatModal}>
                <Text style={styles.backButton}>Back</Text>
              </TouchableOpacity>

            <Text style={styles.headerText}>{selectedUser.firstName} {selectedUser.lastName}</Text>
          </View>
          <GiftedChat
            messages={messages.map(message => ({
              _id: message._id,
              text: message.text,
              createdAt: message.createdAt,
              user: {
                _id: message.user._id,
                name: message.user.name,
              },
            }))}
            onSend={messages => onSend(messages)}
            user={{
              _id: currentUser._id,
              name: `${currentUser.firstName} ${currentUser.lastName}`,
            }}
          />
        </View>
        </Modal>

      )}
    </View>
  );
};

// Function to generate chat ID based on user IDs
const generateChatId = (userId1, userId2) => {
  return userId1 < userId2 ? `${userId1}_${userId2}` : `${userId2}_${userId1}`;
};

// Styles for the ChatScreen component
const styles = StyleSheet.create({
  
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },

  totalReceivedMessages: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },

  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  userItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  userName: {
    fontSize: 18,
  },
  newChatButton: {
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 5,
    margin: 10,
  },
  newChatButtonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  chatItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  chatUserName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  lastMessage: {
    fontSize: 14,
    color: "#888",
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginTop:30,
    backgroundColor: "#f5f5f5",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  backButton: {
    fontSize: 18,
    marginRight: 100,
    color: '#007BFF',
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default ChatScreen;  