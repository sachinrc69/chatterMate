import React, { useState } from "react";
import { url } from "../backendUrl";

const useGetGroups = () => {
  const authToken = localStorage.getItem("authToken");
  const [loading, setLoading] = useState(false);
  const [groups, setGroups] = useState(null);
  const getGroups = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${url}/api/group/allGroups`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + authToken,
        },
      });
      const resData = await res.json();
      if (!res.ok) {
        console.log(resData);
        throw new Error(resData.message);
      } else {
        setGroups(resData);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { getGroups, loading, groups };
};

export default useGetGroups;
