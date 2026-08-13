# 🚀 Personal Portfolio v2 — Ilham Eka Saputra

[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.x-0055FF?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)

> **Website Portofolio Interaktif & Modern** milik **Ilham Eka Saputra**, Mahasiswa D3 Teknik Informatika Universitas Sebelas Maret (UNS) Kampus Madiun. Mengusung estetika *Glassmorphism*, *Cyber-Grid Background*, *Interactive 3D ID Card*, *Dark/Light Theme Toggle*, serta dukungan *Multi-Language (ID/EN)*.

---

## 👤 Profil Singkat

- **Nama**: Ilham Eka Saputra
- **NIM**: `V3924005`
- **Program Studi**: D3 Teknik Informatika
- **Perguruan Tinggi**: Universitas Sebelas Maret (UNS) Kampus Madiun
- **IPK saat ini**: `3.68`
- **Spesialisasi**: Full-Stack Web & Mobile Development, IoT Systems Integration, AI Prompt Engineering & LLM Integration
- **Email**: [haamzz93@gmail.com](mailto:haamzz93@gmail.com) | [ilhameka93@student.uns.ac.id](mailto:ilhameka93@student.uns.ac.id)
- **LinkedIn**: [Ilham Eka Saputra](https://www.linkedin.com/in/ilham-eka-saputra-b01069330/)
- **GitHub**: [@IlhamEkaa93](https://github.com/IlhamEkaa93)
- **Telepon / WhatsApp**: [+62 852-3128-7023](https://wa.me/6285231287023)

---

## ✨ Fitur Utama

1. **🎨 High-End Design System (Dark & Light Theme)**
   - Tema *Dark Mode* default dengan aksen warna cyan-glow khas developer modern.
   - Tema *Light Mode* yang kontras, bersih, dan nyaman dibaca.
   - Smooth transition & state persistence menggunakan `localStorage`.

2. **⚡ Interactive Cyber Grid & Vector Background**
   - Animated SVG Grid background yang selalu menyesuaikan dengan tema aktif.
   - Vectors *Floating Paths* animasi bergerak dengan efek ambient lighting.

3. **🎴 3D Flippable Student Pass (IdCard3D)**
   - ID Card mahasiswa interaktif 3D dengan efek tilt parallax, gantungan *lanyard*, pita metallic ring, barcode, serta flip animasi 3D.
   - Menampilkan detail resmi NIM (`V3924005`) dan jurusan.

4. **🌐 Dual Language Support (Indonesian & English)**
   - Beralih bahasa secara instan (ID / EN) melalui Navbar tanpa perlu reload halaman.

5. **💼 Responsive Showcase Sections**
   - **Hero**: Layout 3-kolom responsif untuk desktop & mobile dengan avatar karakter 2D.
   - **About Me**: Informasi bio, statistik IPK (`3.68`), dan tombol *Download CV*.
   - **Skills & Expertise**: Daftar keahlian teknologi dengan ikon brand resmi & bar progress level.
   - **Featured Projects**: Galeri proyek nyata dilengkapi filter kategori (Web, Mobile, Other), link *Live Demo* (misal: [leximedai.web.id](https://www.leximedai.web.id/)), dan *Source Code*.
   - **Experience Timeline**: Linimasa pengalaman kerja & riset dengan efek *Cyber-Glassmorphism* dan *pulsing neon dot*.
   - **Contact & Map Footer**: Formulir pesan interaktif, tautan sosial media, kontak WhatsApp, dan widget Google Maps lokasi kampus UNS Madiun.
   - **🏍️ Beyond The Code (Hobbies & Passions Section)**
     - **🚍 Penikmat Perjalanan Malam (Bus Enthusiast)**: Apresiasi pada jalur malam Jawa (armada *Sumber Group / Sugeng Rahayu* Surabaya-Madiun-Solo-Yogya). *"Ketenangan di Balik Kaca Malam · Sensasi Lintas Jawa"*.
     - **🏍️ Riding & Nature Exploration (Motor Touring)**: Hobi eksplorasi alam pesisir pantai & perbukitan menggunakan motor Honda Vario. *"Menjelajah Alam Bebas di Atas Roda Dua"*.
     - **💻 Software Crafting & Tech Tinkering (Coding)**: Passion merancang web, mobile apps, backend FastAPI, dan integrasi IoT mikrokontroler.

6. **✨ Animated Cyber Border Buttons (Shadcn UI + Motion)**
   - Komponen tombol interaktif berbasis Shadcn UI `Button` & Framer Motion `motion.div`.
   - Mengusung efek animasi lis border berjalan (*continuous glowing border path*) berwarna cyan-blue khas tema neon `IES` (`via-[#4DA8DA] to-[#0284C7]`).

7. **🔒 Hidden Admin Panel**
   - Panel manajemen konten tersembunyi yang diakses melalui easter-egg di Footer (klik copyright 5x) dengan otentikasi login aman & Cloud Supabase database sync.

---

## 🛠️ Teknologi & Tools yang Digunakan

- **Core**: React 18, TypeScript, Vite, Shadcn UI (`@radix-ui/react-slot`, `cva`, `clsx`, `tailwind-merge`)
- **Styling**: Vanilla CSS, Tailwind CSS (Utilities), Glassmorphism, CSS Custom Properties
- **Animation**: Framer Motion, CSS Keyframes
- **Icons**: Lucide React, Wikipedia / Wikimedia Direct SVG Logos
- **State & Context**: React Context API (`LanguageContext`, `ThemeContext`, `AdminContext`)

---

## 📁 Struktur Folder Proyek

```text
portofolio-ilham/
├── public/                  # Asset publik (character.png, cv.txt, favicon)
├── src/
│   ├── admin/               # Context & Komponen Admin Provider
│   ├── components/
│   │   ├── layout/          # Navbar, Footer
│   │   └── ui/              # AnimatedGridBackground, IdCard3D, SkillBadge, ProjectCard, TimelineItem, CustomCursor, dll.
│   ├── context/             # LanguageContext, ThemeContext
│   ├── data/                # Data default portofolio (portfolio.ts)
│   ├── pages/               # Home.tsx, AdminDashboard.tsx
│   ├── sections/            # Hero, About, Skills, Projects, Experience, Contact
│   ├── utils/               # Constants, Translations, Types
│   ├── App.tsx              # Entry Point App
│   ├── main.tsx             # React DOM Renderer
│   └── index.css            # Global CSS Variables & Reset
├── package.json             # Dependensi & Scripts
├── tsconfig.json            # Konfigurasi TypeScript
├── vite.config.ts           # Konfigurasi Vite
└── README.md                # Dokumentasi Proyek
```

---

## 🚀 Cara Menjalankan Proyek Secara Lokal

### Prasyarat
- Node.js (versi 18.x atau lebih baru)
- npm atau yarn

### Langkah-langkah

1. **Clone repository ini**:
   ```bash
   git clone https://github.com/IlhamEkaa93/portofolio-ilham.git
   cd portofolio-ilham
   ```

2. **Install dependensi**:
   ```bash
   npm install
   ```

3. **Jalankan server pengembangan (Dev Server)**:
   ```bash
   npm run dev
   ```

4. **Buka di browser**:
   Akses `http://localhost:5173/` di browser pilihan Anda.

5. **Build untuk Produksi**:
   ```bash
   npm run build
   ```

---

## 📜 Lisensi & Hak Cipta

© 2026 **Ilham Eka Saputra**. All Rights Reserved.  
Dikembangkan untuk keperluan profesional & pemetaan karir perangkat lunak.
