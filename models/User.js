'use strict';

module.exports = mongoose => {
  var UserSchema = mongoose.Schema({
    email: { type: mongoose.SchemaTypes.Email, unique: true, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, required: true, default: 'subscriber' }, //Super admin | admin | editor | author | contributor
    status: { type: String, default: 'active' }, //Super admin | admin | editor | author | contributor
    avatar: { type: String },
    created_at: { type: Date, default: Date.now() }
  });

  UserSchema.statics.createUser = async function(data) {
    return await this.create({
      email: data.email,
      password: data.password,
      name: data.name,
      avatar: data.avatar
    });
  };

  UserSchema.statics.signIn = async function(data) {
    return await this.create({
      email: data.email,
      password: data.password,
      name: data.name
    });
  };

  UserSchema.statics.findOneById = async function(id) {
    return await this.findOne({ _id: id });
  };

  let User = mongoose.model('User', UserSchema);
  for (let method in UserSchema.statics) UserSchema.statics[method].bind(User);

  User.findAll = function() {
    return User.find().select('email name');
  };

  return User;
};
