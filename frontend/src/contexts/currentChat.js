import { createContext, useState } from "react";

export const CurrentChat = createContext();

export const CurrentChatProvider = ({ children }) => {
  const [chatingWith, setChattingWith] = useState(null);
  const [chatType, setChatType] = useState(null);
  return (
    <CurrentChat.Provider
      value={{ chatingWith, setChattingWith, chatType, setChatType }}
    >
      {children}
    </CurrentChat.Provider>
  );
};
