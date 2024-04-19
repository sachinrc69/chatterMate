import { createContext, useState } from "react";

export const CurrentGroup = createContext();

export const CurrentGroupProvider = ({ children }) => {
  const [group, setGroup] = useState(null);

  return (
    <CurrentGroup.Provider value={{ group, setGroup }}>
      {children}
    </CurrentGroup.Provider>
  );
};
