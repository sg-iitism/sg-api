const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const otherMemberSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      titlecase: true,
    },
    branch: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
otherMemberSchema.plugin(toJSON);

/**
 * @typedef OtherMember
 */
const OtherMember = mongoose.model('OtherMember', otherMemberSchema);

module.exports = OtherMember;
