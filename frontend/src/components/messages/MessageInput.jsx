import React from "react";
import { useState } from "react";

import { BsSendFill } from "react-icons/bs";
import { BiImageAdd } from "react-icons/bi";

import useSendMessage from "../../hooks/useSendMessage";
import { messagesContext } from "../../contexts/messages";
import { useContext } from "react";
const MessageInput = ({ setshowImageUploadOption }) => {
  const { sendMessage, loading } = useSendMessage();
  const [message, setMessage] = useState("");
  const sendMessageHandler = (e) => {
    e.preventDefault();
    if (message.length !== 0) {
      const success = sendMessage({ message });
      if (success) {
        setMessage("");
      }
    }
  };
  return (
    <form className="p-4" onSubmit={sendMessageHandler}>
      <div className="w-full relative">
        <input
          type="text"
          placeholder="Send message... "
          className="input input-bordered input-primary w-full text-white text-l block"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <div className="absolute inset-y-0 items-center end-3 flex pe-3 gap-4">
          <button
            type="button"
            className=" text-2xl"
            onClick={() => {
              setshowImageUploadOption((prev) => !prev);
            }}
          >
            <BiImageAdd />
          </button>
          <button type="submit" className="text-2xl">
            {loading ? (
              <span className="loading loading-ring"></span>
            ) : (
              <BsSendFill></BsSendFill>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default MessageInput;
