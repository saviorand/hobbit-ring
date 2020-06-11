const s3 = require('./s3');
const config = require('./config');
const {
  S3Uploader,
  FilesystemUploader,
} = require('./lib/regular-uploaders');

const xmlUploader = new S3Uploader(s3, {
  baseKey: 'uploads',
  uploadParams: {
    CacheControl: 'max-age:31536000',
    ContentDisposition: 'inline',
  },
  filenameTransform: filename => filename,
});

const fsxmlUploader = new FilesystemUploader({ // (A)
  dir: config.app.storageDir, // (B)
  filenameTransform: filename => `${Date.now()}_${filename}`, // (C)
});

module.exports = { xmlUploader };