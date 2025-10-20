"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  JSX,
} from "react";
import { AccountDataProps } from "@/lib/api/account";

/**
 * Пользовательская модель (явно описана).
 * Можно расширить при необходимости.
 */
export interface User {
  _id: string;
  userId: string;
  email: string;
  name?: string;
  phone?: string;
  region?: string;
  // дополнительные поля опционально
}

/**
 * Тип контекста аутентификации
 */
export interface AuthContextType {
  user: AccountDataProps | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (userData: User, token: string) => void;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

/**
 * Props провайдера
 */
export interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Провайдер контекста аутентификации
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
}): JSX.Element => {
  const [user, setUser] = useState<AccountDataProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const isAuthenticated: boolean = !!user;

  const login = (userData: User, token: string): void => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("auth_token", token);
      }
      setUser(userData);
    } catch (e) {
      // noop
    }
  };

  const logout = async (): Promise<void> => {
    try {
      // Попытка сообщить серверу о выходе (если есть эндпоинт)
      await fetch("/api/logout", { method: "POST", credentials: "include" });
    } catch (e) {
      // Игнорировать ошибки при logout запросе
    } finally {
      try {
        if (typeof window !== "undefined") {
          localStorage.removeItem("auth_token");
          // опционально очистить cookie: set cookie expiration via server or client if needed
        }
      } catch (e) {
        // noop
      }
      setUser(null);
    }
  };

  /**
   * Проверяет наличие токена в localStorage или cookie и валидацию на API.
   * Всегда устанавливает loading.
   */
  const checkAuth = async (): Promise<void> => {
    setLoading(true);
    try {
      const data = await fetch("/api/dashboard/account", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        cache: "no-store",
      }).then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch account data");
        }
        return res.json();
      });

      if (data && data.account) {
        // Преобразовать ответ под интерфейс User, если необходимо
        const account = data.account as AccountDataProps;
        setUser(account);
      } else {
        setUser(null);
      }
    } catch (e) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Проверить аутентификацию при монтировании на клиенте
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, loading, login, logout, checkAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Хук для удобного использования контекста.
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
