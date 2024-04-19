import React from "react";
import { IoChatbubblesOutline } from "react-icons/io5";

const Welcome = () => {
  const temp = localStorage.getItem("user");
  const currentUser = JSON.parse(temp);
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-xl text-white font-semibold flex flex-col gap-4 items-center justify-center md:text-3xl">
        <p>Hello " {currentUser.fullName.toUpperCase()} "</p>
        <p>Choose a chat to satrt texting</p>
        <IoChatbubblesOutline className="text-5xl md:text-6xl text-center" />
      </div>
    </div>
  );
};

export default Welcome;
