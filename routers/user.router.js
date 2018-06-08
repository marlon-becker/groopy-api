const userController = require('../controllers/user.controller');
module.exports = {
  routes: [
    { method: 'get', url: '/sign-in', controller: userController.signIn, public: true },
    { method: 'get', url: '/users', controller: userController.getAll, public: false },
    { method: 'post', url: '/users', controller: userController.create, public: false },
    { method: 'post', url: '/users/connection', controller: userController.addConnection, public: false },
    { method: 'get', url: '/users/active-groups', controller: userController.getActiveGroups, public: false },
    { method: 'get', url: '/users/connections', controller: userController.getConnections, public: false },
    { method: 'get', url: '/users/me', controller: userController.me, public: false },
  ]
};
