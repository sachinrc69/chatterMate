import React from "react";
import { useContext } from "react";
import { CurrentChat } from "../../contexts/currentChat";
import { SocketContext } from "../../contexts/socketContext";
export const User = ({ user, displayOnly }) => {
  const { chatingWith, setChattingWith, chatType, setChatType } =
    useContext(CurrentChat);

  const { onlineUsers } = useContext(SocketContext);
  const isOnline = onlineUsers?.includes(user._id);
  return (
    <>
      <div
        className={` flex items-center px-3 py-2 cursor-pointer ${
          chatingWith === user._id && "bg-blue-400"
        } ${chatingWith !== user._id && !displayOnly ? " hover:bg-black" : ""}`}
        onClick={() => {
          !displayOnly && setChattingWith(user._id);
          !displayOnly && setChatType("single");
        }}
      >
        <div className="flex gap-2 items-center rounded p-2 py-1 cursor-pointer mr-2">
          <div className={`avatar ${isOnline && "online"}`}>
            <div className=" rounded-full w-16">
              <img src={user.profilePic} />
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 ">
          <div className="flex gap-2 justify-between">
            <p className="font-bold text-gray-300 text-xl ">{user.username}</p>
          </div>
        </div>
      </div>
    </>
  );
};
