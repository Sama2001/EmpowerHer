import React, { useState, useEffect, useCallback } from 'react';


const ChatScreen = () => {
  /*const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserAndMessages = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const userResponse = await axios.get('http://your-server-ip:5000/users/me', { headers: { Authorization: `Bearer ${token}` } });
        setUser({ _id: userResponse.data._id, name: userResponse.data.username });

        const messagesResponse = await axios.get('http://your-server-ip:5000/messages', { headers: { Authorization: `Bearer ${token}` } });
        const formattedMessages = messagesResponse.data.map(msg => ({
          _id: msg._id,
          text: msg.text,
          createdAt: new Date(msg.createdAt),
          user: msg.user
        }));

        setMessages(formattedMessages);
      }
    };

    fetchUserAndMessages();
  }, []);

  const onSend = useCallback(async (messages = []) => {
    const token = await AsyncStorage.getItem('token');
    try {
      await axios.post('http://your-server-ip:5000/messages', messages[0], { headers: { Authorization: `Bearer ${token}` } });
      setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={user}
    />
  );*/
};

export default ChatScreen;
