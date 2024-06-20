// MessageContext.js
import React, { createContext, useContext, useState } from 'react';

const MessageContext = createContext();

export const useMessageCount = () => {
  return useContext(MessageContext);
};

export const MessageProvider = ({ children }) => {
  const [messageCount, setMessageCount] = useState(0);

  const incrementMessageCount = () => {
    setMessageCount(prevCount => prevCount + 1);
  };

  const resetMessageCount = () => {
    setMessageCount(0);
  };

  return (
    <MessageContext.Provider value={{ messageCount, setMessageCount, incrementMessageCount, resetMessageCount }}>
      {children}
    </MessageContext.Provider>
  );
};
