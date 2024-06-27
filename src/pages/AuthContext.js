import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("token");
    const name = Cookies.get("name");

    if (token) {
      setUser({ token, name });
    }

    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    Cookies.set("token", userData.token, { expires: 7 });
    Cookies.set("name", userData.name);
  };

  const logout = () => {
    setUser(null);
    Cookies.remove("token");
    Cookies.remove("name");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
