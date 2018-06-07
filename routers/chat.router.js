const chatController = require('../controllers/chat.controller');
module.exports = {
  routes: [
    { method: 'post', url:'/chats/:id/messages', controller: chatController.addMessage, public: false },
  ]
};
