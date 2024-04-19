import React from "react";
import { useContext } from "react";
import { CurrentChat } from "../../contexts/currentChat";

const Group = ({ group }) => {
  const { chatingWith, setChattingWith, setChatType } = useContext(CurrentChat);

  return (
    <>
      <div
        className={` flex items-center px-3 py-2 cursor-pointer ${
          chatingWith === group._id && "bg-blue-400"
        } ${chatingWith !== group._id && " hover:bg-black"}`}
        onClick={() => {
          setChattingWith(group._id);
          setChatType("group");
        }}
      >
        <div className="flex gap-2 items-center rounded p-2 py-1 cursor-pointer mr-2">
          {/* <div className={`avatar ${isOnline && "online"}`}> */}
          <div className={`avatar `}>
            <div className=" rounded-full w-16">
              <img src="https://cdn1.iconfinder.com/data/icons/developer-set-2/512/users-512.png" />
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 ">
          <div className="flex gap-2 justify-between">
            <p className="font-bold text-gray-300 text-xl ">
              {group.groupName}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Group;
