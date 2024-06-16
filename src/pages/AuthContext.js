import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 쿠키에서 토큰을 읽어옴
    const token = Cookies.get("token");
    const name = Cookies.get("name");

    if (token) {
      setUser({ token, name });
    }

    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    // 쿠키에 토큰과 이름을 저장
    Cookies.set("token", userData.token, { expires: 7 }); // expires는 쿠키의 만료 기간을 설정합니다 (옵션)
    Cookies.set("name", userData.name); // 기본적으로 세션이 끝날 때 쿠키가 삭제됩니다
  };

  const logout = () => {
    setUser(null);
    // 쿠키에서 토큰과 이름을 제거
    Cookies.remove("token");
    Cookies.remove("name");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
