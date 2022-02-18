const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const announcementSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    details: {
      type: String,
      required: true,
      trim: true,
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
announcementSchema.plugin(toJSON);
announcementSchema.plugin(paginate);

/**
 * @typedef Announcement
 */
const Announcement = mongoose.model('Announcement', announcementSchema);

module.exports = Announcement;
