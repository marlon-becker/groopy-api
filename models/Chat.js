'use strict';

module.exports = mongoose => {
  var ChatSchema = mongoose.Schema({
    group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }]
  });

  ChatSchema.statics.findAll = async function() {
    return await this.find({});
  };

  ChatSchema.statics.createChat = async function(group) {
    return await this.create({
      group
    });
  };

  ChatSchema.statics.removeChat = async function(data) {
    return await this.deleteOne({
      _id: data.id
    });
  };

  ChatSchema.statics.addMessage = async function(id, message) {
    return await this.update({ _id: id }, { $push: { messages: message } });
  };

  let Chat = mongoose.model('Chat', ChatSchema);
  for (let method in ChatSchema.statics) ChatSchema.statics[method].bind(Chat);
  return Chat;
};
