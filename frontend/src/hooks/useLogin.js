import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/userContext";

const useLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useContext(UserContext);

  const login = async ({ username, password }) => {
    const valid = inputValidator({ username, password });
    if (!valid) return;

    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const resData = await response.json();
      if (!response.ok) {
        alert(resData.message);
      } else {
        localStorage.setItem("authToken", resData.authToken);
        localStorage.setItem("user", JSON.stringify(resData.user));
        setUser(resData.user);
        navigate("/");
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  return { loading, login };
};

export default useLogin;

const inputValidator = ({ username, password }) => {
  if (!username || !password) {
    alert("Please fill all fields");
    return false;
  } else if (password.length < 6) {
    alert("Invalid password");
    return false;
  }

  return true;
};
