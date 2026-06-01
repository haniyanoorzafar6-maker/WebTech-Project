import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { authApi } from "@/services/api";
import type { User } from "@/types";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (payload: { fullName: string; email: string; password: string; phone?: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("brewpoint_token");
    if (!token) {
      setLoading(false);
      return;
    }
    authApi.me().then(setUser).catch(() => localStorage.removeItem("brewpoint_token")).finally(() => setLoading(false));
  }, []);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    loading,
    login: async (email, password) => {
      const result = await authApi.login(email, password);
      localStorage.setItem("brewpoint_token", result.token);
      setUser(result.user);
    },
    signup: async (payload) => {
      const result = await authApi.signup(payload);
      localStorage.setItem("brewpoint_token", result.token);
      setUser(result.user);
    },
    logout: () => {
      localStorage.removeItem("brewpoint_token");
      setUser(null);
    }
  }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
