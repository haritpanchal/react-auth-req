import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);

  const userIsLoggedIn = !!token;

  const loginHandler = (token) => {
    setToken(token);
  };

  const logutHandler = () => {
    setToken(null);
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
