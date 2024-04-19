import React, { useState, useContext, useEffect } from "react";
import { CurrentChat } from "../contexts/currentChat";
import { SocketContext } from "../contexts/socketContext";
import notificationSound from "../sounds/moan.mp3";
import { messagesContext } from "../contexts/messages";

const useGetMessages = () => {
  const { chatingWith, chatType } = useContext(CurrentChat);
  const [loading, setLoading] = useState(false);
  const { messages, setMessages } = useContext(messagesContext);
  const authToken = localStorage.getItem("authToken");
  const { socket, onlineUsers } = useContext(SocketContext);
  const getMessages = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:5000/api/${
          chatType === "single" ? "message" : "message/group"
        }/${chatingWith}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + authToken,
          },
        }
      );
      const resData = await response.json();
      if (!response.ok) {
        throw new Error(resData.message);
      } else {
        setMessages(resData);
      }
    } catch (error) {
      alert(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      const notification = new Audio(notificationSound);
      // notification.play();
      setMessages((prev) => [...prev, newMessage]);
    });
    return () => socket?.off("newMessage");
  }, [socket, setMessages, messages]);

  return { getMessages, loading, chatingWith };
};

export default useGetMessages;
