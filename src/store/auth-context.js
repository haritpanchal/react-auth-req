import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token;

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };

  const logutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
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
