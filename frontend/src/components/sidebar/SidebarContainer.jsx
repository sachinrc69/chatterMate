import React from "react";
import SearchUser from "./SearchUser";
import { Users } from "./Users";
import CurrentUserHeader from "./CurrentUserHeader";
import { useState } from "react";
import NewGroup from "./NewGroup";
import { useContext } from "react";
import { CurrentChat } from "../../contexts/currentChat";

function SidebarContainer() {
  const [newGroup, setNewGroup] = useState(false);
  const { chatingWith } = useContext(CurrentChat);

  return (
    <div
      className={`border-r border-black  md:flex md:flex-col p-0 md:w-5/12 w-full h-screen 
      ${chatingWith && " hidden"}
      ${!chatingWith && " md:block"}`}
    >
      <CurrentUserHeader setNewGroup={setNewGroup} newGroup={newGroup} />
      <SearchUser />
      <div className="divider p-0 m-0"></div>
      {newGroup ? (
        <NewGroup setNewGroup={setNewGroup} newGroup={newGroup} />
      ) : (
        <Users />
      )}
    </div>
  );
}

export default SidebarContainer;
