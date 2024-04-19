import React from "react";
import SearchUser from "./SearchUser";
import { Users } from "./Users";
import CurrentUserHeader from "./CurrentUserHeader";
import { useState } from "react";
import NewGroup from "./NewGroup";

function SidebarContainer() {
  const [newGroup, setNewGroup] = useState(false);

  return (
    <div className="border-r border-black flex flex-col p-0 w-5/12 h-screen ">
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
