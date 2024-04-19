import React from "react";
import { MessageHeader } from "./MessageHeader";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import Welcome from "./Welcome";
import { useContext } from "react";
import { CurrentChat } from "../../contexts/currentChat";
import ImageInput from "./ImageInput";
import { useState } from "react";

const MessageContainer = () => {
  const { chatingWith } = useContext(CurrentChat);
  const [showImageUploadOption, setshowImageUploadOption] = useState(false);
  return (
    <div className=" messageContainer md:min-w-[450px] flex flex-col w-full ">
      {chatingWith ? (
        <>
          <MessageHeader />
          <Messages chatingWith={chatingWith} />
          {showImageUploadOption && (
            <ImageInput
              setshowImageUploadOption={setshowImageUploadOption}
            ></ImageInput>
          )}

          <MessageInput setshowImageUploadOption={setshowImageUploadOption} />
        </>
      ) : (
        <Welcome />
      )}
    </div>
  );
};

export default MessageContainer;
