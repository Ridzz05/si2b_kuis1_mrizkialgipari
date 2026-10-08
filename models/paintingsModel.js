// Model data lukisan (galeri seni) — disimpan di memori, tanpa database.

// Data awal: tiga lukisan.
const paintings = [
  {
    id: 1,
    judul: "Senja di Musi",
    pelukis: "Rahmat Hidayat",
    aliran: "realisme",
    tahunDibuat: 2023,
    harga: 7500000,
  },
  {
    id: 2,
    judul: "Tari Cahaya Pagi",
    pelukis: "Siti Nurhaliza",
    aliran: "impresionisme",
    tahunDibuat: 2021,
    harga: 5200000,
  },
  {
    id: 3,
    judul: "Bentuk Tanpa Nama",
    pelukis: "Bagas Prasetyo",
    aliran: "abstrak",
    tahunDibuat: 2024,
    harga: 9800000,
  },
];

// Penomoran id otomatis untuk data baru.
let nextId = 4;

// Ambil semua lukisan; bila aliran dikirim, filter berdasarkan nilai query.
function getAllPaintings(aliran) {
  if (aliran) {
    return paintings.filter((p) => p.aliran === aliran);
  }
  return paintings;
}

// Ambil satu lukisan berdasarkan id; null bila tidak ada.
function getPaintingById(id) {
  return paintings.find((p) => p.id === id) || null;
}

// Tambah lukisan baru; id dibuat otomatis, tahunDibuat menjadi null bila tidak dikirim.
function createPainting(data) {
  const lukisanBaru = {
    id: nextId,
    judul: data.judul,
    pelukis: data.pelukis,
    aliran: data.aliran,
    tahunDibuat: data.tahunDibuat ?? null,
    harga: data.harga,
  };
  paintings.push(lukisanBaru);
  nextId++;
  return lukisanBaru;
}

// Perbarui seluruh field (kecuali id); null bila id tidak ditemukan.
function updatePainting(id, data) {
  const index = paintings.findIndex((p) => p.id === id);
  if (index === -1) {
    return null;
  }
  const lukisanDiperbarui = {
    id,
    judul: data.judul,
    pelukis: data.pelukis,
    aliran: data.aliran,
    tahunDibuat: data.tahunDibuat ?? null,
    harga: data.harga,
  };
  paintings[index] = lukisanDiperbarui;
  return lukisanDiperbarui;
}

// Hapus lukisan; null bila id tidak ditemukan.
function deletePainting(id) {
  const index = paintings.findIndex((p) => p.id === id);
  if (index === -1) {
    return null;
  }
  const [terhapus] = paintings.splice(index, 1);
  return terhapus;
}

module.exports = {
  getAllPaintings,
  getPaintingById,
  createPainting,
  updatePainting,
  deletePainting,
};
