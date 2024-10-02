import React, { useState, useEffect } from "react";

import { useContext } from "react";
import { CurrentChat } from "../../contexts/currentChat";
import { CurrentGroup } from "../../contexts/currentGroup";

export const MessageHeader = () => {
  const { chatingWith, setChattingWith, chatType, setChatType } =
    useContext(CurrentChat);
  const { group, setGroup } = useContext(CurrentGroup);
  const [user, setUser] = useState(null);

  const authToken = localStorage.getItem("authToken");
  console.log(group);

  const getChattingWithDetails = async () => {
    const res = await fetch(`${url}/api/users/${chatingWith}`, {
      headers: { Authorization: "Bearer " + authToken },
    });
    const resData = await res.json();
    if (!res.ok) {
      alert("FAILED TO FETCH USER DETAILS");
    } else {
      setUser(resData);
    }
  };

  const getChattingWithGroupDetails = async () => {
    const res = await fetch(`${url}/api/group/${chatingWith}`, {
      headers: { Authorization: "Bearer " + authToken },
    });
    const resData = await res.json();
    if (!res.ok) {
      alert("FAILED TO FETCH USER DETAILS");
    } else {
      setGroup(resData);
    }
  };
  useEffect(() => {
    if (chatType === "single") getChattingWithDetails();
    else getChattingWithGroupDetails();
  }, [chatingWith]);

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <div className="flex-1">
          <button
            onClick={() => {
              setChattingWith(null);
            }}
          >
            close
          </button>
          <a className="btn btn-ghost text-xl">
            {chatType === "single" ? user?.username : group?.groupName}
          </a>
        </div>
        {chatType == "group" && (
          <div className="flex gap-2">
            {group?.participants.map((participant) => {
              return (
                <p className="text-sm" key={participant._id}>
                  {participant.username}
                </p>
              );
            })}
          </div>
        )}
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src={
                  chatType === "single"
                    ? user?.profilePic
                    : "https://cdn1.iconfinder.com/data/icons/developer-set-2/512/users-512.png"
                }
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
