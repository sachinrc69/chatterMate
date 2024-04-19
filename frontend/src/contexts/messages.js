import { createContext, useState } from "react";

export const messagesContext = createContext();

export const MessageContextProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  console.log(messages);

  return (
    <messagesContext.Provider value={{ messages, setMessages }}>
      {children}
    </messagesContext.Provider>
  );
};
