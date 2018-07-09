const models = require('../models');

const addMessage = async ctx => {
  const chat = await models.Chat.findOne({ _id: ctx.params.id });

  const textData = {
    text: ctx.request.body.text,
    user: ctx.user
  };

  const message = await models.Message.create(textData);
  models.Chat.addMessage(ctx.params.id, message);
  ctx.body = message;
  ctx.status = 201;
};

const groupsConnections = {};
const groupsMessages = {};
const usersConnected = {};

const getMessages = async ctx => {
  const messages = models.Message.find({ _id: ctx.params.id });
  ctx.body = messages;
};

const getChat = async ctx => {
  const chat = models.Chat.find({ _id: ctx.params.id });
  ctx.body = chat;
};

const handleAddToGroupTimeline = async function(message, type, groupId) {
  if (!groupsMessages.hasOwnProperty(groupId)) {
    groupsMessages[groupId] = [];
  }

  groupsMessages[groupId].push({
    message,
    _id: this.request.user._id,
    name: this.request.user.name,
    avatar: this.request.user.avatar,
    type: type,
    date: Date.now()
  });

  groupsConnections[groupId].map(m => {
    if (usersConnected[m]) {
      usersConnected[m].socket.emit('messages', groupsMessages[groupId]);
    }
  });
};

const getCurrentGroupMessages = async function(groupId) {
  if (groupsMessages.hasOwnProperty(groupId)) {
    this.emit('messages', groupsMessages[groupId]);
  } else {
    this.emit('messages', []);
  }
};

const getCurrentGroupUsers = async function(groupId) {
  const groupUsers = await models.User2Group.find({ group: groupId });
  const users = [];
  for (let i = 0; i < groupUsers.length; i++) {
    const id = groupUsers[i].user;
    let user = await models.User.findOne({ _id: id });

    if (usersConnected.hasOwnProperty(user._id) && usersConnected[user._id]) {
      user['status'] = 'connected';
    } else {
      user['status'] = 'disconnected';
    }
    users.push(user);
  }
  this.emit('updateGroupUsers', users);
};

const handleConnect = async function(userId) {
  console.log('user id');
  usersConnected[userId] = { socket: this, date: Date.now() };
  console.log('CONNECTED USERS', usersConnected);
};

const handleJoin = async function(userId, groupId) {
  console.log(groupId);
  if (!groupsConnections.hasOwnProperty(groupId)) {
    groupsConnections[groupId] = [];
  }
  if (!groupsConnections[groupId].includes(userId)) {
    groupsConnections[groupId].push(userId);
  }
};

const handleLeave = async function(message, userId) {};

const handleGetAvailableUsers = async function(group) {
  console.log('Checking all the messages a group!', group);
};

const handleDisconnect = async function() {
  for (let userId in usersConnected) {
    if (usersConnected[userId].socket.id == this.id) {
      usersConnected[userId] = null;
    }
  }
};

const handlePollClose = async function(groupId, pollId) {
  if (groupsMessages.hasOwnProperty(groupId)) {
    groupsMessages[groupId].map((message, key) => {
      if (message.type == 'poll') {
        message.message.status = 'closed';
      }
    });
    this.emit('messages', groupsMessages[groupId]);
  }
};

const handlePollVote = async function(userId, groupId, pollId) {
  if (groupsMessages.hasOwnProperty(groupId)) {
    groupsMessages[groupId].map((message, key) => {
      if (message.type == 'poll') {
        if (!message.voters) message.voters = {};
        message.voters[userId] = true;
      }
      groupsMessages[groupId][key] = Object.assign({}, message);
    });
    this.emit('messages', groupsMessages[groupId]);
  }
};

module.exports = {
  addMessage,
  handleAddToGroupTimeline,
  handleJoin,
  handleLeave,
  handleConnect,
  handleGetAvailableUsers,
  getCurrentGroupMessages,
  getCurrentGroupUsers,
  handleDisconnect,
  getMessages,
  getChat,
  handlePollClose,
  handlePollVote
};
