import { useState, useEffect, useCallback } from 'react';
import { ADMIN_CONFIG } from '../utils/constants';

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export const useAdminAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('admin_session') === 'authenticated';
  });
  const [attempts, setAttempts] = useState(0);
  const [lockoutUntil, setLockoutUntil] = useState<number | null>(null);
  const [lockoutTimeRemaining, setLockoutTimeRemaining] = useState(0);

  useEffect(() => {
    if (!lockoutUntil) return;
    const interval = setInterval(() => {
      const remaining = Math.ceil((lockoutUntil - Date.now()) / 1000);
      if (remaining <= 0) {
        setLockoutUntil(null);
        setAttempts(0);
        setLockoutTimeRemaining(0);
        clearInterval(interval);
      } else {
        setLockoutTimeRemaining(remaining);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [lockoutUntil]);

  const login = useCallback(async (password: string): Promise<boolean> => {
    if (lockoutUntil && Date.now() < lockoutUntil) return false;

    const hash = await hashPassword(password);
    const storedHash = import.meta.env.VITE_ADMIN_PASSWORD_HASH || 
      '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8'; // default: 'password'

    if (hash === storedHash) {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_session', 'authenticated');
      setAttempts(0);
      return true;
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      if (newAttempts >= ADMIN_CONFIG.maxAttempts) {
        setLockoutUntil(Date.now() + ADMIN_CONFIG.lockoutDuration);
        setLockoutTimeRemaining(Math.ceil(ADMIN_CONFIG.lockoutDuration / 1000));
      }
      return false;
    }
  }, [attempts, lockoutUntil]);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_session');
  }, []);

  return {
    isAuthenticated,
    login,
    logout,
    isLockedOut: !!lockoutUntil && Date.now() < lockoutUntil,
    lockoutTimeRemaining,
    attemptsRemaining: ADMIN_CONFIG.maxAttempts - attempts,
  };
};