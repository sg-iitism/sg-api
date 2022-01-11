const mongoose = require('mongoose');
const { toJSON } = require('./plugins');
const contactSchema = require('./contact.model').schema;

const clubSchema = mongoose.Schema(
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
    backgroundImageUrl: {
      type: String,
    },
    tagline: {
      type: String,
    },
    about: {
      type: String,
    },
    contacts: [contactSchema],
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
    linkedin: {
      type: String,
      trim: true,
    },
    github: {
      type: String,
      trim: true,
    },
    division: {
      type: String,
      enum: ['mnc', 'snt'],
      required: true,
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
clubSchema.plugin(toJSON);

/**
 * @typedef Club
 */
const Club = mongoose.model('Club', clubSchema);

module.exports = Club;
