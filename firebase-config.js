// ============================================================
//  TETAPAN FIREBASE — isi dengan maklumat projek Firebase anda
//  Firebase console > Project settings (ikon gear) > General >
//  "Your apps" > Web app > SDK setup and configuration > Config
// ============================================================
window.FIREBASE_CONFIG = {
  apiKey: "ISI_API_KEY",
  authDomain: "ISI_PROJECT_ID.firebaseapp.com",
  projectId: "ISI_PROJECT_ID",
  storageBucket: "ISI_PROJECT_ID.firebasestorage.app",
  messagingSenderId: "ISI",
  appId: "ISI"
};

// Simpanan VIDEO memerlukan Firebase Storage (pelan Blaze, ada kuota percuma).
// Tukar kepada true HANYA selepas Storage diaktifkan. Jika false, foto tetap
// boleh disimpan (dalam Firestore) tetapi butang video disembunyikan.
window.GUNA_STORAGE = false;
