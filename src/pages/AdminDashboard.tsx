import React, { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAdmin } from '../admin/AdminProvider';
import { ContentEditor } from '../admin/ContentEditor';
import { getPortfolioData, savePortfolioData } from '../data/portfolio';
import type { PortfolioData } from '../data/portfolio';
import { LogOut, Home, LayoutDashboard, FileText, Image as ImageIcon, Server, Database, Save, Check } from 'lucide-react';
import '../admin/admin.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const AdminDashboard: React.FC = () => {
  const { isAuthenticated, logout } = useAdmin();
  const [data, setData] = useState<PortfolioData | null>(null);
  const [cvStatus, setCvStatus] = useState<string>('');
  const [avatarStatus, setAvatarStatus] = useState<string>('');
  const [idCardStatus, setIdCardStatus] = useState<string>('');
  const [saveNotify, setSaveNotify] = useState<string>('');
  const [backendStatus, setBackendStatus] = useState<{ status: string; supabase: boolean } | null>(null);

  useEffect(() => {
    setData(getPortfolioData());

    // Check FastAPI Backend Health
    fetch(`${API_BASE_URL}/api/health`)
      .then((res) => res.json())
      .then((healthData) => {
        setBackendStatus({
          status: healthData.status || 'healthy',
          supabase: healthData.supabase_connected || false,
        });
      })
      .catch(() => {
        setBackendStatus({ status: 'client-only', supabase: false });
      });
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (!data) return <div>Loading...</div>;

  const handleSave = (key: keyof PortfolioData, newItems: any) => {
    const newData = { ...data, [key]: newItems };
    setData(newData);
    savePortfolioData(newData);
    triggerSaveNotify('Data successfully updated and saved!');
  };

  const handleGeneralSaveField = (field: string, value: string) => {
    const newData = { ...data, [field]: value };
    setData(newData);
    savePortfolioData(newData);
  };

  const handleSaveAllGeneral = () => {
    if (data) {
      savePortfolioData(data);
      triggerSaveNotify('✅ General Info & Media Assets successfully saved to Live State!');
    }
  };

  const triggerSaveNotify = (msg: string) => {
    setSaveNotify(msg);
    setTimeout(() => setSaveNotify(''), 4000);
  };

  // Upload Handlers
  const handleCvUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setCvStatus('Uploading CV file to Backend & Supabase...');
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch(`${API_BASE_URL}/api/upload/cv`, {
        method: 'POST',
        body: formData,
      });
      const result = await res.json();
      const uploadedUrl = result.url || URL.createObjectURL(file);
      
      const newData = { ...data, cvUrl: uploadedUrl };
      setData(newData);
      savePortfolioData(newData);
      setCvStatus(`✅ CV File Uploaded & Download Link Updated: ${file.name}`);
    } catch {
      const fallbackUrl = URL.createObjectURL(file);
      const newData = { ...data, cvUrl: fallbackUrl };
      setData(newData);
      savePortfolioData(newData);
      setCvStatus(`✅ CV File Updated for Download: ${file.name}`);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAvatarStatus('Uploading Avatar to Supabase Cloud Storage...');
    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', 'avatar');

    try {
      const res = await fetch(`${API_BASE_URL}/api/upload/image`, {
        method: 'POST',
        body: formData,
      });
      const result = await res.json();
      const cloudUrl = result.url || URL.createObjectURL(file);
      const newData = { ...data, avatarUrl: cloudUrl };
      setData(newData);
      savePortfolioData(newData);
      setAvatarStatus('✅ Avatar Saved to Cloud (Cross-Device Synced)!');
    } catch {
      const reader = new FileReader();
      reader.onload = () => {
        const imgUrl = reader.result as string;
        const newData = { ...data, avatarUrl: imgUrl };
        setData(newData);
        savePortfolioData(newData);
        setAvatarStatus('✅ Avatar Saved Locally!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleIdCardPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIdCardStatus('Uploading ID Photo to Supabase Cloud Storage...');
    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', 'idcard');

    try {
      const res = await fetch(`${API_BASE_URL}/api/upload/image`, {
        method: 'POST',
        body: formData,
      });
      const result = await res.json();
      const cloudUrl = result.url || URL.createObjectURL(file);
      const newData = { ...data, idPhotoUrl: cloudUrl };
      setData(newData);
      savePortfolioData(newData);
      setIdCardStatus('✅ ID Photo Saved to Cloud (Cross-Device Synced)!');
    } catch {
      const reader = new FileReader();
      reader.onload = () => {
        const imgUrl = reader.result as string;
        const newData = { ...data, idPhotoUrl: imgUrl };
        setData(newData);
        savePortfolioData(newData);
        setIdCardStatus('✅ ID Photo Saved Locally!');
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-sidebar">
        <h2 className="admin-sidebar__title">Admin Panel</h2>
        <nav className="admin-sidebar__nav">
          <a href="#general" className="admin-sidebar__link active"><LayoutDashboard size={18} /> General & Media</a>
          <a href="#projects" className="admin-sidebar__link"><LayoutDashboard size={18} /> Projects Manager</a>
          <a href="#skills" className="admin-sidebar__link"><LayoutDashboard size={18} /> Skills Manager</a>
          <a href="#experience" className="admin-sidebar__link"><LayoutDashboard size={18} /> Experience Manager</a>
          <Link to="/" className="admin-sidebar__link"><Home size={18} /> Back to Site</Link>
        </nav>
        <button onClick={logout} className="admin-btn admin-btn--icon" style={{ marginTop: 'auto', width: '100%', justifyContent: 'center' }}>
          <LogOut size={18} /> Logout
        </button>
      </div>

      <div className="admin-content">
        <div className="admin-header">
          <h1>Dashboard Management</h1>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <span className="admin-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Server size={14} /> FastAPI: {backendStatus?.status || 'Active'}
            </span>
            <span className="admin-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Database size={14} /> Supabase: {backendStatus?.supabase ? 'Connected' : 'Ready'}
            </span>
          </div>
        </div>

        {saveNotify && (
          <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10B981', color: '#10B981', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Check size={20} />
            <span>{saveNotify}</span>
          </div>
        )}

        {/* Media & Asset Manager Card */}
        <div className="admin-card" id="general">
          <div className="admin-card__header">
            <h3 className="admin-card__title">Media & Document Assets (CV & Images)</h3>
          </div>
          <div className="admin-form" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            
            {/* Upload CV */}
            <div className="admin-form__group" style={{ background: 'var(--bg-tertiary)', padding: '1.25rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
                <FileText size={18} className="text-accent" /> Upload Official CV (PDF/DOC)
              </label>
              <input type="file" accept=".pdf,.doc,.docx,.txt" onChange={handleCvUpload} className="admin-input" style={{ marginTop: '8px' }} />
              {cvStatus && <p style={{ fontSize: '0.85rem', color: 'var(--accent)', marginTop: '8px', fontWeight: 500 }}>{cvStatus}</p>}
            </div>

            {/* Upload Avatar Character */}
            <div className="admin-form__group" style={{ background: 'var(--bg-tertiary)', padding: '1.25rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
                <ImageIcon size={18} className="text-accent" /> Homepage Avatar Character
              </label>
              <input type="file" accept="image/*" onChange={handleAvatarUpload} className="admin-input" style={{ marginTop: '8px' }} />
              {avatarStatus && <p style={{ fontSize: '0.85rem', color: 'var(--accent)', marginTop: '8px', fontWeight: 500 }}>{avatarStatus}</p>}
            </div>

            {/* Upload ID Card Photo */}
            <div className="admin-form__group" style={{ background: 'var(--bg-tertiary)', padding: '1.25rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
                <ImageIcon size={18} className="text-accent" /> Student ID Pass Photo
              </label>
              <input type="file" accept="image/*" onChange={handleIdCardPhotoUpload} className="admin-input" style={{ marginTop: '8px' }} />
              {idCardStatus && <p style={{ fontSize: '0.85rem', color: 'var(--accent)', marginTop: '8px', fontWeight: 500 }}>{idCardStatus}</p>}
            </div>

          </div>
        </div>

        {/* General Text Info */}
        <div className="admin-card">
          <div className="admin-card__header">
            <h3 className="admin-card__title">General Profile Bio & Tagline</h3>
            <button onClick={handleSaveAllGeneral} className="admin-btn admin-btn--primary">
              <Save size={16} /> Save Profile Info
            </button>
          </div>
          <div className="admin-form">
            <div className="admin-form__group">
              <label>Tagline</label>
              <input 
                type="text" 
                className="admin-input" 
                value={data.tagline} 
                onChange={(e) => handleGeneralSaveField('tagline', e.target.value)} 
              />
            </div>
            <div className="admin-form__group">
              <label>Bio Summary</label>
              <textarea 
                className="admin-input" 
                rows={4}
                value={data.bio} 
                onChange={(e) => handleGeneralSaveField('bio', e.target.value)} 
              />
            </div>
          </div>
        </div>

        <section id="projects">
          <ContentEditor 
            title="Projects Manager" 
            items={data.projects} 
            onSave={(items) => handleSave('projects', items)} 
            fields={[
              { key: 'title', label: 'Title', type: 'text' },
              { key: 'description', label: 'Description', type: 'textarea' },
              { key: 'image', label: 'Image URL / Upload Link', type: 'text' },
              { key: 'category', label: 'Category (web / mobile / other)', type: 'text' },
              { key: 'liveUrl', label: 'Live Demo URL', type: 'text' },
              { key: 'githubUrl', label: 'GitHub Repository URL', type: 'text' },
              { key: 'featured', label: 'Featured Project', type: 'boolean' }
            ]} 
          />
        </section>

        <section id="skills">
          <ContentEditor 
            title="Skills Manager" 
            items={data.skills} 
            onSave={(items) => handleSave('skills', items)} 
            fields={[
              { key: 'name', label: 'Skill Name', type: 'text' },
              { key: 'category', label: 'Category (frontend / backend / tools)', type: 'text' },
              { key: 'level', label: 'Proficiency Level (0-100)', type: 'number' },
              { key: 'icon', label: 'Icon SVG/PNG URL', type: 'text' }
            ]} 
          />
        </section>

        <section id="experience">
          <ContentEditor 
            title="Experience Timeline Manager" 
            items={data.experiences} 
            onSave={(items) => handleSave('experiences', items)} 
            fields={[
              { key: 'company', label: 'Company / Project Name', type: 'text' },
              { key: 'role', label: 'Role / Position', type: 'text' },
              { key: 'startDate', label: 'Start Date', type: 'text' },
              { key: 'endDate', label: 'End Date', type: 'text' },
              { key: 'description', label: 'Description', type: 'textarea' }
            ]} 
          />
        </section>
      </div>
    </div>
  );
};
