const Router    = require("koa-router");
const jwt       = require('koa-jwt');
const fs        = require('fs');
const path      = require('path');

const env       = process.env.NODE_ENV || 'development';
const basename  = path.basename(__filename);
const config    = require('../config')[env];
const authorizationMiddleware = require('../middlewares/authorization');

const router    = new Router();

const publicRoutes = [];
const privateRoutes = [];

//Gets a list of routers and load all the routes needed for every model
fs.readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var modelRouter = require(path.join(__dirname, file));

    //Add all the public routes to an array to be able to exclude them from JWT auth
    modelRouter.routes.forEach((routeData) => {
      if (routeData['public'] === true) {
        publicRoutes.push(routeData);
      } else {
        privateRoutes.push(routeData);
      }
    });
  });

//Add all PUBLIC routes before JWT auth
publicRoutes.forEach((routeData) => {
  router[routeData.method](routeData.url, routeData.controller);
});

//Add JWT auth excluding public urls
router.use(jwt({ secret: config.JWT_SECRET }));

//Add all PRIVATE routes
privateRoutes.forEach((routeData) => {
  router[routeData.method](routeData.url, authorizationMiddleware, routeData.controller);
});

module.exports = router;
