import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Lock, CheckCircle2 } from 'lucide-react';
import './SplashScreen.css';

interface SplashScreenProps {
  onComplete?: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [stepStatus, setStepStatus] = useState<string>('Verifying Browser Security Protocol...');
  const [progress, setProgress] = useState(15);
  const [isVerified, setIsVerified] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Step 1: Initialize
    const t1 = setTimeout(() => {
      setProgress(45);
      setStepStatus('Scanning Client Browser Integrity...');
    }, 400);

    // Step 2: Validate Encryption
    const t2 = setTimeout(() => {
      setProgress(85);
      setStepStatus('Validating Encrypted Connection...');
    }, 900);

    // Step 3: Verified Success
    const t3 = setTimeout(() => {
      setProgress(100);
      setIsVerified(true);
      setStepStatus('✅ Access Granted — Verified Secure Browser');
    }, 1400);

    // Step 4: Hide Splash & Reveal Site
    const t4 = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, 1900);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="cyber-security-splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* Ambient Security Aura */}
          <div className="cyber-ambient-glow" />

          <div className="cyber-security-card">
            {/* Spinning Shield Scanning Indicator */}
            <div className="cyber-shield-wrapper">
              <motion.div
                className="cyber-spinner-ring"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="cyber-spinner-ring-inner"
                animate={{ rotate: -360 }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
              />
              <div className="cyber-shield-icon-box">
                {isVerified ? (
                  <CheckCircle2 size={36} color="#10B981" />
                ) : (
                  <ShieldCheck size={36} color="#4DA8DA" />
                )}
              </div>
            </div>

            {/* Verification Heading */}
            <div className="cyber-security-heading">
              <h2>IES SECURITY VERIFICATION</h2>
              <span className="cyber-badge-pulse">
                <Lock size={12} /> Cloudflare & TLS Shielded
              </span>
            </div>

            {/* Status Message */}
            <p className="cyber-security-status">{stepStatus}</p>

            {/* Progress Bar */}
            <div className="cyber-progress-container">
              <div className="cyber-progress-track">
                <motion.div
                  className="cyber-progress-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="cyber-progress-footer">
                <span>{progress}% Verified</span>
                <span>Automated Anti-Bot Check</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
