import React, { createContext, useCallback, useContext, useState } from 'react';
import { decode } from 'jsonwebtoken';

import api from '../services/api';

interface SignUpCredentials {
  email: string;
  password: string;
}

interface UserProps {
  user_id: string;
}

interface AuthContextData {
  token: string;
  user: UserProps;
  signIn(credentials: SignUpCredentials): Promise<void>;
  signOut(): void;
}

interface AuthState {
  token: string;
  user: UserProps;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@Marvel:token');
    const user = localStorage.getItem('@Marvel:user');

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', { email, password });

    const { token } = response.data;
    const user = decode(token) as UserProps;

    localStorage.setItem('@Marvel:token', token);
    localStorage.setItem('@Marvel:user', JSON.stringify(user));

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@Marvel:token');
    localStorage.removeItem('@Marvel:user');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{ token: data.token, user: data.user, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
