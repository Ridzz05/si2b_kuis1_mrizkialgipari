// Controller resource /paintings: validasi body lalu panggil model.
const model = require("../models/paintingsModel");

// Validasi body lukisan; mengembalikan pesan error atau null bila valid.
function validasiLukisan(body) {
  const fieldString = ["judul", "pelukis", "aliran"];

  for (const field of fieldString) {
    if (typeof body[field] !== "string" || body[field].trim() === "") {
      return `Field ${field} wajib diisi`;
    }
  }

  if (typeof body.harga !== "number" || Number.isNaN(body.harga)) {
    return "Field harga wajib diisi dan harus berupa angka";
  }

  if (
    body.tahunDibuat !== undefined &&
    body.tahunDibuat !== null &&
    (typeof body.tahunDibuat !== "number" || Number.isNaN(body.tahunDibuat))
  ) {
    return "Field tahunDibuat harus berupa angka";
  }

  return null;
}

// GET /paintings — semua data (dengan filter aliran bila ada).
function getAll(req, res) {
  res.status(200).json(model.getAllPaintings(req.query.aliran));
}

// GET /paintings/:id — satu data; 404 bila tidak ditemukan.
function getById(req, res) {
  const id = Number(req.params.id);
  const lukisan = model.getPaintingById(id);

  if (!lukisan) {
    return res.status(404).json({
      status: "error",
      message: `Data dengan id ${req.params.id} tidak ditemukan`,
      data: null,
    });
  }

  res.status(200).json(lukisan);
}

// POST /paintings — tambah data; 400 bila body tidak valid, 201 bila sukses.
function create(req, res) {
  const pesanError = validasiLukisan(req.body);

  if (pesanError) {
    return res.status(400).json({
      status: "error",
      message: pesanError,
      data: null,
    });
  }

  const lukisanBaru = model.createPainting(req.body);

  res.status(201).json({
    status: "success",
    message: "Data berhasil ditambahkan",
    data: lukisanBaru,
  });
}

// PUT /paintings/:id — perbarui data; 404 lalu 400, 200 bila sukses.
function update(req, res) {
  const id = Number(req.params.id);

  if (!model.getPaintingById(id)) {
    return res.status(404).json({
      status: "error",
      message: `Data dengan id ${req.params.id} tidak ditemukan`,
      data: null,
    });
  }

  const pesanError = validasiLukisan(req.body);

  if (pesanError) {
    return res.status(400).json({
      status: "error",
      message: pesanError,
      data: null,
    });
  }

  const lukisanDiperbarui = model.updatePainting(id, req.body);

  res.status(200).json({
    status: "success",
    message: `Data lukisan dengan id ${id} berhasil diperbarui`,
    data: lukisanDiperbarui,
  });
}

// DELETE /paintings/:id — hapus data; 404 bila tidak ada, 204 tanpa isi.
function remove(req, res) {
  const id = Number(req.params.id);
  const terhapus = model.deletePainting(id);

  if (!terhapus) {
    return res.status(404).json({
      status: "error",
      message: `Data dengan id ${req.params.id} tidak ditemukan`,
      data: null,
    });
  }

  res.status(204).end();
}

module.exports = { getAll, getById, create, update, remove };
