const mongoose = require('mongoose');
const { toJSON } = require('./plugins');
const festArchiveSchema = require('./festArchive.model').schema;

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
    archives: [festArchiveSchema],
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
 * @typedef Fest
 */
const Fest = mongoose.model('Fest', festSchema);

module.exports = Fest;
