import React, { useContext } from "react";
import Message from "./Message";
import useGetMessages from "../../hooks/useGetMessages";
import { UserContext } from "../../contexts/userContext";
import { useEffect } from "react";
import { messagesContext } from "../../contexts/messages";

const Messages = () => {
  const { user } = useContext(UserContext);
  const { messages } = useContext(messagesContext);
  const { getMessages, loading, chatingWith } = useGetMessages();

  useEffect(() => {
    getMessages();
  }, [chatingWith]);

  function scrollToBottom() {
    var messagesCont = document.getElementById("messagesCont");
    messagesCont.scrollTop = messagesCont.scrollHeight;
  }
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="pl-6 pr-0 py-5 flex-1 overflow-auto " id="messagesCont">
      {messages.length === 0 ? (
        <div className="h-full w-full text-center justify-center">
          <span className=" text-2xl font-semibold text-white">
            Be this first to make a move😉{" "}
          </span>
        </div>
      ) : (
        messages.map((message) => {
          return (
            <Message
              key={message._id}
              message={message}
              chatType={message.senderId === user._id}
            />
          );
        })
      )}
    </div>
  );
};

export default Messages;
