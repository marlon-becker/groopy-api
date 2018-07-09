const models = require('../models');
const env = process.env.NODE_ENV || 'development';
const config = require('../config')[env];
const roles = require('../config/roles');
const upload = require('../services/upload.service');

const getAll = async ctx => {
  ctx.body = await models.Group.find({});
};

const create = async ctx => {
  const { files } = ctx.request;
  let avatarUrl =
    files && Object.keys(files) > 0
      ? await upload(files.avatar)
      : ctx.avatarUrl
        ? ctx.avatarUrl
        : config.DEFAULT_AVATAR;
  avatarUrl = ctx.request.body.image ? ctx.request.body.image : avatarUrl;

  const groupData = {
    name: ctx.request.body.name,
    description: ctx.request.body.description,
    type: ctx.request.body.type,
    avatar: avatarUrl
  };

  const group = await models.Group.createGroup(groupData);
  await models.User2Group.addUserToGroup(ctx.user, group, 'admin');
  await models.Chat.createChat(group);

  if (ctx.request.body.users) {
    await ctx.request.body.users.split(',').forEach(async id => {
      const userForGroup = await models.User.findOne({ _id: id });
      await models.User2Group.addUserToGroup(userForGroup, group, 'subscriber');
    });
  }

  ctx.body = group;
  ctx.status = 201;
};

module.exports = {
  getAll,
  create
};
