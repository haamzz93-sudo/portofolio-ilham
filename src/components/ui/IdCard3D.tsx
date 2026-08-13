import React, { useState } from 'react';
import { RotateCw, QrCode, ShieldCheck, Mail, MapPin, GraduationCap } from 'lucide-react';
import './IdCard3D.css';

interface IdCard3DProps {
  imageSrc?: string;
}

export const IdCard3D: React.FC<IdCard3DProps> = ({
  imageSrc = '/id-photo.png',
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const finalImageSrc = imageSrc && !imageSrc.startsWith('blob:') ? imageSrc : '/id-photo.png';

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - card.left - card.width / 2;
    const y = e.clientY - card.top - card.height / 2;
    // Subtle parallax tilt
    const rotX = -(y / card.height) * 15;
    const rotY = (x / card.width) * 15;
    setRotate({ x: rotX, y: rotY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="id-card-3d-scene">
      {/* Lanyard Ribbon & Clip Assembly */}
      <div className="id-card-lanyard-assembly">
        <div className="id-card-ribbon" />
        <div className="id-card-clip-ring" />
        <div className="id-card-clip" />
      </div>

      <div
        className={`id-card-3d-wrapper ${isFlipped ? 'flipped' : ''}`}
        onClick={toggleFlip}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: isFlipped
            ? 'perspective(1000px) rotateY(180deg)'
            : `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        }}
      >
        {/* ── FRONT FACE ── */}
        <div className="id-card-face id-card-front glass">
          <div className="id-card-hologram-strip" />

          {/* Lanyard Slot */}
          <div className="id-card-slot" />

          {/* Header */}
          <div className="id-card-header">
            <div className="id-card-logo">UNS</div>
            <div className="id-card-header-text">
              <h5>UNIVERSITAS SEBELAS MARET</h5>
              <span>KAMPUS MADIUN • STUDENT PASS</span>
            </div>
          </div>

          {/* Photo Frame */}
          <div className="id-card-photo-box">
            <img src={finalImageSrc} alt="Ilham Eka Saputra" className="id-card-photo" />
          </div>

          {/* User Details */}
          <div className="id-card-details">
            <h3 className="id-card-name">ILHAM EKA SAPUTRA</h3>
            <p className="id-card-role">SOFTWARE DEVELOPER</p>

            <div className="id-card-meta">
              <div className="meta-item">
                <span className="meta-label">NIM</span>
                <span className="meta-value">V3924005</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">MAJOR</span>
                <span className="meta-value">COMP. SCIENCE</span>
              </div>
            </div>
          </div>

          {/* Footer Barcode & Security */}
          <div className="id-card-footer">
            <div className="id-card-barcode">
              <div className="barcode-line w-full" />
              <div className="barcode-text">V3924005-UNS-2026</div>
            </div>
            <div className="id-card-flip-hint">
              <RotateCw size={14} /> Flip
            </div>
          </div>
        </div>

        {/* ── BACK FACE ── */}
        <div className="id-card-face id-card-back glass">
          <div className="id-card-magnetic-stripe" />
          <div className="id-card-slot" />

          <div className="id-card-back-header">
            <ShieldCheck size={20} className="text-accent" />
            <span>OFFICIAL IDENTIFICATION</span>
          </div>

          <div className="id-card-back-body">
            <div className="id-card-qr-box">
              <QrCode size={56} className="id-card-qr" />
              <span className="qr-sub">SCAN FOR BIO</span>
            </div>

            <div className="id-card-contact-list">
              <div className="contact-row">
                <GraduationCap size={14} className="text-accent" />
                <span>UNS Kampus Madiun</span>
              </div>
              <div className="contact-row">
                <MapPin size={14} className="text-accent" />
                <span>Madiun / Surakarta, ID</span>
              </div>
              <div className="contact-row">
                <Mail size={14} className="text-accent" />
                <span>haamzz93@gmail.com</span>
              </div>
            </div>
          </div>

          <div className="id-card-signature-area">
            <div className="signature-line">
              <span className="signature-font">Ilham Eka Saputra</span>
            </div>
            <span className="signature-label">AUTHORISED SIGNATURE</span>
          </div>

          <div className="id-card-footer">
            <div className="barcode-text">PROPERTY OF UNIVERSITAS SEBELAS MARET</div>
            <div className="id-card-flip-hint">
              <RotateCw size={14} /> Flip
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
