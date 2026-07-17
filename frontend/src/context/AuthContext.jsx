import React, { createContext, useContext, useState, useEffect } from "react";
import { authApi } from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount - try to restore session from stored token
  useEffect(() => {
    const token = localStorage.getItem("qf_token");
    if (!token) {
      setLoading(false);
      return;
    }

    authApi
      .me()
      .then((r) => setUser(r.data))
      .catch(() => {
        localStorage.removeItem("qf_token");
        localStorage.removeItem("qf_refresh");
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (username, password) => {
    const r = await authApi.login(username, password);
    const { access_token, refresh_token, user: userData } = r.data;
    localStorage.setItem("qf_token", access_token);
    localStorage.setItem("qf_refresh", refresh_token);
    setUser(userData);
    return userData;
  };

  // Register a new account, then log straight in so the user lands on the
  // dashboard without a second form submission.
  const register = async (data) => {
    await authApi.register(data);
    return login(data.username, data.password);
  };

  const logout = () => {
    localStorage.removeItem("qf_token");
    localStorage.removeItem("qf_refresh");
    setUser(null);
  };

  // Merge freshly-saved fields (e.g. from the Profile page) into local state
  // without a full re-fetch.
  const updateUser = (patch) => setUser((u) => (u ? { ...u, ...patch } : u));

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
