const chatController = require('../controllers/chat.controller');
module.exports = {
  routes: [
    {
      method: 'post',
      url: '/chats/:id/messages',
      controller: chatController.addMessage,
      public: false
    },
    {
      method: 'get',
      url: '/chats/:id/messages',
      controller: chatController.getMessages,
      public: false
    },
    {
      method: 'get',
      url: '/chats/:id',
      controller: chatController.getChat,
      public: false
    }
  ]
};
