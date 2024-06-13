import React, { useState, useEffect, useCallback } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { db } from '../firebase'; // Adjust path if necessary

const ChatScreen = ({ route }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Fetch messages from Firestore when the component mounts
    const unsubscribe = db.collection('chat-empowerher')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        const fetchedMessages = snapshot.docs.map(doc => {
          const firebaseData = doc.data();
          return {
            _id: doc.id,
            text: firebaseData.text,
            createdAt: firebaseData.createdAt, // Convert Firestore Timestamp to Date
            user: firebaseData.user,
          };
        });
        setMessages(fetchedMessages);
      });

    return () => unsubscribe(); // Cleanup function to unsubscribe from snapshot listener
  }, []);

  const onSend = useCallback(async (messages = []) => {
    try {
      // Prepare messages to be sent to Firestore
      const newMessages = messages.map(message => ({
        _id: message._id,
        text: message.text,
        createdAt: message.createdAt.toISOString(),
        user: message.user,
      }));

      // Add each message to Firestore
      await Promise.all(
        newMessages.map(async message => {
          await db.collection('chat-empowerher').add(message);
        })
      );

      // Update local state to include the new message
      setMessages(previousMessages => GiftedChat.append(previousMessages, messages));

    } catch (error) {
      console.error('Error sending message:', error);
    }
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: '1', // Assuming userId is passed from navigation
        name: 'Sarah', // Provide a default name if needed
      }}
    />
  );
};

export default ChatScreen;
