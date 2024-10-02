import React, { useState, useContext } from "react";
import { OtherUesrsContext } from "../contexts/otherUesrsContext";

const useSearchUser = () => {
  const authToken = localStorage.getItem("authToken");
  const { setOtherUsers, setLoading } = useContext(OtherUesrsContext);

  const searchUser = async (search) => {
    try {
      setLoading(true);
      const res = await fetch(`${url}/api/users/search/${search}`, {
        headers: { Authorization: "Bearer " + authToken },
      });
      const resData = await res.json();
      if (!res.ok) {
        throw new Error("failed to fetch ", 404);
      }
      setOtherUsers(resData);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { searchUser };
};

export default useSearchUser;
