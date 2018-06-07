'use strict';

module.exports = (mongoose) => {
  var MessageSchema = mongoose.Schema({
     user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
     text: { type: String },
     status: { type: String, default: 'created' },
     created_at: { type: String },
  });

  MessageSchema.statics.createMessage = async function (data) {
    return await this.create({
      user: data.user,
      text: data.text,
    });
  }

  MessageSchema.statics.removeMessage = async function (data) {
    return await this.deleteOne({
      _id: data.id
    });
  }

  let Message = mongoose.model('Message', MessageSchema);
  for(let method in MessageSchema.statics) MessageSchema.statics[method].bind(Message);
  return Message;
};
