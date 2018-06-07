const models = require('../models');
const roles = require('../config/roles');

const getAll = async (ctx) => {
  ctx.body = await models.Group.find({})
};

const create = async (ctx) => {

  const groupData = {
    name: ctx.request.body.name,
    description: ctx.request.body.description,
    type: ctx.request.body.type,
  }

  const group = await models.Group.createGroup(groupData);
  await models.User2Group.addUserToGroup(ctx.user, group, 'admin');
  await models.Chat.createChat(group);

  ctx.body = group;
  ctx.status = 201;
}

module.exports = {
  getAll,
  create,
};
