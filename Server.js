const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// Atur direktori untuk menyimpan gambar yang diupload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Nama file unik
    }
});

const upload = multer({ storage: storage });

// Menangani form submission
app.post('/submit-laporan', upload.single('gambar_kebersihan'), (req, res) => {
    const { nama_karyawan, stasiun, pimpinan, tanggal } = req.body;
    const gambarPath = req.file.path; // Menyimpan path gambar yang diupload
    
    console.log(`Nama Karyawan: ${nama_karyawan}`);
    console.log(`Stasiun: ${stasiun}`);
    console.log(`Pimpinan: ${pimpinan}`);
    console.log(`Tanggal: ${tanggal}`);
    console.log(`Path Gambar: ${gambarPath}`);

    // Kirim respon setelah laporan diterima
    res.send('Laporan kebersihan berhasil disubmit!');
});

// Menyajikan HTML
app.use(express.static('public')); // Direktori tempat file HTML disimpan

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});