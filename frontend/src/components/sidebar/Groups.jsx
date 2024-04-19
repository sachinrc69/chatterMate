import React from "react";
import useGetGroups from "../../hooks/useGetGroups";
const Groups = () => {
  const { groups, loading } = useGetGroups();
  console.log(groups);
  return <div>Groups</div>;
};

export default Groups;
