'use strict';

module.exports = (mongoose) => {
  var User2GroupSchema = mongoose.Schema({
     user:  { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
     group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
     role: { type: String, required: true },
     created_at: { type: Date, default: Date.now() },
  });

  User2GroupSchema.statics.addUserToGroup = async function (user, group, role) {
    return await this.create({
      user,
      group,
      role: role
    });
  }

  User2GroupSchema.statics.removeUserFromGroup = async function (user, group) {
    return await this.deleteOne({
      user,
      group
    });
  }

  User2GroupSchema.statics.changeUserRole = async function (user, group, role = 'standard') {
    return await this.findOneAndUpdate({ user, group }, {role});
  }

  let User2Group = mongoose.model('User2Group', User2GroupSchema);
  for(let method in User2GroupSchema.statics) User2GroupSchema.statics[method].bind(User2Group);
  return User2Group;
};
