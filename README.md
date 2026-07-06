# SISPADA JABAR: Sistem Informasi Statistik Perceraian Daerah Jawa Barat (2021-2025)

Aplikasi Website Dashboard Interaktif Premium untuk visualisasi dan analisis data kasus perceraian di Provinsi Jawa Barat tahun 2021-2025. Proyek ini dibuat untuk memenuhi tugas **Ujian Akhir Semester (UAS) Pemrograman Web / Analisis Data**.

Website dirancang dengan konsep **Single Page Application (SPA)** bertema modern, *dark mode* elegan, *glassmorphism*, transisi antar bagian yang halus, serta dilengkapi dengan kecerdasan buatan lokal (**AI Chatbot**) sebagai asisten analisis data virtual.

---

## 🌟 Fitur Utama
1. **Loading Screen / Preloader**: Animasi pemuatan sistem futuristik dengan indikator persentase loading sebelum menampilkan konten utama.
2. **Interactive Sticky Navbar**: Menu navigasi atas yang melayang dengan efek blur latar belakang dan pelacakan aktif (active link indicator) berbasis scroll halaman.
3. **Home / Hero Section**: Berisi judul web, identitas mahasiswa (Nama & NIM), ringkasan proyek, dan kartu interaktif tujuan analisis data.
4. **Interactive BI Dashboard (Google Looker Studio)**: Dashboard yang di-embed secara rapi dan interaktif. Dilengkapi fitur:
   - **Full-Screen Mode**: Memperluas tampilan dashboard untuk eksplorasi visual data yang lebih luas.
   - **Refresh/Reload Control**: Memuat ulang dashboard Looker Studio tanpa me-refresh seluruh halaman web.
   - **Interactive Slicers & Graphs**: 5+ visualisasi interaktif bawaan Looker Studio (Diagram batang, garis, peta distribusi spasial, tabel peringkat, dll).
5. **Insight & AI Chatbot Analyst**: 
   - Tabulasi temuan utama dan faktor pemicu perceraian terpopuler menggunakan modul akordion interaktif.
   - **SISPADA AI Chatbot**: Asisten virtual cerdas yang dapat menjawab pertanyaan seputar statistik perceraian, daerah dengan kasus tertinggi, tren tahunan, hingga rekomendasi pencegahan perceraian secara langsung dan interaktif.
6. **About Section**: Detail dataset (sumber data Open Data Jabar & BPS), perangkat kerja (tools) yang digunakan, referensi resmi, serta kartu profil pengembang lengkap dengan tautan media sosial.

---

## 📂 Struktur Berkas
```text
website_uas/
│
├── index.html   # Struktur utama halaman web (HTML5)
├── style.css    # Desain visual, tata letak, glassmorphism, & animasi (CSS3 Vanilla)
├── script.js    # Logika loading screen, kontrol dashboard, & SISPADA AI (JavaScript ES6)
└── README.md    # Dokumentasi proyek (Markdown)
```

---

## 🛠️ Teknologi & Libs yang Digunakan
- **HTML5**: Semantik kerangka web untuk aksesibilitas dan SEO.
- **CSS3 (Vanilla)**: Desain kustom tanpa pustaka pihak ketiga untuk kinerja performa rendering yang sangat cepat. Menggunakan variabel CSS untuk manajemen tema warna *Sky Blue*.
- **JavaScript (ES6)**: Penggerak interaktivitas (typing animation chatbot, loaders, scroll observer, accordion, fullscreen).
- **Google Looker Studio**: Pengolahan dan visualisasi data business intelligence yang di-embed secara aman.
- **FontAwesome (v6.4.0)**: CDN penyedia ikon premium.
- **Google Fonts (Outfit & Inter)**: Tipografi modern berbobot premium.

---

## 🚀 Cara Menjalankan Website Secara Lokal
Karena proyek ini berbasis *frontend client-side* statis (tanpa memerlukan server backend database terpisah), Anda dapat menjalankannya dengan mudah:

### Metode 1: Buka Langsung (Double-Click)
1. Buka folder `website_uas`.
2. Klik dua kali pada file `index.html`.
3. File akan langsung terbuka di browser default Anda (Google Chrome, Microsoft Edge, Mozilla Firefox, dll).

### Metode 2: Menggunakan Live Server (Sangat Direkomendasikan)
Jika Anda menggunakan **Visual Studio Code**:
1. Pasang ekstensi **Live Server** di VS Code.
2. Buka folder `website_uas` di VS Code.
3. Klik kanan pada `index.html` dan pilih **Open with Live Server** (atau klik tombol **Go Live** di pojok kanan bawah editor).
4. Website akan berjalan di alamat lokal port dev `http://127.0.0.1:5500/index.html`.

---


