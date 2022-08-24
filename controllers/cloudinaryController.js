// import cloudinary
const cloudinary = require('cloudinary').v2;

// ambil secret dari env
const cloudName = process.env.cloudinaryCloudName;
const apiKey = process.env.cloudinaryApiKey;
const apiSecret = process.env.cloudinarySecret;
const directory = 'upload';

// konfigurasi cloudinary
cloudinary.config({ 
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
  secure: true
});

// fungsi uploadStream cloudinary
const uploadStream = (filename, buffer) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
        {
          resource_type: 'raw',
          public_id: filename,
        },
        (error, result) => {
          if (error) {
            reject(error)
          }
          resolve(result)
        }
      )
      .end(buffer)
  })
};

// fungsi upload file
const upload = async (file) => {
  // ambil nama dan buffer
  const { originalname, buffer } = file;

  // upload 
  const result = await uploadStream(originalname, buffer);

  // beri balikan berupa alamat upload
  return result.secure_url;
};

module.exports = {
  upload,
}