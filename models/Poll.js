'use strict';

module.exports = mongoose => {
  var PollSchema = mongoose.Schema({
    name: { type: String },
    user: { type: String },
    group: { type: String },
    questions: { type: Array, default: [] },
    responses: { type: Array, default: [] },
    status: { type: String, default: 'active' }
  });

  PollSchema.statics.findAll = async function() {
    return await this.find();
  };

  PollSchema.statics.findOneById = async function(id) {
    return await this.findOne({ _id: id });
  };

  PollSchema.statics.createPoll = async function(group, user, questions) {
    return await this.create({
      group,
      user,
      questions,
      responses: []
    });
  };

  PollSchema.statics.addResponse = async function(id, userId, response) {
    const poll = await this.find({ _id: id });
    const responses = poll.responses ? poll.responses : [];
    responses.push({ userId, response });

    return await this.update({ _id: id }, { $push: { responses } });
  };

  PollSchema.statics.closePoll = async function(id) {
    await this.update({ _id: id }, { status: 'closed' });
    return await this.find({ _id: id });
  };

  let Poll = mongoose.model('Poll', PollSchema);
  for (let method in PollSchema.statics) PollSchema.statics[method].bind(Poll);
  return Poll;
};
