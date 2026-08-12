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
    // Fast smooth progress fill
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsVisible(false);
            if (onComplete) onComplete();
          }, 300);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 10;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="splash-screen"
          initial={{ opacity: 1 }}
          exit={{ y: '-100%', opacity: 0.9 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Ambient Lighting */}
          <div className="splash-ambient-glow" />

          <div className="splash-content">
            {/* Logo Brand */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="splash-logo"
            >
              <span className="splash-logo-text">IES.</span>
              <span className="splash-logo-dot" />
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="splash-subtitle"
            >
              ILHAM EKA SAPUTRA • PORTFOLIO
            </motion.p>

            {/* Progress Bar */}
            <div className="splash-progress-wrapper">
              <div className="splash-progress-track">
                <motion.div
                  className="splash-progress-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="splash-progress-text">{progress}%</div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
