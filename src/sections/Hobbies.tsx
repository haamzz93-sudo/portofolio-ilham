import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../components/ui/SectionHeading';
import './Hobbies.css';

interface HobbyItem {
  id: string;
  title: string;
  category: string;
  slogan: string;
  description: string;
  image: string;
  tags: string[];
}

export const Hobbies: React.FC = () => {
  const hobbies: HobbyItem[] = [
    {
      id: 'bus',
      title: 'Penikmat Perjalanan Malam',
      category: 'Night Travel & Bus Enthusiast',
      slogan: 'Menikmati Keheningan Jalanan Malam & Deru Mesin Lintas Jawa',
      description:
        'Saya penikmat perjalanan bus malam antarkota, khususnya armada Sumber Group & Sugeng Rahayu rute Surabaya - Madiun - Solo - Yogya. Ada ketenangan tersendiri saat melihat gemerlap lampu jalanan dan merasakan ritme perjalanan di balik kaca bus saat malam hari.',
      image: '/bus-hobby.jpg',
      tags: ['Sumber Group', 'Sugeng Rahayu', 'Night Travel', 'Lintas Jawa'],
    },
    {
      id: 'touring',
      title: 'Touring & Nature Exploration',
      category: 'Motorcycle Touring',
      slogan: 'Menjelajah Alam Bebas di Atas Roda Dua',
      description:
        'Suka touring naik motor buat eksplorasi tempat-tempat alam yang indah, mulai dari tebing pantai sampai daerah perbukitan. Buat saya, berkendara menyusuri jalanan luas itu cara terbaik buat menyegarkan pikiran dan cari inspirasi baru.',
      image: '/touring-hobby.jpg',
      tags: ['Motor Touring', 'Exploring Nature', 'Freedom Ride', 'Vario Rider'],
    },
    {
      id: 'coding',
      title: 'Software Crafting & AI Tinkering',
      category: 'Software & IoT Development',
      slogan: 'Mengubah Ide & Logika Menjadi Solusi Digital',
      description:
        'Dunia koding dan eksperimen teknologi adalah ruang bermain favorit saya. Dari membangun aplikasi web & mobile, merancang backend API, sampai mengutak-atik sensor hardware IoT ESP32 untuk memecahkan masalah nyata.',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
      tags: ['Full-Stack Dev', 'IoT ESP32', 'Python & React', 'Problem Solving'],
    },
  ];

  return (
    <section id="hobbies" className="section hobbies-section">
      <div className="container">
        <SectionHeading
          title="Beyond The Code"
          subtitle="Aktivitas, Minat & Hobi di Luar Koding"
        />

        <div className="hobbies-grid">
          {hobbies.map((item, index) => (
            <motion.div
              key={item.id}
              className="hobby-card"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: index * 0.12 }}
            >
              {/* Card Image Banner */}
              <div className="hobby-card__image-container">
                <img src={item.image} alt={item.title} className="hobby-card__img" />
                <div className="hobby-card__overlay" />
                <div className="hobby-card__category-badge">
                  <span>{item.category}</span>
                </div>
              </div>

              {/* Card Content Body */}
              <div className="hobby-card__body">
                <h3 className="hobby-card__title">{item.title}</h3>
                
                {/* Clean Slogan Quote */}
                <p className="hobby-card__slogan">"{item.slogan}"</p>

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
