const mongoose = require('mongoose');
const { toJSON } = require('./plugins');
const contactSchema = require('./contact.model').schema;

const festArchiveSchema = mongoose.Schema(
  {
    fest: {
      type: String,
      ref: 'Fest',
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    coreTeam: [contactSchema],
    start: {
      type: Date,
    },
    end: {
      type: Date,
    },
    tagline: {
      type: String,
      trim: true,
    },
    participants: {
      type: String,
    },
    about: {
      type: String,
    },
    website: {
      type: String,
      trim: true,
    },
    mail: {
      type: String,
      trim: true,
    },
    facebook: {
      type: String,
      trim: true,
    },
    androidApp: {
      type: String,
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

// combination of fest and year should be unique
festArchiveSchema.index({ fest: 1, year: 1 }, { unique: true });

// add plugin that converts mongoose to json
festArchiveSchema.plugin(toJSON);

/**
 * @typedef FestArchive
 */
const FestArchive = mongoose.model('FestArchive', festArchiveSchema);

module.exports = FestArchive;
