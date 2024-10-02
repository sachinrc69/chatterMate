import React, { useState, useContext } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/userContext";
import { url } from "../backendUrl";

const useSignup = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const signup = async ({
    username,
    fullName,
    password,
    confirmPassword,
    gender,
  }) => {
    const valid = handleInputValidation({
      username,
      fullName,
      password,
      confirmPassword,
      gender,
    });
    if (!valid) return;
    try {
      setLoading(true);
      const response = await fetch(`${url}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          fullName,
          password,
          confirmPassword,
          gender,
        }),
      });
      const resData = await response.json();
      if (!response.ok) {
        throw new Error(resData.message);
      } else {
        localStorage.setItem("authToken", resData.authToken);
        localStorage.setItem("user", JSON.stringify(resData.user));
        setUser(resData.user);
        navigate("/");
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

export default useSignup;

const handleInputValidation = ({
  username,
  fullName,
  password,
  confirmPassword,
  gender,
}) => {
  if (!username || !fullName || !password || !confirmPassword || !gender) {
    alert("Fill all the fields.");
    return false;
  } else if (password !== confirmPassword) {
    alert("Password don't match");
    return false;
  } else if (password.length < 6) {
    alert("Password must be atleast 6 char");
    return false;
  }
  return true;
};
