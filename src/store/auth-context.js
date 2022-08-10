import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token, expirationTime) => {},
  logout: () => {},
});

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjustedExpirationTime = new Date(expirationTime).getTime();

  const remainingtime = adjustedExpirationTime - currentTime;

  return remainingtime;
};

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token;

  const logutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  const loginHandler = (token, expirationTime) => {
    setToken(token);
    localStorage.setItem("token", token);

    const remainingTime = calculateRemainingTime(expirationTime);
    setTimeout(logutHandler, remainingTime);
  };

  const tokenValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logutHandler,
  };

  return (
    <AuthContext.Provider value={tokenValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
