'use strict';

require('dotenv').config();

const Koa         = require('koa');
const cors        = require('koa-cors');
const http        = require('http');
const convert     = require('koa-convert');
const socketIo    = require('socket.io');
const compress    = require('koa-compress');
const bodyParser  = require('koa-bodyparser');
const formidable  = require('koa2-formidable');

const jwt          = require('./middlewares/jwt');
const errorHandler = require('./middlewares/error-handler');

const env         = process.env.NODE_ENV || 'development';
const db          = require('./models');
const config      = require('./config')[env];
const router      = require('./routers');

const app = new Koa();

app
  .use(jwt)
  .use(convert(cors()))
  .use(formidable({
    uploadDir: __dirname + '/uploads', // directory where files will be uploaded
    keepExtensions: true, // keep file extension on upload
    multiples: true,
  }))
  .use(bodyParser())
  .use(errorHandler)
  .use(router.routes())
  .use(router.allowedMethods())
  .use(compress());

var server = http.createServer(app.callback());
const io = socketIo(server);
io.on('connection', function(client){ });

server.listen(config.PORT, function () {
  console.log('Groopy API server up and running!');
});