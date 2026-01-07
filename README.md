# SiskamLinked - Admin Dashboard

**Portal Admin Sistem Keamanan Lingkungan Terpadu** - Aplikasi web untuk manajemen dan monitoring keamanan lingkungan dengan integrasi dua microservice (Patrol Service dan Incident Service).

## Deskripsi

SiskamLinked Admin adalah aplikasi React yang menyediakan dashboard untuk administrator untuk:
- **Monitoring real-time** laporan kejadian dari warga
- **Manajemen petugas** patroli yang sedang bertugas
- **Penugasan petugas** ke laporan kejadian dengan integrasi kedua microservice

## Arsitektur Integrasi Microservice

Aplikasi ini mengintegrasikan **2 microservice** yang berjalan independen dari layanan lain:

| Service | Deskripsi | Port |
|---------|-----------|------|
| **Patrol Service** | Manajemen petugas keamanan, autentikasi, dan data petugas aktif | 18223066 |
| **Incident Service** | Manajemen laporan kejadian/incident dari warga | 18223070 |


## Fitur Utama

### 1. Halaman Beranda (`/`)
- Landing page portal admin
- Tombol "Login Petugas" untuk masuk ke dashboard
- Tombol "Dashboard" untuk akses langsung (jika sudah login)

### 2. Login (`/login`)
- Autentikasi untuk admin/petugas
- Integrase dengan Patrol Service
- Token-based authentication

### 3. Dashboard Pos Komando (`/dashboard`) ⭐
Dashboard utama yang mengintegrasikan kedua microservice:

#### Fitur Patrol Service (Anda)
- **Petugas Aktif**: Daftar real-time petugas yang sedang bertugas
- **Informasi Petugas**: Nama, posisi, nomor telepon, dan lokasi
- **Total Petugas**: Statistik petugas aktif dan standby

#### Fitur Incident Service
- **Laporan Masuk**: Monitoring laporan kejadian dari warga secara real-time
- **Detail Laporan**: Lokasi, jenis kejadian, deskripsi, dan pelapor
- **Penugasan Petugas**: Assign petugas aktif ke laporan yang masuk
- **Status Laporan**: Menunggu / Ditangani

#### Stats & Monitoring
- Total petugas aktif
- Total petugas (semua)
- Laporan baru (menunggu penugasan)
- Total semua laporan
- Auto-refresh setiap 30 detik

## Tech Stack

| Technology | Version | Deskripsi |
|------------|---------|-----------|
| React | 18.x | UI Library |
| Vite | 5.x | Build Tool |
| React Router | 6.x | Routing |
| Axios | 1.x | HTTP Client |
| Tailwind CSS | 3.x | Styling |

## Instalasi & Menjalankan

### Prerequisites
- Node.js >= 18.x
- npm atau yarn

### Langkah Instalasi

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd siskamlinked-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Konfigurasi environment**
   
   Buat file `.env` di root directory:
   ```env
   VITE_PATROL_API_URL=http://18223066.tesatepadang.space
   VITE_INCIDENT_API_URL=http://18223070.tesatepadang.space
   ```

4. **Jalankan development server**
   ```bash
   npm run dev
   ```

5. **Akses aplikasi**
   
   Buka browser dan akses `http://localhost:5173`

## Struktur Project

```
src/bar admin
├── pages/
│   ├── Dashboard.jsx      # Dashboard utama (Integrasi 2 service)
│   └── Login.jsx          # Login page
└── services/
    └── api.js             # API client (Patrol + Incident Service)
│   ├── Login.jsx          # Login page
│   ├── Report.jsx         # Incident report form
│   └── CheckInOut.jsx     # Officer attendance
└── services/
    └── api.js             # API client configuration
```

## API Endpoints yang Digunakan

### Patrol Service (18223066)

| Method | Endpoint Milik Anda)

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| POST | `/auth/login` | Login admin/petugas |
| GET | `/officers` | Get semua petugas |
| GET | `/officers?status=on_duty` | Get petugas aktif |

### Incident Service (Milik Teman)

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/incidents` | Get semua laporan |
| PUT | `/incidents/:id` | Assign petugas ke laporan

### Untuk Warga (Public)

1. Buka halaman utama atau langsung ke `/report`
2. Isi forAdmin

1. **Login** ke halaman `/login`
   - Username & password dari Patrol Service
   
2. **Akses Dashboard** di `/dashboard`
   - Lihat petugas aktif dari Patrol Service
   - Monitor laporan dari Incident Service
   - Assign petugas ke laporan yang masuk
   
3. **Penugasan Petugas**
   - Pilih laporan dengan status "Menunggu"
   - Pilih petugas dari dropdown "Tugaskan Petugas"
   - Data terintegrasi otomatis ke Incident Service

## Developer

| NIM | Nama 
|-----|------
| 18223066 | Nazwan Siddqi Muttaqin 
| 18223070 | Muhammad Refino Ramadhan 
---
