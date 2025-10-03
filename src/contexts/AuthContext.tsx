import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { loginApi, registerApi } from '@/lib/api';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  adoptionRequests?: string[];
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
  password_confirm: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

// Removed mock users; using backend now

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
  });

  // Load user from localStorage on app start
  useEffect(() => {
    const storedUser = localStorage.getItem('pawheart_user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setAuthState({ user, isLoading: false });
      } catch (error) {
        localStorage.removeItem('pawheart_user');
        setAuthState({ user: null, isLoading: false });
      }
    } else {
      setAuthState({ user: null, isLoading: false });
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const data = await loginApi(username, password);
      // Save tokens
      localStorage.setItem('pawheart_token', data.access);
      localStorage.setItem('pawheart_refresh', data.refresh);
      localStorage.setItem('pawheart_user', JSON.stringify(data.user));
      setAuthState({ user: data.user, isLoading: false });
      return true;
    } catch (e) {
      return false;
    }
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    try {
      const created = await registerApi(userData);
      // Auto-login after registration using provided username/password
      const loggedIn = await login(userData.username, userData.password);
      return !!loggedIn;
    } catch (e) {
      return false;
    }
  };

  const logout = () => {
    setAuthState({ user: null, isLoading: false });
    localStorage.removeItem('pawheart_user');
    localStorage.removeItem('pawheart_token');
    localStorage.removeItem('pawheart_refresh');
  };

  const value: AuthContextType = {
    user: authState.user,
    isLoading: authState.isLoading,
    login,
    register,
    logout,
    isAuthenticated: !!authState.user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};