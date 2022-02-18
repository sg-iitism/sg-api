const mongoose = require('mongoose');
const { toJSON } = require('./plugins');
const contactSchema = require('./contact.model').schema;
const otherMembersSchema = require('./otherMembers.model').schema;

const senateSchema = mongoose.Schema(
  {
    _id: {
      type: String,
    },
    startYear: {
      type: Number,
      required: true,
    },
    endYear: {
      type: Number,
      required: true,
    },
    members: [contactSchema],
    otherMembers: [otherMembersSchema],
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    updatedBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

// combination of fest and year should be unique
senateSchema.index({ startYear: 1, endYear: 1 }, { unique: true });

// add plugin that converts mongoose to json
senateSchema.plugin(toJSON);

/**
 * Check if senate for a tenure exists already
 * @param {string} _startYear - Start year of tenure
 * @param {string} _endYear - End year of tenure
 * @returns {Promise<boolean>}
 */
senateSchema.statics.doesTenureExist = async function (_startYear, _endYear) {
  const doesExist = await this.exists({
    $or: [
      { $and: [{ startYear: { $lt: _endYear } }, { endYear: { $gt: _startYear } }] },
      { startYear: _startYear, endYear: _endYear },
    ],
  });
  return doesExist;
};

// validate start and end year
senateSchema.pre('validate', function (next) {
  if (this.startYear > this.endYear) {
    next(new Error('End year must be greater than or equal to the start year.'));
  }
  next();
});

/**
 * @typedef Senate
 */
const Senate = mongoose.model('Senate', senateSchema);

module.exports = Senate;
