const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const eventSchema = mongoose.Schema(
  {
    _id: {
      type: String,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    details: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    website: {
      type: String,
    },
    start: {
      type: Date,
      required: true,
    },
    end: {
      type: Date,
      required: true,
    },
    festOrganizer: {
      type: String,
      ref: 'Fest',
    },
    clubOrganizers: [
      {
        type: String,
        ref: 'Club',
      },
    ],
    showCommonly: {
      type: Boolean,
      default: true,
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
eventSchema.plugin(toJSON);

// validate start and end time
eventSchema.pre('validate', function (next) {
  if (this.start > this.end) {
    next(new Error('End time must be greater than the start time.'));
  }
  next();
});

/**
 * @typedef Event
 */
const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
