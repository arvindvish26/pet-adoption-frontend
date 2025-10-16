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
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (userData: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
}

interface RegisterData {
  username?: string;
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
    const storedUser = localStorage.getItem('PetMate_user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setAuthState({ user, isLoading: false });
      } catch (error) {
        localStorage.removeItem('PetMate_user');
        setAuthState({ user: null, isLoading: false });
      }
    } else {
      setAuthState({ user: null, isLoading: false });
    }
  }, []);

  const login = async (username: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const data = await loginApi(username, password);
      // Save tokens
      localStorage.setItem('PetMate_token', data.access);
      localStorage.setItem('PetMate_refresh', data.refresh);
      localStorage.setItem('PetMate_user', JSON.stringify(data.user));
      setAuthState({ user: data.user, isLoading: false });
      return { success: true };
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.errors?.non_field_errors?.[0] ||
                          'Login failed. Please check your credentials.';
      return { success: false, error: errorMessage };
    }
  };

  const register = async (userData: RegisterData): Promise<{ success: boolean; error?: string }> => {
    try {
      const created = await registerApi(userData);
      // Auto-login after registration using provided username/password
      const loginResult = await login(userData.username || userData.email, userData.password);
      return loginResult;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.errors?.username?.[0] ||
                          error.response?.data?.errors?.email?.[0] ||
                          error.response?.data?.errors?.password?.[0] ||
                          'Registration failed. Please try again.';
      return { success: false, error: errorMessage };
    }
  };

  const logout = () => {
    setAuthState({ user: null, isLoading: false });
    localStorage.removeItem('PetMate_user');
    localStorage.removeItem('PetMate_token');
    localStorage.removeItem('PetMate_refresh');
    
    // Clear cart data on logout
    window.dispatchEvent(new CustomEvent('userLoggedOut'));
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