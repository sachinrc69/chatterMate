// import React, { useState } from "react";
// import { CurrentChat } from "../contexts/currentChat";

// const useGetChatingWithDetails = () => {
//   const { chatingWith } = useContext(CurrentChat);
//   console.log(chatingWith);
//   const [user, setUser] = useState(null);
//   const authToken = localStorage.getItem("authToken");
//   const getChattingWithDetails = async () => {
//     const res = await fetch(`http://localhost:5000/api/users/${chatingWith}`, {
//       headers: { Authorization: authToken },
//     });
//     const resData = await res.json();
//     setUser(resData);
//     if (res.ok) {
//     }
//   };
//   getChattingWithDetails();
//   return { user };
// };

// export default useGetChatingWithDetails;
