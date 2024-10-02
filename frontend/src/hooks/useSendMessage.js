import React, { useState, useContext } from "react";
import { CurrentChat } from "../contexts/currentChat";
import { messagesContext } from "../contexts/messages";
import { url } from "../backendUrl";

const useSendMessage = () => {
  const { messages, setMessages } = useContext(messagesContext);

  const { chatingWith, chatType } = useContext(CurrentChat);
  const [loading, setLoading] = useState(false);
  const authToken = localStorage.getItem("authToken");
  const sendMessage = async ({ message }) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${url}/api/message/send${
          chatType === "group" ? "/group" : ""
        }/${chatingWith}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + authToken,
          },
          body: JSON.stringify({
            message: message,
          }),
        }
      );
      const resData = await response.json();
      if (!response.ok) {
        return false;
      } else {
        console.log(resData);
        setMessages([...messages, resData.newMessage]);
        return true;
      }
    } catch (error) {
      alert(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};

export default useSendMessage;
