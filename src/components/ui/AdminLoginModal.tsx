import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../../hooks/useAdminAuth';
import './ui.css';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login, isLockedOut, lockoutTimeRemaining, attemptsRemaining } = useAdminAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
      setPassword('');
      setError('');
    }
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLockedOut || isLoading) return;

    setIsLoading(true);
    const success = await login(password);
    setIsLoading(false);

    if (success) {
      onClose();
      navigate('/admin');
    } else {
      setError(`Invalid password. ${attemptsRemaining > 0 ? `${attemptsRemaining} attempts remaining.` : ''}`);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      setPassword('');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="admin-modal-overlay"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="admin-modal-card"
            onClick={e => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              x: isShaking ? [-10, 10, -10, 10, 0] : 0,
            }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <button className="admin-modal__close" onClick={onClose} aria-label="Close">
              <X size={20} />
            </button>

            <div className="admin-modal__icon">
              <Lock size={28} />
            </div>
            <h2 className="admin-modal__title">Admin Access</h2>
            <p className="admin-modal__subtitle">Enter your password to continue</p>

            <form onSubmit={handleSubmit}>
              {isLockedOut ? (
                <div className="admin-modal__lockout">
                  <p>Too many failed attempts.</p>
                  <p>Try again in <strong>{lockoutTimeRemaining}s</strong></p>
                </div>
              ) : (
                <>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    className="admin-modal__input"
                    autoFocus
                    disabled={isLoading}
                  />
                  {error && <div className="admin-modal__error">{error}</div>}
                  <button
                    type="submit"
                    className="admin-modal__btn"
                    disabled={isLoading || !password}
                  >
                    {isLoading ? 'Verifying...' : 'Login'}
                  </button>
                </>
              )}
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
