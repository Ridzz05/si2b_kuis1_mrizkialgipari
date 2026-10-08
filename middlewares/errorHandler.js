// Penanganan endpoint tak dikenal dan error terpusat.

// Catch-all 404: semua rute yang tidak cocok.
function notFound(req, res) {
  res.status(404).json({
    status: "error",
    message: "Endpoint tidak ditemukan",
    data: null,
  });
}

// Error handler terpusat (4 argumen agar dikenali Express sebagai error handler).
function errorHandler(err, req, res, next) {
  // JSON rusak yang dilempar express.json().
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      status: "error",
      message: "Format JSON tidak valid",
      data: null,
    });
  }

  console.error(err.stack);
  res.status(500).json({
    status: "error",
    message: "Terjadi kesalahan pada server",
    data: null,
  });
}

module.exports = { notFound, errorHandler };
