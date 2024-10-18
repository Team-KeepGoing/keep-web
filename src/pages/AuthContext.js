import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("token");
    const name = Cookies.get("name");
    const email = Cookies.get("email"); // 이메일 추가

    if (token) {
      setUser({ token, name, email }); // 이메일 포함
    }

    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    Cookies.set("token", userData.token, { expires: 7 });
    Cookies.set("name", userData.name);
    Cookies.set("email", userData.email); // 이메일 추가
  };

  const logout = () => {
    setUser(null);
    Cookies.remove("token");
    Cookies.remove("name");
    Cookies.remove("email"); // 이메일 제거
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
