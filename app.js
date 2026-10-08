// ===========================================================================
// Tugas 1 - RESTful API Express.js (Refactor arsitektur terstruktur)
// Nama    : M. Rizki Algipari
// NIM     : 2428240069
// Kelas   : SI5B
// Topik 14: Galeri Seni - Lukisan
// Resource: /paintings
// ===========================================================================

// Muat variabel lingkungan dari .env (harus paling awal).
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { logger } = require("./middlewares/logger");
const paintingsRoutes = require("./routes/paintingsRoutes");
const { notFound, errorHandler } = require("./middlewares/errorHandler");

// Membuat instance aplikasi Express.
const app = express();

// Middleware global: CORS, parsing JSON, dan pencatat log.
app.use(cors());
app.use(express.json());
app.use(logger);

// GET / — informasi API.
app.get("/", (req, res) => {
  res.status(200).json({
    nama: "M. Rizki Algipari",
    nim: "2428240069",
    kelas: "SI5B",
    topik: "Topik 14 - Galeri Seni: Lukisan",
    resource: "/paintings",
    endpoints: [
      "GET /",
      "GET /paintings",
      "GET /paintings/:id",
      "GET /paintings?aliran=<aliran>",
      "POST /paintings (x-api-key)",
      "PUT /paintings/:id (x-api-key)",
      "DELETE /paintings/:id (x-api-key)",
    ],
  });
});

// Route resource /paintings.
app.use("/paintings", paintingsRoutes);

// Catch-all 404 untuk endpoint tak dikenal.
app.use(notFound);

// Error handler terpusat (paling bawah).
app.use(errorHandler);

// Menjalankan server hanya di luar mode production (mis. Vercel).
const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
  });
}

// Ekspor app agar bisa dipakai Vercel (serverless) dan pengujian.
module.exports = app;
