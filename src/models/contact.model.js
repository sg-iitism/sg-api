const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const contactSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      titlecase: true,
    },
    position: {
      type: String,
      required: true,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: true,
      trim: true,
    },
    mail: {
      type: String,
      trim: true,
      required: true,
    },
    linkedin: {
      type: String,
      trim: true,
    },
    facebook: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
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
contactSchema.plugin(toJSON);

/**
 * @typedef Contact
 */
const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
