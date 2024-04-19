import React, { useContext } from "react";
import Logout from "../logout/Logout";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/userContext";
import { useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { CurrentChat } from "../../contexts/currentChat";

const CurrentUserHeader = ({ setNewGroup, newGroup }) => {
  const { chatingWith, setChattingWith, setChatType } = useContext(CurrentChat);
  const { setUser, user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/auth/logout");
      const resData = await response.json();
      if (!response.ok) {
        console.log(resData);
        throw new Error(resData.message);
      }
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      setUser(null);
      navigate("/login");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">{user.username}</a>
      </div>

      <div
        className="tooltip tooltip-bottom mr-3"
        data-tip="New group"
        onClick={(prev) => {
          setChattingWith(null);
          setChatType(null);
          setNewGroup(!newGroup);
        }}
      >
        <button className="btn text-3xl">
          <FiPlusCircle />
        </button>
      </div>

      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img alt="Tailwind CSS Navbar component" src={user.profilePic} />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            {/* <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li> */}
            <li>
              {!loading ? (
                <a className="text-red-500" onClick={logoutHandler}>
                  {" "}
                  Logout
                </a>
              ) : (
                <span className="loading loading-spinner"></span>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CurrentUserHeader;
