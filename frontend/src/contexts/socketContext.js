import { createContext, useState, useContext, useEffect } from "react";
import { UserContext } from "./userContext";
import io from "socket.io-client";
export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const { user } = useContext(UserContext);

  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState(null);

  useEffect(() => {
    if (user) {
      const socket = io("http://localhost:5000", {
        query: {
          userId: user._id,
        },
      });
      socket.on("getUsersOnline", (users) => {
        setOnlineUsers(users);
      });
      setSocket(socket);
      return () => {
        socket.close();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
