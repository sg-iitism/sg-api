const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const achievementSchema = mongoose.Schema(
  {
    _id: {
      type: String,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    details: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
      trim: true,
    },
    club: {
      type: String,
      ref: 'Club',
      required: true,
    },
    updatedBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
achievementSchema.plugin(toJSON);

/**
 * @typedef Achievement
 */
const Achievement = mongoose.model('Achievement', achievementSchema);

module.exports = Achievement;
