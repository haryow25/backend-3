// import cloudinary uploader
const cloud = require('./cloudinary');

// fungsi menambah file
const uploadFile = async (req, res) => {
  // baca dari files, jika tidak ada, beri nilai []
  const file = req.files || [];

  // upload foto
  let fileURL = '';
  if (file.length) {
    try {
      fileURL = await cloud.upload(file[0]); // hanya upload 1 file
    } catch (err) {
      return res.status(500).json({
        message: 'Terjadi kesalahan.',
      });
    }
  }

  // berikan response sukses
  return res.status(201).json({
    message: 'Berhasil menambahkan gambar.',
    url: fileURL,
  });
};

module.exports = {
  uploadFile,
  
};
