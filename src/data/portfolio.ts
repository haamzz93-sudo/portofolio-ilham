export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  category: 'web' | 'mobile' | 'other';
}

export interface Skill {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'tools';
  level: number;
  icon?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface PortfolioData {
  projects: Project[];
  skills: Skill[];
  experiences: Experience[];
  bio: string;
  tagline: string;
  stats: { label: string; value: string }[];
  cvUrl?: string;
  avatarUrl?: string;
  idPhotoUrl?: string;
}

const DEFAULT_DATA: PortfolioData = {
  cvUrl: '/cv-ilham-eka-saputra.txt',
  avatarUrl: '/character.png',
  idPhotoUrl: '/character.png',
  projects: [
    {
      id: 'p1',
      title: 'LLM RS — Clinical Decision Support System',
      description: 'Sistem dokumentasi klinis otomatis memanfaatkan teknologi Large Language Models (LLM). Terintegrasi modul Speech-to-Text (STT) dan Text-to-Speech (TTS) untuk efisiensi input data medis.',
      image: '',
      tags: ['LLM', 'Python', 'STT', 'TTS', 'AI', 'Flask'],
      liveUrl: 'https://www.leximedai.web.id/',
      githubUrl: 'https://github.com/IlhamEkaa93',
      featured: true,
      category: 'web',
    },
    {
      id: 'p2',
      title: 'Personal Portfolio v2',
      description: 'Portfolio website modern dibangun dengan React, TypeScript, dan Framer Motion. Menampilkan desain glassmorphism, animasi halus, background grid animasi, dan sistem multi-bahasa (EN/ID).',
      image: '',
      tags: ['React', 'TypeScript', 'Framer Motion', 'Vite'],
      liveUrl: '#',
      githubUrl: 'https://github.com/IlhamEkaa93',
      featured: false,
      category: 'web',
    },
  ],
  skills: [
    // Frontend
    { id: 's1', name: 'JavaScript', category: 'frontend', level: 88, icon: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png' },
    { id: 's2', name: 'PHP', category: 'frontend', level: 80, icon: 'https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg' },
    { id: 's3', name: 'React', category: 'frontend', level: 85, icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg' },
    { id: 's4', name: 'React Native', category: 'frontend', level: 80, icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg' },
    { id: 's5', name: 'Flutter', category: 'frontend', level: 78, icon: 'https://upload.wikimedia.org/wikipedia/commons/1/17/Google-flutter-logo.png' },
    { id: 's6', name: 'HTML & CSS', category: 'frontend', level: 92, icon: 'https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg' },
    // Backend
    { id: 's7', name: 'Python / Flask', category: 'backend', level: 82, icon: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg' },
    { id: 's8', name: 'Advanced SQL', category: 'backend', level: 85, icon: 'https://upload.wikimedia.org/wikipedia/labs/8/8e/MySQL_logo.svg' },
    { id: 's9', name: 'MySQL', category: 'backend', level: 88, icon: 'https://upload.wikimedia.org/wikipedia/labs/8/8e/MySQL_logo.svg' },
    { id: 's10', name: 'LLM / AI Dev', category: 'backend', level: 75, icon: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg' },
    { id: 's11', name: 'OOP', category: 'backend', level: 82, icon: 'https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg' },
    // Tools
    { id: 's12', name: 'Git & GitHub', category: 'tools', level: 85, icon: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg' },
    { id: 's13', name: 'IoT / ESP32', category: 'tools', level: 75, icon: 'https://upload.wikimedia.org/wikipedia/commons/8/87/Arduino_Logo.svg' },
    { id: 's14', name: 'Figma / UX', category: 'tools', level: 78, icon: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg' },
  ],
  experiences: [
    {
      id: 'e1',
      company: 'Clinical Decision Support System (LLM RS)',
      role: 'Backend & AI Integrator',
      startDate: 'Mar 2026',
      endDate: 'Present',
      description: 'Merancang dan mengintegrasikan sistem dokumentasi klinis otomatis memanfaatkan Large Language Models (LLM). Mengimplementasikan modul Speech-to-Text (STT) dan Text-to-Speech (TTS) untuk efisiensi input data medis di rumah sakit.',
    },
    {
      id: 'e2',
      company: 'GiziLens — Digital Stunting Screening',
      role: 'Lead Developer',
      startDate: 'Mar 2025',
      endDate: 'Feb 2026',
      description: 'Membangun arsitektur front-end responsif menggunakan Flutter/React Native dan backend API berbasis Flask terintegrasi AI. Menyusun dokumentasi teknis SRS, pemodelan proses bisnis, dan mengoptimalkan performa kueri basis data untuk sistem monitoring kesehatan.',
    },
    {
      id: 'e3',
      company: 'Guardian Cerdas Hutan — IoT Research',
      role: 'IoT System Architecture & Scientific Research',
      startDate: 'May 2025',
      endDate: 'May 2025',
      description: 'Merancang sistem deteksi dini kebakaran hutan berbasis mikrokontroler ESP32/Arduino dan sensor terintegrasi. Mengimplementasikan protokol komunikasi nirkabel LoRaWAN untuk efisiensi pengiriman data di area terpencil.',
    },
    {
      id: 'e4',
      company: 'Self Employed',
      role: 'Desainer Grafis Freelance',
      startDate: 'Okt 2023',
      endDate: 'Mei 2024',
      description: 'Menyediakan layanan desain grafis freelance spesialisasi vector-based design menggunakan CorelDRAW. Proyek meliputi envelope layout, event poster, social media graphics, flyer, dan brochure untuk berbagai kebutuhan klien.',
    },
  ],
  bio: "Mahasiswa Semester 5 D3 Teknik Informatika Universitas Sebelas Maret (UNS) Madiun dengan spesialisasi Full-Stack Web & Mobile Development serta integrasi IoT. Memiliki pengalaman kuat dalam merancang arsitektur sistem dari UI/UX hingga Advanced Database, serta sukses mengembangkan proyek inovatif seperti platform screening stunting AI (GiziLens) dan Clinical Decision Support System berbasis LLM.",
  tagline: 'Full-Stack Developer · IoT Engineer · AI Enthusiast',
  stats: [
    { label: 'GPA', value: '3.68' },
    { label: 'Projects', value: '10+' },
    { label: 'University', value: 'UNS' },
  ],
};

export function getPortfolioData(): PortfolioData {
  try {
    const saved = localStorage.getItem('portfolio_data');
    if (saved) {
      const parsed = JSON.parse(saved);
      
      // Clean up temporary blob URLs that cause 404 errors on page refresh
      const cleanCvUrl = parsed.cvUrl && !parsed.cvUrl.startsWith('blob:') ? parsed.cvUrl : DEFAULT_DATA.cvUrl;
      const cleanAvatarUrl = parsed.avatarUrl && !parsed.avatarUrl.startsWith('blob:') ? parsed.avatarUrl : DEFAULT_DATA.avatarUrl;
      const cleanIdPhotoUrl = parsed.idPhotoUrl && !parsed.idPhotoUrl.startsWith('blob:') ? parsed.idPhotoUrl : DEFAULT_DATA.idPhotoUrl;

      return {
        ...DEFAULT_DATA,
        ...parsed,
        cvUrl: cleanCvUrl,
        avatarUrl: cleanAvatarUrl,
        idPhotoUrl: cleanIdPhotoUrl,
        projects: parsed.projects?.length ? parsed.projects : DEFAULT_DATA.projects,
        skills: parsed.skills?.length ? parsed.skills : DEFAULT_DATA.skills,
        experiences: parsed.experiences?.length ? parsed.experiences : DEFAULT_DATA.experiences,
      };
    }
  } catch (e) {
    console.error('Error loading portfolio data:', e);
  }
  return DEFAULT_DATA;
}

export function savePortfolioData(data: PortfolioData): void {
  try {
    localStorage.setItem('portfolio_data', JSON.stringify(data));
  } catch (e) {
    console.error('Error saving portfolio data:', e);
  }
}

export { DEFAULT_DATA };
