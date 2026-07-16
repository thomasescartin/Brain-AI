import { createContext, useContext, useEffect, useState } from "react";

import * as AuthService from "../service/auth.service";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);

        return;
      }

      try {
        const utilisateur = await AuthService.me();

        setUser(utilisateur);
      } catch {
        localStorage.removeItem("token");
      }

      setLoading(false);
    }

    loadUser();
  }, []);

  async function login(email, mot_de_passe) {
    const data = await AuthService.login(email, mot_de_passe);

    localStorage.setItem("token", data.token);

    const utilisateur = await AuthService.me();

    setUser(utilisateur);
  }

  function logout() {
    localStorage.removeItem("token");

    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
