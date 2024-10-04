import React from "react";
import { User } from "./User";
import useGetUsers from "../../hooks/useGetUsers";
import { useState } from "react";
import useSearchUser from "../../hooks/useSearchUser";
import { useEffect } from "react";
import { OtherUesrsContext } from "../../contexts/otherUesrsContext";
import { useContext } from "react";
import useGetGroups from "../../hooks/useGetGroups";
import Group from "./Group";

export const Users = () => {
  const { otherUsers, loading } = useContext(OtherUesrsContext);
  const { getUsers } = useGetUsers();
  const { getGroups, groups } = useGetGroups();

  useEffect(() => {
    const fetchUData = async () => {
      await getUsers();
      await getGroups();
    };
    fetchUData();
  }, []);

  return loading ? (
    <span className="loading loading-spinner mx-auto my-auto bg-white w-10 "></span>
  ) : (
    <div className="overflow-auto">
      <div className="flex flex-col overflow-auto py-2">
        {otherUsers.map((user) => {
          return <User key={user._id} user={user}></User>;
        })}
      </div>
      <div>
        {groups?.map((group) => {
          return <Group group={group} key={group._id}></Group>;
        })}
      </div>
    </div>
  );
};
