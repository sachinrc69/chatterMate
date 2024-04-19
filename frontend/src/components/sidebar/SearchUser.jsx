import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useSearchUser from "../../hooks/useSearchUser";
import { OtherUesrsContext } from "../../contexts/otherUesrsContext";
import { useContext } from "react";
import useGetUsers from "../../hooks/useGetUsers";
const SearchUser = () => {
  const { getUsers } = useGetUsers();

  const { searchUser } = useSearchUser();
  const { otherUsers, setOtherUsers } = useContext(OtherUesrsContext);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (search.length > 3) {
      searchUser(search);
    } else if (search.length <= 3) {
      getUsers();
    }
  }, [search]);

  return (
    <form className="flex items-center gap-2 p-3">
      <input
        type="text"
        placeholder="Search..."
        className="input input-bordered w-full max-w-xs"
        onChange={(e) => setSearch(e.target.value)}
      />
      <button className="btn btn-circle bg-sky-500 text-white text-2xl">
        <IoSearchSharp />
      </button>
    </form>
  );
};

export default SearchUser;
