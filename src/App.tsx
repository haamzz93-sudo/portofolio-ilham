import { Suspense, lazy, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { AdminProvider } from './admin/AdminProvider';
import { fetchPortfolioData } from './data/portfolio';
import './App.css';

const AdminDashboard = lazy(() => import('./pages/AdminDashboard').then(m => ({ default: m.AdminDashboard })));

const App = () => {
  useEffect(() => {
    fetchPortfolioData();
  }, []);

  return (
    <div className="app">
      <Suspense fallback={
        <div className="loading-screen">
          <div className="loading-spinner" />
        </div>
      }>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/admin"
            element={
              <AdminProvider>
                <AdminDashboard />
              </AdminProvider>
            }
          />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
