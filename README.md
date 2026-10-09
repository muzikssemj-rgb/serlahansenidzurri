# Sistem Pemarkahan SSS Muzik (Firebase)

Sistem pemarkahan digital Sesi Serlahan Seni (Seni Muzik). Semua data (calon, markah, foto) disimpan di **Firebase**. Laman boleh dihoskan di **GitHub Pages, Vercel atau Netlify**: semua laman ini membaca data yang sama.

```
index.html            laman sistem
firebase-config.js    TETAPAN FIREBASE (wajib diisi)
firestore.rules       peraturan keselamatan pangkalan data
storage.rules         peraturan keselamatan video (pilihan)
icon.svg, manifest.webmanifest, .nojekyll
```

---

## Langkah 1: Sediakan Firebase (sekali sahaja, ±15 minit)

1. Buka **console.firebase.google.com** → **Create a project** → beri nama (cth: `sss-muzik`). Google Analytics boleh dimatikan.

2. **Pangkalan data (Firestore)**
   - Menu kiri: **Build → Firestore Database → Create database**.
   - Lokasi: **asia-southeast1 (Singapore)**. Mod: **Production mode**.
   - Tab **Rules**: padam semua, tampal isi fail `firestore.rules`, kemudian tekan **Publish**.

3. **Log masuk panel (Authentication)**
   - **Build → Authentication → Get started → Email/Password → Enable → Save**.
   - Tab **Users → Add user**: cipta akaun untuk setiap panel (atau satu akaun yang dikongsi).
   - Tab **Settings → User actions**: **nyahtanda "Enable create (sign-up)"**, supaya orang lain tidak boleh mendaftar sendiri.

4. **Sambungkan laman kepada Firebase**
   - Ikon gear → **Project settings → General → Your apps** → klik ikon **`</>`** (Web) → beri nama → **Register app**.
   - Salin nilai dalam `const firebaseConfig = {...}`, kemudian tampal ke dalam `firebase-config.js`, menggantikan nilai `ISI_...`.

## Langkah 2: Upload ke GitHub

1. Log masuk **github.com** → **+ → New repository** → nama `sss-muzik`.
   - Untuk **GitHub Pages percuma**, pilih **Public**. Kod laman tidak mengandungi rahsia; data dilindungi oleh log masuk dan Rules Firebase.
   - Jika mahu **Private**, guna Vercel atau Netlify (Langkah 3B/3C).
2. Klik **uploading an existing file** → seret **semua fail di dalam folder ini** (bukan folder itu sendiri) → **Commit changes**.
   - Semak: `index.html` mesti kelihatan terus di halaman utama repo.

## Langkah 3: Terbitkan laman (pilih satu)

**A. GitHub Pages (paling mudah)**
- Repo → **Settings → Pages** → Source: **Deploy from a branch** → Branch: **main**, folder **/ (root)** → **Save**.
- Selepas 1 hingga 2 minit, laman berada di `https://NAMA-ANDA.github.io/sss-muzik/`.

**B. Vercel**
- **vercel.com** → log masuk dengan GitHub → **Add New → Project** → pilih repo → Framework Preset: **Other** → **Deploy**.

**C. Netlify**
- **Add new site → Import an existing project → GitHub** → pilih repo → **Deploy**. Laman ini statik, jadi Netlify Functions tidak digunakan lagi.

## Langkah 4: Benarkan domain laman dalam Firebase (WAJIB)

Firebase → **Authentication → Settings → Authorized domains → Add domain**, kemudian masukkan domain laman tanpa `https://`:
- GitHub Pages: `nama-anda.github.io`
- Vercel: `sss-muzik.vercel.app` (atau domain yang diberi)
- Netlify: `nama-laman.netlify.app`

Jika langkah ini terlepas, log masuk akan gagal dengan mesej "Domain laman ini belum dibenarkan".

---

## Pindah data dari sistem Netlify lama

1. Buka **sistem lama** → **Lagi… → Simpan sandaran (.json)**.
2. Buka **sistem baharu** → log masuk → **Lagi… → Pulihkan dari sandaran** → pilih fail .json tadi.
   - Semua calon, markah, ulasan, negeri, kehadiran dan **foto profil** akan dipindahkan.
   - Foto dan video di bahagian **Media** **tidak** termasuk dalam sandaran. Muat turun yang penting dari sistem lama (buka media → **Muat turun**) sebelum laman lama ditutup.

## Video (pilihan)

Foto disimpan terus dalam Firestore (percuma). **Video** memerlukan **Firebase Storage**, dan Google mewajibkan **pelan Blaze** (perlu kad bank) untuk Storage. Masih ada kuota percuma: 5 GB jika bucket di lokasi **US-CENTRAL1 / US-EAST1 / US-WEST1**.

1. Firebase → **Upgrade → Blaze**. Tetapkan **Budget alert** (cth: RM5) di Google Cloud Billing supaya anda dimaklumkan jika ada caj.
2. **Build → Storage → Get started** → lokasi **us-central1** → tab **Rules** → tampal isi fail `storage.rules` → **Publish**.
3. Dalam `firebase-config.js`, tukar `window.GUNA_STORAGE = false;` kepada `true`, kemudian commit ke GitHub.

## Kuota percuma Firestore (pelan Spark)

- 1 GiB data, **50,000 bacaan sehari**, 20,000 tulisan sehari.
- Setiap kali sistem dibuka pada satu peranti, semua rekod calon dibaca sekali (cth: 1,500 calon = 1,500 bacaan). Selepas itu hanya perubahan yang dibaca.
- Foto profil disimpan dalam cache peranti, jadi ia dimuat turun sekali sahaja bagi setiap peranti.
- Jika kuota harian habis, sistem memaparkan mesej kuota dan kuota pulih keesokan harinya. Pelan Blaze menghapuskan had ini (kosnya sangat rendah untuk kegunaan sekolah).

## Kemas kini sistem kemudian

Ganti `index.html` di GitHub (**Add file → Upload files**). GitHub Pages, Vercel atau Netlify akan menerbitkan semula secara automatik. **Data di Firebase tidak terjejas.** Jangan ganti `firebase-config.js` dengan versi kosong.
