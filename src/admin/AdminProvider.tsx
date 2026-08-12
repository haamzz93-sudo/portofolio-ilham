import React, { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { useAdminAuth } from '../hooks/useAdminAuth';

interface AdminContextType {
  isAuthenticated: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
  isLockedOut: boolean;
  lockoutTimeRemaining: number;
  attemptsRemaining: number;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const auth = useAdminAuth();

  return (
    <AdminContext.Provider value={auth}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
