'use strict';

require('dotenv').config();

const Koa = require('koa');
const http = require('http');
const cors = require('koa-cors');
const socketIo = require('socket.io');
const convert = require('koa-convert');
const compress = require('koa-compress');
const bodyParser = require('koa-bodyparser');
const formidable = require('koa2-formidable');
const socketIoAuth = require('socketio-jwt-auth');

const jwt = require('./middlewares/jwt');
const errorHandler = require('./middlewares/error-handler');

const db = require('./models');
const router = require('./routers');

const app = new Koa();

app
  .use(jwt)
  .use(convert(cors()))
  .use(
    formidable({
      uploadDir: __dirname + '/uploads', // directory where files will be uploaded
      keepExtensions: true, // keep file extension on upload
      multiples: true
    })
  )
  .use(bodyParser())
  .use(errorHandler)
  .use(router.routes())
  .use(router.allowedMethods())
  .use(compress());

var server = http.createServer(app.callback());
const io = socketIo(server);

const chatController = require('./controllers/chat.controller');
const pollController = require('./controllers/poll.plugin.controller');

// using middleware
io.use(
  socketIoAuth.authenticate(
    {
      secret: process.env.JWT_SECRET // required, used to verify the token's signature
    },
    function (payload, done) {
      if (payload && payload.data.email) {
        db.User.findOne({ email: payload.data.email }, function (err, user) {
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(null, false, 'User does not exist');
          }
          return done(null, user);
        });
      } else {
        return done(); // in your connection handler user.logged_in will be false
      }
    }
  )
);
io.on('connection', function (client) {
  client.on('connectUser', chatController.handleConnect);
  client.on('join', chatController.handleJoin);
  client.on('leave', chatController.handleLeave);
  client.on('votePoll', chatController.handlePollVote);
  client.on('closePoll', chatController.handlePollClose);
  client.on('addToGroupTimeline', chatController.handleAddToGroupTimeline);
  client.on('getCurrentGroupMessages', chatController.getCurrentGroupMessages);
  client.on('getCurrentGroupUsers', chatController.getCurrentGroupUsers);
  client.on('availableUsers', chatController.handleGetAvailableUsers);
  client.on('disconnect', chatController.handleDisconnect);

  client.on('error', function (err) {
    console.log('received error from client:', client.id);
    console.log(err);
  });
  console.log('connected!');
});

server.listen(process.env.PORT);
