import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const authContext = createContext();

export function AuthProvider({ children }) {
  const [connected, setConnected] = useState(
    Boolean(localStorage.getItem("jwt"))
  );
  const navigate = useNavigate();

  // UseEffect permettant de garder l'user connecté en cas de rechargement de la page
  useEffect(() => {
    const isLogged = localStorage.getItem("jwt");
    if (isLogged) {
      setConnected(true);
    }
  }, []);

  const logIn = (token) => {
    localStorage.setItem("jwt", token);
    setConnected(true);
  };

  const logOut = () => {
    localStorage.removeItem("jwt");
    setConnected(false);
    navigate("/");
  };

  const auth = {
    connected,
    logIn,
    logOut,
  };

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default authContext;
