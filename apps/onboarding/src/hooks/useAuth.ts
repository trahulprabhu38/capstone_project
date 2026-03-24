"use client";

import { useState, useEffect, useCallback } from "react";
import { api } from "@/lib/api";
import {
  setTokens,
  clearTokens,
  setUser,
  getUser,
  isAuthenticated,
} from "@/lib/auth";
import type { User } from "@/types";

export function useAuth() {
  const [user, setUserState] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    if (!isAuthenticated()) {
      setLoading(false);
      return;
    }
    try {
      const { data } = await api.get("/auth/me");
      if (data.success) {
        setUserState(data.data);
        setUser(data.data);
      }
    } catch {
      clearTokens();
      setUserState(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const cached = getUser();
    if (cached) setUserState(cached);
    fetchUser();
  }, [fetchUser]);

  const login = async (email: string, password: string) => {
    const { data } = await api.post("/auth/login", { email, password });
    if (data.success) {
      setTokens(data.data.accessToken, data.data.refreshToken);
      setUser(data.data.user);
      setUserState(data.data.user);
    }
    return data;
  };

  const signup = async (
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    const { data } = await api.post("/auth/signup", {
      email,
      password,
      confirmPassword,
    });
    if (data.success) {
      setTokens(data.data.accessToken, data.data.refreshToken);
      setUser(data.data.user);
      setUserState(data.data.user);
    }
    return data;
  };

  const logout = () => {
    clearTokens();
    setUserState(null);
    window.location.href = "/login";
  };

  return { user, loading, login, signup, logout, isAuthenticated: !!user };
}
