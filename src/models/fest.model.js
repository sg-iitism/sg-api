const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const festSchema = mongoose.Schema(
  {
    _id: {
      type: String,
    },
    name: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    logoUrl: {
      type: String,
    },
    subtitle: {
      type: String,
    },
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

// add plugin that converts mongoose to json
festSchema.plugin(toJSON);

/**
 * Check if name is taken
 * @param {string} name - Name of fest
 * @returns {Promise<boolean>}
 */
festSchema.statics.isNameTaken = async function (name) {
  const fest = await this.findOne({ name });
  return !!fest;
};

/**
 * @typedef Fest
 */
const Fest = mongoose.model('Fest', festSchema);

module.exports = Fest;
