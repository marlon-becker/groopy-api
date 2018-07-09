const aws = require('aws-sdk');
const mime = require('mime-types');
const formidable = require('formidable');
const readFilePromise = require('fs-readfile-promise');
const util = require('util');
const fs = require('fs');
const uuidv4 = require('uuid/v4');
const env = process.env.NODE_ENV || 'development';
const config = require('../config')[env];

const s3 = new aws.S3({
  version: 'latest',
  region: 'eu-west-3',
  accessKeyId: config.AWS_ACCESS_KEY,
  secretAccessKey: config.AWS_SECRET_ACCESS_KEY
});
const S3_BUCKET = config.S3_BUCKET;

module.exports = async file => {
  const imageData = await readFilePromise(file.path);
  const fileExtension = '.' + file.type.split('image/').pop();
  const fileName = uuidv4() + fileExtension;

  var params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Body: imageData,
    ContentType: 'image/jpeg',
    ACL: 'public-read'
  };
  var options = {
    partSize: 10 * 1024 * 1024,
    queueSize: 1
  };

  const result = s3
    .upload(params, options)
    .promise()
    .catch(e => console.log('ERROR', e));
  return config.S3_PUBLIC_URL + fileName;
};
