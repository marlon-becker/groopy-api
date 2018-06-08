const models = require('../models');
const roles = require('../config/roles');

const addMessage = async ctx => {
  const chat = models.Chat.findOne({_id: ctx.params.id});

  const textData = {
    text: ctx.request.body.text,
    user: ctx.user,
  }

  const message = await models.Message.create(textData);
  models.Chat.addMessage(ctx.params.id, message);
  ctx.body = message;
  ctx.status = 201;
}

const handleMessage = async (message, group) => {
    console.log('New message!', message, group);
}

const handleJoin = async (group) => {
    console.log('Joining a group!', group);
}

const handleLeave = async (message, group) => {
  console.log('Leaving a group!', group);
}

const handleGetAvailableUsers = async (group) => {
  console.log('Checking all the messages a group!', group);
}

const handleDisconnect = async (group) => {
  console.log('Disconnect!', group);
}

module.exports = {
  addMessage,
  handleMessage,
  handleJoin,
  handleLeave,
  handleGetAvailableUsers,
  handleDisconnect,
};
