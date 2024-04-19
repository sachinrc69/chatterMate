import React, { useState } from "react";
import { useRef } from "react";
import NewGroupUsers from "./NewGroupUsers";
import useCreateNewGroup from "../../hooks/useCreateNewGroup";

const NewGroup = ({ setNewGroup, newGroup }) => {
  const { createGroup, groupName, usersToAddToGroup } = useCreateNewGroup();

  const createGroupHandler = () => {
    if (usersToAddToGroup.current.length === 0 || groupName.length === 0)
      alert("Fill all fields");
    else {
      createGroup({ setNewGroup });
    }
  };

  return (
    <div>
      <div className="w-full px-2 flex gap-2 items-center">
        <input
          type="text"
          placeholder="Group Name"
          className="input input-bordered input-primary w-full "
          onChange={(e) => {
            groupName.current = e.target.value;
          }}
        />
        <div
          className="w-full flex items-center justify-center my-3"
          onClick={createGroupHandler}
        >
          <button className="btn btn-primary">Create Group</button>
        </div>
      </div>

      <NewGroupUsers usersToAddToGroup={usersToAddToGroup} />
    </div>
  );
};

export default NewGroup;
