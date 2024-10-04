import React, { useEffect, useState, useContext } from "react";
import { OtherUesrsContext } from "../contexts/otherUesrsContext";
import { url } from "../backendUrl";

const useGetUsers = () => {
  const { otherUsers, setOtherUsers, setLoading } =
    useContext(OtherUesrsContext);

  const authToken = localStorage.getItem("authToken");

  const getUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${url}/api/users`, {
        headers: { Authorization: "Bearer " + authToken },
      });
      const resData = await res.json();
      if (!res.ok) {
        throw new Error(resData.message);
      } else {
        if (JSON.stringify(otherUsers) !== JSON.stringify(resData)) {
          setOtherUsers(resData);
        }
      }
    } catch (error) {
      alert(error.message + " USERS DATA");
    } finally {
      setLoading(false);
    }
  };

  return { getUsers };
};

export default useGetUsers;
