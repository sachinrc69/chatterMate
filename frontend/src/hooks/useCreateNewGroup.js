import React, { useRef, useState } from "react";
import { url } from "../backendUrl";

const useCreateNewGroup = () => {
  const authToken = localStorage.getItem("authToken");
  const [loading, setLoading] = useState(false);
  const groupName = useRef("");

  let usersToAddToGroup = useRef([]);

  const createGroup = async ({ setNewGroup }) => {
    try {
      setLoading(true);
      const res = await fetch(`${url}/api/group/newGroup`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + authToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          groupName: groupName.current,
          receiverId: usersToAddToGroup.current,
        }),
      });
      const resData = await res.json();

      if (!res.ok) {
        throw new Error(resData.message);
      } else {
        console.log(resData.conversation);
        setNewGroup(false);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { createGroup, groupName, usersToAddToGroup };
};

export default useCreateNewGroup;
