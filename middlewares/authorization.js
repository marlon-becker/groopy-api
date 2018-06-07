const models = require('../models');

const authorize = async (ctx, next) => {
  const email = ctx.auth.email;
  if (!email) return await next();

  ctx.user = await models.User.findOne({email});

  if (!ctx.user) {
    ctx.status = 401;
    return;
  }

  await next();
};

module.exports = authorize;
