import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './SplashScreen.css';

interface SplashScreenProps {
  onComplete?: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsVisible(false);
            if (onComplete) onComplete();
          }, 250);
          return 100;
        }
        return prev + Math.floor(Math.random() * 20) + 15;
      });
    }, 90);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="sleek-splash-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="sleek-splash-content">
            {/* Minimalist Logo */}
            <motion.div
              className="sleek-splash-logo"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <span className="sleek-logo-text">IES</span>
              <span className="sleek-logo-dot">.</span>
            </motion.div>

            <motion.p
              className="sleek-splash-sub"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              ILHAM EKA SAPUTRA
            </motion.p>

            {/* Micro Sleek Line Loader */}
            <div className="sleek-loader-wrapper">
              <div className="sleek-loader-track">
                <motion.div
                  className="sleek-loader-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="sleek-loader-val">{progress}%</div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
