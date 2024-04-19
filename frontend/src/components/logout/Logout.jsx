import React from "react";
import { SlLogout } from "react-icons/sl";

const Logout = () => {
  return (
    <div>
      <button className="btn rounded flex items-center text-2xl pr-6 bg-red-600">
        <SlLogout />
      </button>
    </div>
  );
};

export default Logout;
