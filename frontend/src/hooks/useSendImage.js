import React, { useState, useContext } from "react";
import { CurrentChat } from "../contexts/currentChat";
import { messagesContext } from "../contexts/messages";
import { url } from "../backendUrl";

const useSendImage = () => {
  const { messages, setMessages } = useContext(messagesContext);

  const { chatingWith, chatType } = useContext(CurrentChat);
  const [loading, setLoading] = useState(false);
  const authToken = localStorage.getItem("authToken");
  const sendImage = async ({ imgData }) => {
    try {
      const formData = new FormData();
      formData.append("image", imgData.image);
      setLoading(true);
      const response = await fetch(
        `${url}/api/message/send/image${
          chatType === "group" ? "/group" : ""
        }/${chatingWith}`,
        {
          method: "POST",
          encType: "multipart/form-data",
          headers: {
            Authorization: "Bearer " + authToken,
          },
          body: formData,
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

  return { sendImage, loading };
};

export default useSendImage;
