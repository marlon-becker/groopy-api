'use strict';

module.exports = (mongoose) => {
  var GroupSchema = mongoose.Schema({
     name:  { type: String, required: true },
     description: { type: String, required: true },
     type: { type: String, required: true },
     status: { type: String, required: true, default: 'new' },
     created_at: { type: Date, default: Date.now() },
  });

  //File cycle of a group
  // NEW
  // PREVENT
  // EVENT
  // POSTEVENT
  // CLOSED

  GroupSchema.statics.findAll = async function () {
    return await this.find({}).select('name, description');
  }

  GroupSchema.statics.createGroup = async function (data) {
    return await this.create({
      name: data.name,
      description: data.description,
      type: data.type
    });
  }

  GroupSchema.statics.removeGroup = async function (data) {
    return await this.deleteOne({
      _id: data.id
    });
  }

  let Group = mongoose.model('Group', GroupSchema);
  for(let method in GroupSchema.statics) GroupSchema.statics[method].bind(Group);
  return Group;
};
