import React, { Suspense, useEffect, useState, Component, type ErrorInfo } from 'react';
import './ui.css';

const Spline = React.lazy(() => import('@splinetool/react-spline'));

interface ErrorBoundaryProps {
  fallback: React.ReactNode;
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class SplineErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('Spline 3D Scene load fallback caught error:', error.message, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

interface SplineSceneProps {
  sceneUrl: string;
  className?: string;
  fallback?: React.ReactNode;
}

export const SplineScene: React.FC<SplineSceneProps> = ({ sceneUrl, className = '', fallback }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile || hasError || !sceneUrl) {
    return <div className={`spline-wrapper ${className}`}>{fallback}</div>;
  }

  return (
    <div className={`spline-wrapper ${className}`} style={{ width: '100%', height: '100%', position: 'relative' }}>
      <SplineErrorBoundary fallback={<div className="spline-wrapper">{fallback}</div>}>
        <Suspense fallback={<div className="spline-skeleton" />}>
          <Spline 
            scene={sceneUrl} 
            onError={() => setHasError(true)}
          />
        </Suspense>
      </SplineErrorBoundary>
    </div>
  );
};