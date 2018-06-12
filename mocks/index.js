'use strict';

const models          = require('../models');
const users           = require('./users.js');
const groups          = require('./groups.js');
const connections     = require('./connections.js');
const userController  = require('../controllers/user.controller');
const groupController = require('../controllers/group.controller');
const mongoose        = require('mongoose');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
  await models.User.remove({});
  await models.Group.remove({});
  await models.Chat.remove({});
  await models.Message.remove({});
  await models.User.remove({});
  await models.User2Group.remove({});
  await models.User2User.remove({});

  //Create new USERS
  await users.forEach(async (user) => {
    const data = {
      avatarUrl: 'https://s3.eu-west-3.amazonaws.com/groopy/'+user.avatar,
      request: {
        body: {
          email: user.email,
          password: user.password,
          name: user.name,
        }
      },
    }
    console.log(`Creating ${user.name}...`);
    await userController.create(data);
  });

  await sleep(1000);

  //Create new GROUPS
  await groups.forEach(async (group) => {
    const admin = await models.User.findOne({ email: group.admins[0] });

    const data = {
      user: admin,
      avatarUrl: 'https://s3.eu-west-3.amazonaws.com/groopy/'+group.avatar,
      request: {
        body: {
          name: group.name,
          description: group.description,
          type: group.type,
        }
      },
    }
    console.log(`Creating ${group.name}...`);
    await groupController.create(data);
    await sleep(300);
    const newGroup = await models.Group.findOne({name: group.name});
    await group.users.forEach(async (user) => {
      const userForGroup = await models.User.findOne({email: user});
      await models.User2Group.addUserToGroup(userForGroup, newGroup, 'subscriber');
    });
  });

  await sleep(1000);
  //Create new CONNECTIONS
  for(let prop in connections) {
    await connections[prop].forEach(async (user) => {
      const userConnection = await models.User.findOne({email: user});
      await connections[prop].forEach(async (user2) => {
        if (user2 != user) {
          const userConnected = await models.User.findOne({email: user2});
          const data = {
            user: userConnection,
            request: {
              body: {
                connectionId: userConnected._id,
              }
            },
          }
          console.log(`Creating user connection ${userConnection.name} > ${userConnected.name} ...`);
          await userController.addConnection(data);
        }
      });
    })
  };
  await sleep(1000);

   mongoose.connection.close();

})();
