'use strict';

const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);

const models = {};

const mongoose = require('mongoose');
require('mongoose-type-email');

mongoose.connect(`mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`);

const db = mongoose.connection;

// eslint-disable-next-line
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  // eslint-disable-next-line
  console.log('Groopy DB ready!');
});

//Gets a list of models from models folder an makes them accessible exporting them
fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach(file => {
    var model = require(path.join(__dirname, file));
    model.stat;
    models[file.replace('.js', '')] = model(mongoose);
  });

module.exports = models;
