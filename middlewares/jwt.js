const jwt = require('jsonwebtoken');
const env = process.env.NODE_ENV || 'development';
const config = require('../config')[env];

module.exports = async (ctx, next) => {
  if (ctx.request.header.authorization) {
    const token = ctx.request.header.authorization.split('Bearer ');
    if (Array.isArray(token) && token.length > 1) {
      const tokenData = await new Promise((resolve, reject) => {
        jwt.verify(token[1], config.JWT_SECRET, function(err, decoded) {
          if (err) reject(err);
          resolve(decoded);
        });
      }).catch(e => {});
      if (tokenData) ctx.auth = { email: tokenData.data.email };
    }
  }

  await next();

  if (ctx.signInUser) {
    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + config.JWT_AUTH_LIFETIME,
        data: {
          email: ctx.signInUser.email
        }
      },
      config.JWT_SECRET
    );
    if (ctx.body) ctx.body.token = token;
    else ctx.body = { token };
  }
};
