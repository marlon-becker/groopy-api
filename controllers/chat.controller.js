const models = require('../models');
const roles = require('../config/roles');


const addMessage = async (ctx) => {
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

module.exports = {
  addMessage,
};
