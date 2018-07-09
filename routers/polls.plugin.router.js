const pollController = require('../controllers/poll.plugin.controller');
module.exports = {
  routes: [
    {
      method: 'post',
      url: '/polls',
      controller: pollController.create,
      public: false
    },
    {
      method: 'put',
      url: '/polls',
      controller: pollController.update,
      public: false
    },
    {
      method: 'put',
      url: '/polls/close',
      controller: pollController.closePoll,
      public: false
    },
    {
      method: 'get',
      url: '/polls/:id',
      controller: pollController.load,
      public: false
    }
  ]
};
