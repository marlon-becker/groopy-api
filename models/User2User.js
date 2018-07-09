'use strict';

module.exports = mongoose => {
  var User2UserSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    user_connection: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    status: { type: String, default: 'pending' },
    created_at: {
      type: Date,
      default: Date.now()
    }
  });

  User2UserSchema.statics.addUserConnection = async function(
    user,
    userConnection
  ) {
    return await this.create({
      user,
      user_connection: userConnection
    });
  };

  let User2User = mongoose.model('User2User', User2UserSchema);
  for (let method in User2UserSchema.statics)
    User2UserSchema.statics[method].bind(User2User);
  return User2User;
};
