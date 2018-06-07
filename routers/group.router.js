const groupController = require('../controllers/group.controller');
module.exports = {
  routes: [
    { method: 'get', url: '/groups', controller: groupController.getAll, public: false },
    { method: 'post', url: '/groups', controller: groupController.create, public: false },
  ]
};
