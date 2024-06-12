import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("TOKEN");
    const name = localStorage.getItem("name");
    if (token && name) {
      setUser({ name, token });
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("TOKEN", userData.token);
    localStorage.setItem("name", userData.name);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("TOKEN");
    localStorage.removeItem("name");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
