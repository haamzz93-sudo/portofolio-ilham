import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Bus, Navigation, Code2, Sparkles } from 'lucide-react';
import './Hobbies.css';

interface HobbyItem {
  id: string;
  title: string;
  category: string;
  slogan: string;
  description: string;
  image: string;
  icon: React.ReactNode;
  tags: string[];
}

export const Hobbies: React.FC = () => {
  const hobbies: HobbyItem[] = [
    {
      id: 'bus',
      title: 'Penikmat Perjalanan Malam',
      category: 'Bus & Road Enthusiast',
      slogan: 'Ketenangan di Balik Kaca Malam · Sensasi Lintas Jawa Bersama Sumber Group',
      description:
        'Penikmat estetika perjalanan bus malam antarkota (khususnya armada Sumber Group / Sugeng Rahayu rute Surabaya-Madiun-Solo-Yogya). Menikmati kedamaian deru mesin malam, hembusan angin jalanan, dan dinamika ritme jalur malam Jawa.',
      image: '/bus-hobby.jpg',
      icon: <Bus size={22} className="hobby-card__icon" />,
      tags: ['Sumber Group', 'Night Cruiser', 'Road Journey', 'Sugeng Rahayu'],
    },
    {
      id: 'touring',
      title: 'Touring & Nature Exploration',
      category: 'Motorcycle & Outdoor Explorer',
      slogan: 'Menjelajah Alam Bebas di Atas Roda Dua · Menyusuri Pesisir & Perbukitan',
      description:
        'Hobi menjelajahi keindahan alam Nusantara menggunakan sepeda motor. Menyusuri jalur pesisir pantai, tebing laut, dan perbukitan tinggi memberikan kebebasan batin, pandangan luas, serta ide-ide kreatif baru.',
      image: '/touring-hobby.jpg',
      icon: <Navigation size={22} className="hobby-card__icon" />,
      tags: ['Motor Touring', 'Nature Explorer', 'Freedom Ride', 'Coast Scenery'],
    },
    {
      id: 'coding',
      title: 'Software Crafting & AI Tinkering',
      category: 'Tech & Development Passion',
      slogan: 'Menerjemahkan Logika & Ide Kreatif Menjadi Aplikasi Digital Berkelanjutan',
      description:
        'Menekuni dunia koding, perancangan web & mobile apps, arsitektur backend FastAPI, hingga otomasi hardware IoT ESP32. Menyukai tantangan pemecahan masalah kompleks dan integrasi AI terbaru.',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
      icon: <Code2 size={22} className="hobby-card__icon" />,
      tags: ['Full-Stack Dev', 'IoT ESP32', 'AI Integration', 'Problem Solver'],
    },
  ];

  return (
    <section id="hobbies" className="section hobbies-section">
      <div className="container">
        <SectionHeading
          title="Beyond The Code"
          subtitle="Hobi, Minat & Aktivitas di Luar Layar Monitor"
        />

        <div className="hobbies-grid">
          {hobbies.map((item, index) => (
            <motion.div
              key={item.id}
              className="hobby-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              {/* Card Image Banner */}
              <div className="hobby-card__image-container">
                <img src={item.image} alt={item.title} className="hobby-card__img" />
                <div className="hobby-card__overlay" />
                <div className="hobby-card__category-badge">
                  {item.icon}
                  <span>{item.category}</span>
                </div>
              </div>

              {/* Card Content Body */}
              <div className="hobby-card__body">
                <h3 className="hobby-card__title">{item.title}</h3>
                
                {/* Slogan Quote */}
                <div className="hobby-card__slogan">
                  <Sparkles size={14} className="hobby-card__slogan-spark" />
                  <span>"{item.slogan}"</span>
                </div>

                <p className="hobby-card__desc">{item.description}</p>

                {/* Tags */}
                <div className="hobby-card__tags">
                  {item.tags.map((tag) => (
                    <span key={tag} className="hobby-card__tag">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
