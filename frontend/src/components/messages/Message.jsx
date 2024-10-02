import React, { useRef, useContext } from "react";
import { CurrentGroup } from "../../contexts/currentGroup";
// import imageLoading from "../../images/imageLoading.jpg";
const Message = ({ chatType, message, avatar }) => {
  const { group } = useContext(CurrentGroup);
  console.log(group?.participants);
  const posi = useRef(chatType);
  console.log(message);

  const dateString = message.createdAt;
  const dateObject = new Date(dateString);
  const hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();
  const currentTime = new Date();
  const currentHours = currentTime.getHours();
  const currentMinutes = currentTime.getMinutes();

  // const imageExists = (imagePath) => {
  //   try {
  //     require(imagePath);
  //     return true;
  //   } catch (error) {
  //     return false;
  //   }
  // };

  return (
    <div className={` mb-3 chat ${posi.current ? "chat-start" : "chat-end "}`}>
      <div className="chat-image avatar">
        {/* <div className="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={avatar} />
        </div> */}
      </div>
      <div
        className={`text-white font-serif  font-medium text-lg chat-bubble ${
          posi.current ? "bg-blue-400" : " bg-green-400 "
        }`}
      >
        {/* {message?.message ? ( */}
        message.message
        {/* ) : (
          <img
            loading="lazy"
            src={
              require(`../../images/${message?.img}`)
                ? require(`../../images/${message?.img}`)
                : require("../../images/imageLoading.jpg")
            }
            alt="Image unavailable"
            className="max-h-48"
          ></img>
        )} */}
        <div className="flex gap-2">
          {!chatType ? (
            <p className="text-xs text-end text-gray-200 font-mono">
              {group.participants.map((participant) => {
                console.log(participant._id, message.senderId);
                if (participant._id === message.senderId) {
                  return participant.username;
                }
              })}
            </p>
          ) : null}

          <p className="text-xs text-end text-gray-200 font-mono">
            {hours || currentHours}:{minutes || currentMinutes}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Message;
