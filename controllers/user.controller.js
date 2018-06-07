const atob        = require('atob');
const bcrypt      = require('bcrypt');
const mongoose    = require('mongoose');
const models      = require('../models');
const env         = process.env.NODE_ENV || 'development';
const config      = require('../config')[env];
const upload      = require('../services/upload');

const getAll = async ctx => {
  ctx.body = await models.User.findAll()
};

const create = async (ctx) => {
  const { files } = ctx.request;
  const avatarUrl = files ? await upload(files.avatar) : config.DEFAULT_AVATAR;
  const userData = {
    email: ctx.request.body.email,
    password: await bcrypt.hash(ctx.request.body.password, 10),
    name: ctx.request.body.name,
    avatar: avatarUrl
  }

  const user = await models.User.createUser(userData);
  ctx.body = user;
  ctx.status = 201;
}

const signIn = async (ctx) => {
  const authorization = atob(ctx.request.header.authorization.split(' ').pop());
  const [email, password] = authorization.split(':');
  let user = await models.User.findOne({email});
  let authorized = await bcrypt.compare(password, user.password);

  if (user && authorized) {
    ctx.signInUser = user;
    ctx.status = 200;
  } else {
    ctx.status = 401;
  }
}

const getActiveGroups = async (ctx) => {
  const User2Group = await models.User2Group.find(
    {user: ctx.user}
  );

  const groups = await models.Group.find({
    '_id': {
      $in: User2Group.reduce((acc, el) => {
        acc.push(mongoose.Types.ObjectId(el.group));
        return acc;
      }, [])
    }
  });

  ctx.body = groups;
  ctx.status = 201;
}

const addConnection = async (ctx) => {
  const connectionUserId = ctx.request.body.connectionId;

  const connectionUser = await models.User.findOne({ _id: connectionUserId});
  if(!connectionUser) throw new Error('User to connect does not exist');
  const existingConnection = await models.User2User.findOne(
    {
      user_connection: connectionUserId
    });
  if(existingConnection) throw new Error('User already has this connection');
  const connection = await models.User2User.addUserConnection(ctx.user, connectionUser);
  ctx.body = connection;
}

const getConnections = async (ctx) => {
  const connections = await models.User2User.find({ user: ctx.user });

  const users = await models.User.find({
    '_id': {
      $in: connections.reduce((acc, el) => {
        acc.push(mongoose.Types.ObjectId(el.user_connection));
        return acc;
      }, [])
    }
  })
  ctx.body = users;
}

module.exports = {
  getAll,
  create,
  signIn,
  getActiveGroups,
  addConnection,
  getConnections,
};
