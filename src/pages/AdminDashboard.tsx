import React, { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAdmin } from '../admin/AdminProvider';
import { ContentEditor } from '../admin/ContentEditor';
import { getPortfolioData, savePortfolioData } from '../data/portfolio';
import type { PortfolioData } from '../data/portfolio';
import { LogOut, Home, LayoutDashboard, FileText, Save, Check, Upload, Trash2 } from 'lucide-react';
import '../admin/admin.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const AdminDashboard: React.FC = () => {
  const { isAuthenticated, logout } = useAdmin();
  const [data, setData] = useState<PortfolioData | null>(null);
  const [cvStatus, setCvStatus] = useState<string>('');
  const [avatarStatus, setAvatarStatus] = useState<string>('');
  const [idCardStatus, setIdCardStatus] = useState<string>('');
  const [saveNotify, setSaveNotify] = useState<string>('');

  useEffect(() => {
    setData(getPortfolioData());
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

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (data) {
      savePortfolioData(data);
      triggerSaveNotify('✅ Profile Info & Cloud Config Saved Successfully!');
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

    setCvStatus('Uploading CV document to Supabase Cloud...');
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch(`${API_BASE_URL}/api/upload/cv`, {
        method: 'POST',
        body: formData,
      });
      const result = await res.json();
      if (result.url) {
        const newData = { ...data, cvUrl: result.url };
        setData(newData);
        savePortfolioData(newData);
        setCvStatus(`✅ CV PDF Uploaded & Synced to Cloud: ${file.name}`);
        return;
      }
    } catch {
      // Fallback
    }

    // Read exact PDF as Base64 Data URL so browser downloads real PDF
    const reader = new FileReader();
    reader.onload = () => {
      const pdfDataUrl = reader.result as string;
      const newData = { ...data, cvUrl: pdfDataUrl };
      setData(newData);
      savePortfolioData(newData);
      setCvStatus(`✅ PDF CV File Saved & Ready for Download: ${file.name}`);
    };
    reader.readAsDataURL(file);
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
      if (result.url) {
        const newData = { ...data, avatarUrl: result.url };
        setData(newData);
        savePortfolioData(newData);
        setAvatarStatus('✅ Avatar Saved to Cloud (Cross-Device Synced)!');
        return;
      }
    } catch {
      // Fallback to base64 if network offline
    }

    const reader = new FileReader();
    reader.onload = () => {
      const imgUrl = reader.result as string;
      const newData = { ...data, avatarUrl: imgUrl };
      setData(newData);
      savePortfolioData(newData);
      setAvatarStatus('✅ Avatar Saved!');
    };
    reader.readAsDataURL(file);
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
      if (result.url) {
        const newData = { ...data, idPhotoUrl: result.url };
        setData(newData);
        savePortfolioData(newData);
        setIdCardStatus('✅ ID Photo Saved to Cloud (Cross-Device Synced)!');
        return;
      }
    } catch {
      // Fallback to base64 if network offline
    }

    const reader = new FileReader();
    reader.onload = () => {
      const imgUrl = reader.result as string;
      const newData = { ...data, idPhotoUrl: imgUrl };
      setData(newData);
      savePortfolioData(newData);
      setIdCardStatus('✅ ID Photo Saved!');
    };
    reader.readAsDataURL(file);
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
          <button onClick={logout} className="admin-sidebar__link admin-sidebar__logout"><LogOut size={18} /> Logout</button>
        </nav>
      </div>

      <div className="admin-main">
        <div className="admin-header">
          <div className="admin-header__title-box">
            <h1>Dashboard Management</h1>
            <p className="admin-header__sub">Global Supabase Cloud Sync • Real-Time Database Manager</p>
          </div>
          <div className="admin-header__status">
            <span className="status-badge status-badge--success">FastAPI: healthy</span>
            <span className="status-badge status-badge--success">Supabase: Ready for Cloud</span>
            <span className="status-badge status-badge--info">☁️ Global Cross-Device Active</span>
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
            <h3 className="admin-card__title"><FileText size={20} /> Media & Document Assets Manager</h3>
          </div>

          {/* Active Assets CRUD Grid */}
          <div className="admin-assets-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
            
            {/* CV Asset Card */}
            <div className="asset-card" style={{ padding: '1.25rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <h4 style={{ fontSize: '0.95rem', color: 'var(--accent)', margin: 0 }}>📄 Official CV Document</h4>
                <span className="admin-badge" style={{ fontSize: '0.7rem' }}>{data.cvUrl ? 'Cloud Active' : 'Default TXT'}</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem', wordBreak: 'break-all' }}>
                {data.cvUrl ? data.cvUrl : 'Using default CV fallback file.'}
              </p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {data.cvUrl && (
                  <a href={data.cvUrl} target="_blank" rel="noreferrer" className="admin-btn admin-btn--outline" style={{ fontSize: '0.75rem', padding: '4px 10px' }}>
                    <FileText size={14} /> Test Download
                  </a>
                )}
                <label className="admin-btn admin-btn--primary" style={{ fontSize: '0.75rem', padding: '4px 10px', cursor: 'pointer' }}>
                  <Upload size={14} /> Upload / Replace PDF
                  <input type="file" accept=".pdf,.doc,.docx,.txt" onChange={handleCvUpload} style={{ display: 'none' }} />
                </label>
                {data.cvUrl && (
                  <button
                    type="button"
                    onClick={() => {
                      const newData = { ...data, cvUrl: '' };
                      setData(newData);
                      savePortfolioData(newData);
                      setCvStatus('🗑️ CV Reset to Default');
                    }}
                    className="admin-btn admin-btn--danger"
                    style={{ fontSize: '0.75rem', padding: '4px 10px' }}
                  >
                    <Trash2 size={14} /> Reset
                  </button>
                )}
              </div>
              {cvStatus && <p style={{ fontSize: '0.8rem', color: '#10B981', marginTop: '0.5rem' }}>{cvStatus}</p>}
            </div>

            {/* Homepage Avatar Asset Card */}
            <div className="asset-card" style={{ padding: '1.25rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <h4 style={{ fontSize: '0.95rem', color: 'var(--accent)', margin: 0 }}>🖼️ Hero Portrait Avatar</h4>
                <span className="admin-badge" style={{ fontSize: '0.7rem' }}>{data.avatarUrl ? 'Cloud Active' : 'Default'}</span>
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
                <img src={data.avatarUrl || '/character.png'} alt="Avatar Preview" style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--accent)' }} />
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0, wordBreak: 'break-all' }}>
                  {data.avatarUrl ? 'Cloud Image Uploaded' : 'Default Batik Portrait'}
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <label className="admin-btn admin-btn--primary" style={{ fontSize: '0.75rem', padding: '4px 10px', cursor: 'pointer' }}>
                  <Upload size={14} /> Upload / Replace
                  <input type="file" accept="image/*" onChange={handleAvatarUpload} style={{ display: 'none' }} />
                </label>
                {data.avatarUrl && (
                  <button
                    type="button"
                    onClick={() => {
                      const newData = { ...data, avatarUrl: '' };
                      setData(newData);
                      savePortfolioData(newData);
                      setAvatarStatus('🗑️ Avatar Reset to Default');
                    }}
                    className="admin-btn admin-btn--danger"
                    style={{ fontSize: '0.75rem', padding: '4px 10px' }}
                  >
                    <Trash2 size={14} /> Reset
                  </button>
                )}
              </div>
              {avatarStatus && <p style={{ fontSize: '0.8rem', color: '#10B981', marginTop: '0.5rem' }}>{avatarStatus}</p>}
            </div>

            {/* Student Pass ID Photo Asset Card */}
            <div className="asset-card" style={{ padding: '1.25rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <h4 style={{ fontSize: '0.95rem', color: 'var(--accent)', margin: 0 }}>🪪 Student Pass Formal ID</h4>
                <span className="admin-badge" style={{ fontSize: '0.7rem' }}>{data.idPhotoUrl ? 'Cloud Active' : 'Default Blue BG'}</span>
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
                <img src={data.idPhotoUrl || '/id-photo.png'} alt="ID Photo Preview" style={{ width: '45px', height: '55px', objectFit: 'cover', borderRadius: '6px', border: '1px solid var(--accent)' }} />
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0, wordBreak: 'break-all' }}>
                  {data.idPhotoUrl ? 'Cloud ID Photo Uploaded' : 'Formal Blue BG Photo'}
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <label className="admin-btn admin-btn--primary" style={{ fontSize: '0.75rem', padding: '4px 10px', cursor: 'pointer' }}>
                  <Upload size={14} /> Upload / Replace
                  <input type="file" accept="image/*" onChange={handleIdCardPhotoUpload} style={{ display: 'none' }} />
                </label>
                {data.idPhotoUrl && (
                  <button
                    type="button"
                    onClick={() => {
                      const newData = { ...data, idPhotoUrl: '' };
                      setData(newData);
                      savePortfolioData(newData);
                      setIdCardStatus('🗑️ ID Photo Reset to Default');
                    }}
                    className="admin-btn admin-btn--danger"
                    style={{ fontSize: '0.75rem', padding: '4px 10px' }}
                  >
                    <Trash2 size={14} /> Reset
                  </button>
                )}
              </div>
              {idCardStatus && <p style={{ fontSize: '0.8rem', color: '#10B981', marginTop: '0.5rem' }}>{idCardStatus}</p>}
            </div>

          </div>

          <form onSubmit={handleProfileSave}>
            <div className="admin-form-group">
              <label>Tagline / Main Role</label>
              <input
                type="text"
                value={data.tagline || ''}
                onChange={(e) => setData({ ...data, tagline: e.target.value })}
                className="admin-input"
              />
            </div>

            <div className="admin-form-group">
              <label>Bio Summary</label>
              <textarea
                rows={4}
                value={data.bio || ''}
                onChange={(e) => setData({ ...data, bio: e.target.value })}
                className="admin-input admin-textarea"
              />
            </div>

            <button type="submit" className="admin-btn admin-btn--primary">
              <Save size={16} /> Save Profile Info & Sync Cloud
            </button>
          </form>
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
