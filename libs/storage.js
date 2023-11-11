const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './storage');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = path.extname(file.originalname).toLowerCase();
    cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedFileExtensions = ['.png', '.jpg', '.jpeg', '.pdf'];

  const fileExtension = path.extname(file.originalname).toLowerCase();
  if (allowedFileExtensions.includes(fileExtension)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PNG, JPG, JPEG, and PDF files are allowed.'));
  }
};

const upload = multer({ storage, fileFilter }).fields([{name: "imgUrl"}, {name:"imgUrl2"}]);

module.exports = upload;