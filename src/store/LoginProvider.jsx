import React, { createContext, useState } from "react";

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [loginStatus, setLoginStatus] = useState({
    user_Id: "",
    user_Name: "",
    logon: false,
    admin: false,
  });

  const value = {
    loginStatus,
    setLoginStatus,
  };

  return (
    <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
  );
};

export default LoginContext;
