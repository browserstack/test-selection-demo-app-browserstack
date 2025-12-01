import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { userProfiles } from '../data/userProfiles';

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
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
  }, [user]);

  const login = async (userId: string, email: string) => {
    // Use static user profile data
    const profile = userProfiles.find(
      p => String(p.userId) === String(userId) && p.email === email
    );
    if (profile) {
      setUser({
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
      });
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
};
