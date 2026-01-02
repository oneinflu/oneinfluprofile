"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api } from "@/utils/api";

type User = { id: string; username: string; email: string; avatarUrl?: string };
type AuthContextType = {
  token: string | null;
  user: User | null;
  setToken: (t: string | null) => void;
  setUser: (u: User | null) => void;
  registerStart: (email: string) => Promise<string>;
  registerSaveUsername: (id: string, username: string) => Promise<void>;
  registerSendOtp: (id: string) => Promise<void>;
  registerVerifyOtp: (id: string, code: string) => Promise<void>;
  loginPassword: (identifier: string, password: string) => Promise<void>;
  loginSendOtp: (identifier: string) => Promise<void>;
  loginVerifyOtp: (identifier: string, code: string) => Promise<void>;
  updateUser: (username: string, data: Record<string, unknown>) => Promise<void>;
  uploadAvatar: (username: string, fileOrUrl: string | File) => Promise<string>;
  getMe: () => Promise<{ id: string; username: string; email: string; name?: string; shortBio?: string; avatarUrl?: string; category?: string; upi?: string }>;
  updateUserById: (id: string, data: Record<string, unknown>) => Promise<void>;
  uploadAvatarById: (id: string, fileOrUrl: string | File) => Promise<string>;
  createSocialLink: (username: string, platform: string, url: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

function setCookie(name: string, value: string, days = 7) {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${d.toUTCString()};path=/`;
}

function deleteCookie(name: string) {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setTokenState] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("influu_token");
      if (stored) {
        setTokenState(stored);
        return;
      }
      const ck = typeof document !== "undefined"
        ? (document.cookie.split("; ").find((r) => r.startsWith("influu_token="))?.split("=")[1] || null)
        : null;
      if (ck) setTokenState(ck);
    } catch {}
  }, []);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        if (!token) return;
        const me = await api.get<{ id: string; username: string; email: string; name?: string; shortBio?: string; avatarUrl?: string; category?: string; upi?: string }>(`/users/me`, { token });
        if (!alive) return;
        setUser({ id: me.id, username: me.username, email: me.email, avatarUrl: me.avatarUrl });
        try { localStorage.setItem("influu_user_id", me.id); } catch {}
      } catch {}
    })();
    return () => { alive = false; };
  }, [token]);

  const setToken = (t: string | null) => {
    setTokenState(t);
    if (t) {
      localStorage.setItem("influu_token", t);
      setCookie("influu_token", t);
    } else {
      localStorage.removeItem("influu_token");
      deleteCookie("influu_token");
    }
  };

  const ctx = useMemo<AuthContextType>(() => ({
    token,
    user,
    setToken,
    setUser: (u: User | null) => {
      setUser(u);
    },
    async registerStart(email: string) {
      const res = await api.post<{ success: boolean; data: { id: string } }>("/auth/register/start", { email });
      return res.data.id;
    },
    async registerSaveUsername(id: string, username: string) {
      await api.post("/auth/register/username/save", { id, username });
    },
    async registerSendOtp(id: string) {
      await api.post("/auth/register/otp/send", { id });
    },
    async registerVerifyOtp(id: string, code: string) {
      const res = await api.post<{ success: boolean; data: { token: string; user: User } }>(
        "/auth/register/otp/verify",
        { id, code },
      );
      setToken(res.data.token);
      setUser(res.data.user);
    },
    async loginPassword(identifier: string, password: string) {
      const res = await api.post<{ success: boolean; data: { token: string; user: User } }>("/auth/login", {
        identifier,
        password,
      });
      setToken(res.data.token);
      setUser(res.data.user);
    },
    async loginSendOtp(identifier: string) {
      await api.post("/auth/otp/send", { identifier });
    },
    async loginVerifyOtp(identifier: string, code: string) {
      const res = await api.post<{ success: boolean; data: { token: string; user: User } }>("/auth/otp/login", {
        identifier,
        code,
      });
      setToken(res.data.token);
      setUser(res.data.user);
    },
    async updateUser(username: string, data: Record<string, unknown>) {
      if (!token) throw new Error("unauthorized");
      await api.patch(`/users/${username}`, data, { token });
      if (typeof data.username === "string") {
        setUser((prev) => (prev ? { ...prev, username: String(data.username) } : prev));
      }
    },
    async getMe() {
      if (!token) throw new Error("unauthorized");
      const parts = token.split(".");
      if (parts.length !== 3) throw new Error("invalid_token");
      let b64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
      while (b64.length % 4) b64 += "=";
      const json = typeof window !== "undefined" ? window.atob(b64) : "";
      const payload = json ? JSON.parse(json) : {};
      const id = String(payload?.sub || "");
      if (!id) throw new Error("missing_user_id");
      const me = await api.get<{ id: string; username: string; email: string; name?: string; shortBio?: string; avatarUrl?: string; category?: string; upi?: string }>(`/users/id/${id}`, { token });
      return me;
    },
    async updateUserById(id: string, data: Record<string, unknown>) {
      if (!token) throw new Error("unauthorized");
      await api.patch(`/users/id/${id}`, data, { token });
      if (typeof data.username === "string") {
        setUser((prev) => (prev ? { ...prev, username: String(data.username) } : prev));
      }
    },
    async uploadAvatar(username: string, fileOrUrl: string | File) {
      if (!token) throw new Error("unauthorized");
      if (typeof fileOrUrl === "string") {
        const res = await api.post<{ avatarUrl: string }>(`/users/${username}/avatar`, { url: fileOrUrl }, { token });
        return res.avatarUrl;
      } else {
        const fd = new FormData();
        fd.append("avatar", fileOrUrl);
        const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${username}/avatar`;
        const res = await fetch(url, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: fd
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error((data as any)?.error || `HTTP ${res.status}`);
        return (data as any)?.avatarUrl as string;
      }
    },
    async uploadAvatarById(id: string, fileOrUrl: string | File) {
      if (!token) throw new Error("unauthorized");
      if (typeof fileOrUrl === "string") {
        const res = await api.post<{ avatarUrl: string }>(`/users/id/${id}/avatar`, { url: fileOrUrl }, { token });
        return res.avatarUrl;
      } else {
        const fd = new FormData();
        fd.append("avatar", fileOrUrl);
        const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/id/${id}/avatar`;
        const res = await fetch(url, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: fd
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error((data as any)?.error || `HTTP ${res.status}`);
        return (data as any)?.avatarUrl as string;
      }
    },
    async createSocialLink(username: string, platform: string, url: string) {
      if (!token) throw new Error("unauthorized");
      await api.post(`/users/${username}/social-links`, { platform, url }, { token });
    },
  }), [token, user]);

  return <AuthContext.Provider value={ctx}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const v = useContext(AuthContext);
  if (!v) throw new Error("AuthContext missing");
  return v;
}
