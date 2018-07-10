const jwt = require('jsonwebtoken');

module.exports = async (ctx, next) => {
  if (ctx.request.header.authorization) {
    const token = ctx.request.header.authorization.split('Bearer ');
    if (Array.isArray(token) && token.length > 1) {
      const tokenData = await new Promise((resolve, reject) => {
        jwt.verify(token[1], process.env.JWT_SECRET, function(err, decoded) {
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
        exp: Math.floor(Date.now() / 1000) + process.env.JWT_AUTH_LIFETIME,
        data: {
          email: ctx.signInUser.email
        }
      },
      process.env.JWT_SECRET
    );
    if (ctx.body) ctx.body.token = token;
    else ctx.body = { token };
  }
};
