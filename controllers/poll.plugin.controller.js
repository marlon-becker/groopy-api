const atob = require('atob');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const models = require('../models');
const env = process.env.NODE_ENV || 'development';
const config = require('../config')[env];
const upload = require('../services/upload.service');

const getAll = async ctx => {
  ctx.body = await models.Poll.findAll();
};

const create = async ctx => {
  const questions = [];
  for (var i = 1; i <= ctx.request.body.options; i++) {
    questions.push({
      photo: ctx.request.body[`pollImage_${i}`],
      title: ctx.request.body[`pollTitle_${i}`],
      number: i
    });
  }
  ctx.body = await models.Poll.createPoll(
    ctx.request.body.groupId,
    ctx.user._id,
    questions
  );
  ctx.status = 201;
};

const update = async ctx => {
  const userId = ctx.user._id;
  const pollId = ctx.request.body.pollId;
  const option = ctx.request.body.option;

  ctx.body = await models.Poll.addResponse(pollId, userId, option);
};

const closePoll = async ctx => {
  const userId = ctx.user._id;
  const pollId = ctx.request.body.pollId;
  ctx.body = await models.Poll.closePoll(pollId);
};

const load = async ctx => {
  const poll = await models.Poll.findOneById(ctx.params.id);
  poll.user = await models.User.findOneById(poll.user);
  poll.group = await models.Group.findOneById(poll.group);
  ctx.body = poll;
};

module.exports = {
  create,
  update,
  load,
  closePoll
};
