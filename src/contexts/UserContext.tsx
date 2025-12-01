import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { userProfiles } from '../data/userProfiles';
import { sanitizeAvatarUrl } from '../lib/avatar';

export interface User {
  id: number;
  email: string;
  username: string;
  name: string;
  avatar: string;
  phone?: string;
  address?: string;
  birthdate?: string;
  gender?: string;
  company?: string;
  website?: string;
}

interface UserContextType {
  user: User | null;
  login: (userId: string, email: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const sanitizeUser = (value: User): User => ({
  ...value,
  avatar: sanitizeAvatarUrl(value.avatar),
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (!stored) return;
    try {
      const parsed = JSON.parse(stored);
      setUser(sanitizeUser(parsed));
    } catch {
      localStorage.removeItem('user');
    }
  }, []);

  useEffect(() => {
    // NOTE: This sandbox only stores mock profiles used for demos; no real PII is persisted.
    if (user) {
      const safeUser = sanitizeUser(user);
      localStorage.setItem('user', JSON.stringify(safeUser));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = async (userId: string, email: string) => {
    // Use static user profile data
    const profile = userProfiles.find(
      p => String(p.userId) === String(userId) && p.email === email
    );
    if (profile) {
      setUser(sanitizeUser({
        id: profile.userId,
        email: profile.email,
        username: profile.email.split('@')[0],
        name: profile.name,
        avatar: profile.avatar,
        phone: '+1-555-0100',
        address: '123 Demo St, Faketown',
        birthdate: '1990-01-01',
        gender: 'other',
        company: 'Demo Inc.',
        website: 'https://example.com'
      }));
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  const updateUser = (updates: Partial<User>) => {
    setUser(prev => (prev ? sanitizeUser({ ...prev, ...updates }) : prev));
  };

  return (
    <UserContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
};
