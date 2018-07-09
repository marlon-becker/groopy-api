const fileController = require('../controllers/file.controller');
module.exports = {
  routes: [
    {
      method: 'post',
      url: '/uploads/file',
      controller: fileController.uploadFile,
      public: false
    }
  ]
};
