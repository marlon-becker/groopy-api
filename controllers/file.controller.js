const uploadToCDN = require('../services/upload');

const uploadFile = async (ctx) => {
  const { files } = ctx.request;
  const fileUrl = await uploadToCDN(files.file);
  console.log('response!', fileUrl);
  const message = {file: fileUrl}
  ctx.body = message;
  ctx.status = 200;
}

module.exports = {
  uploadFile,
};
