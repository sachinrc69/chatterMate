import React, { createContext, useState } from "react";

export const OtherUesrsContext = createContext();

export const OtherUesrsContextProvider = ({ children }) => {
  const [otherUsers, setOtherUsers] = useState([]);
  const [loading, setLoading] = useState([]);
  return (
    <OtherUesrsContext.Provider
      value={{ otherUsers, setOtherUsers, loading, setLoading }}
    >
      {children}
    </OtherUesrsContext.Provider>
  );
};
