import React from "react";
import { useContext } from "react";
import useGetUsers from "../../hooks/useGetUsers";
import { OtherUesrsContext } from "../../contexts/otherUesrsContext";
import { User } from "./User";

const NewGroupUsers = ({ usersToAddToGroup }) => {
  const { otherUsers, loading } = useContext(OtherUesrsContext);
  const handleGroupAdd = (userId) => {
    if (usersToAddToGroup.current.includes(userId)) {
      const index = usersToAddToGroup.current.indexOf(userId);
      usersToAddToGroup.current.splice(index, 1);
    } else {
      usersToAddToGroup.current.push(userId);
    }
  };
  return loading ? (
    <span className="loading loading-spinner"> </span>
  ) : (
    <div>
      {otherUsers.map((user) => (
        <div className="flex flex-col overflow-auto py-2">
          {otherUsers.map((user) => {
            return (
              <div className="flex items-center justify-around">
                <User key={user._id} user={user} displayOnly={true}></User>
                <input
                  type="checkbox"
                  defaultChecked={usersToAddToGroup.current?.includes(user._id)}
                  className="checkbox border-white checked:border-indigo-800 [--chkbg:theme(colors.indigo.600)] [--chkfg:orange]"
                  onChange={(e) => {
                    handleGroupAdd(user._id);
                  }}
                />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default NewGroupUsers;
