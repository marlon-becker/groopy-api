const models = require('../models');
const env         = process.env.NODE_ENV || 'development';
const config      = require('../config')[env];
const roles = require('../config/roles');

const getAll = async (ctx) => {
  ctx.body = await models.Group.find({});
};

const create = async (ctx) => {

  const { files } = ctx.request;
  const avatarUrl = files ? await upload(files.avatar) : config.DEFAULT_AVATAR;

  const groupData = {
    name: ctx.request.body.name,
    description: ctx.request.body.description,
    type: ctx.request.body.type,
    avatar: avatarUrl,
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
