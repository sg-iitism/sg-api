const Joi = require('joi');

const createEvent = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    start: Joi.date().required(),
    end: Joi.date().required().min(Joi.ref('start')),
    details: Joi.string(),
    showCommonly: Joi.boolean(),
    imageUrl: Joi.string().uri(),
    website: Joi.string().uri(),
    festOrganizer: Joi.string().allow('', null),
    clubOrganizers: Joi.array().items(Joi.string()),
    createdBy: Joi.forbidden(),
    updatedBy: Joi.forbidden(),
  }),
};

const getEvents = {
  query: Joi.object().keys({
    admin: Joi.string().valid('true', 'false'),
  }),
};

const getEventDetails = {
  params: Joi.object().keys({
    eventId: Joi.string(),
  }),
};

const updateEvent = {
  params: Joi.object().keys({
    eventId: Joi.string(),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
    start: Joi.date(),
    end: Joi.date(),
    details: Joi.string(),
    showCommonly: Joi.boolean(),
    imageUrl: Joi.string().uri(),
    website: Joi.string().uri(),
    festOrganizer: Joi.string().allow('', null),
    clubOrganizers: Joi.array().items(Joi.string()),
    createdBy: Joi.forbidden(),
    updatedBy: Joi.forbidden(),
  }),
};

const deleteEvent = {
  params: Joi.object().keys({
    eventId: Joi.string(),
  }),
};

module.exports = {
  createEvent,
  getEvents,
  getEventDetails,
  updateEvent,
  deleteEvent,
};
