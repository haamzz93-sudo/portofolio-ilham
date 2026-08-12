# ☁️ Deployment Guide — FastAPI Backend, Supabase & Vercel

Panduan lengkap untuk meng-hosting **Portfolio Website (Frontend React/Vite + Backend FastAPI)** ke **Vercel** dan menghubungkannya dengan **Supabase Cloud Database & Storage**.

---

## 🗄️ 1. Setup Supabase Project & Storage

1. Buat akun gratis di [Supabase](https://supabase.com/).
2. Buat **New Project** (misal nama: `ilham-portfolio`).
3. Dapatkan URL & API Key dari menu **Project Settings -> API**:
   - `SUPABASE_URL` (contoh: `https://xyzproject.supabase.co`)
   - `SUPABASE_KEY` (anon / public key)

4. **Buat Storage Buckets**:
   - Buka menu **Storage** -> **Create a new bucket**:
     - Bucket 1: `cv-files` (centang *Public Bucket*)
     - Bucket 2: `portfolio-images` (centang *Public Bucket*)

5. **Buat Database Tables (Opsional untuk Sync Backend)**:
   Jalankan query ini di **SQL Editor** Supabase:
   ```sql
   -- Table Projects
   CREATE TABLE projects (
     id TEXT PRIMARY KEY,
     title TEXT NOT NULL,
     description TEXT,
     image TEXT,
     tags TEXT[],
     liveUrl TEXT,
     githubUrl TEXT,
     featured BOOLEAN DEFAULT false,
     category TEXT DEFAULT 'web'
   );

   -- Table Skills
   CREATE TABLE skills (
     id TEXT PRIMARY KEY,
     name TEXT NOT NULL,
     category TEXT NOT NULL,
     level INT DEFAULT 80,
     icon TEXT
   );

   -- Table Experiences
   CREATE TABLE experiences (
     id TEXT PRIMARY KEY,
     company TEXT NOT NULL,
     role TEXT NOT NULL,
     startDate TEXT,
     endDate TEXT,
     description TEXT
   );
   ```

---

## 🐍 2. Struktur FastAPI Backend (`api/`)

Proyek ini telah dikonfigurasi dengan Serverless FastAPI backend di folder `api/`:

```text
portofolio-ilham/
├── api/
│   ├── index.py           # Endpoint FastAPI & Supabase Storage Client
│   └── requirements.txt   # FastAPI, Uvicorn, Supabase, Python-Multipart
├── vercel.json            # Rewrite rules (Frontend & FastAPI API routes)
```

Endpoint bawaan FastAPI yang siap digunakan:
- `GET /api/health` — Check status API & koneksi Supabase.
- `GET /api/portfolio` — Fetch data portofolio dari Supabase.
- `POST /api/upload/cv` — Endpoint upload file CV (PDF/DOC/TXT) ke Supabase Bucket.
- `POST /api/upload/image` — Endpoint upload foto Avatar & Project Image ke Supabase Storage.

---

## 🚀 3. Deploy ke Vercel

1. Push repository proyek Anda ke **GitHub**:
   ```bash
   git add .
   git commit -m "Add FastAPI backend, Supabase integration, and Vercel config"
   git push origin main
   ```

2. Buka dashboard [Vercel](https://vercel.com/) dan pilih **Add New Project**.
3. Import repository GitHub portofolio Anda.
4. **Konfigurasi Environment Variables** di Vercel:
   Tambahkan variabel berikut di menu **Environment Variables**:
   - `SUPABASE_URL` = `https://xyzproject.supabase.co`
   - `SUPABASE_KEY` = `your-supabase-anon-key`

5. Klik **Deploy**! Vercel akan otomatis:
   - Membangun Frontend React (Vite)
   - Menjalankan Backend FastAPI sebagai Vercel Serverless Function (`/api/*`)

---

## 🛠️ 4. Penggunaan Admin Panel Portofolio

Setelah website aktif di Vercel atau dijalankan secara lokal:
1. Buka halaman utama website.
2. Gulir ke paling bawah (**Footer**).
3. **Klik pada teks Copyright "© 2026 Ilham Eka Saputra..." sebanyak 5 kali secara cepat** untuk membuka modal login Admin.
4. Masukkan kredensial admin.
5. Anda dapat mengunggah file CV asli baru, mengganti gambar Avatar, memperbarui foto ID Card, serta mengedit proyek & keahlian secara langsung.
