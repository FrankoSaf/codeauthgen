const multer = require('multer');
const cloudinary = require('../utils/cloudinary');
const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
  file.mimetype === 'image/jpeg' ||
  file.mimetype === 'image/png' ||
  file.mimetype === 'image/jpg'
    ? cb(null, true)
    : cb({ message: 'Unsupported file format' }, false);
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 2 },
  fileFilter: fileFilter,
});

module.exports = upload;
