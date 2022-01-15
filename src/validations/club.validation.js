const Joi = require('joi');

const createClub = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    division: Joi.string().required().valid('snt', 'mnc'),
    logoUrl: Joi.string().uri(),
    backgroundImageUrl: Joi.string().uri(),
    tagline: Joi.string(),
    about: Joi.string(),
    contacts: Joi.array().items(
      Joi.object().keys({
        name: Joi.string().required,
        position: Joi.string().required,
        imageUrl: Joi.string().uri().required,
        mail: Joi.string().required,
        linkedin: Joi.string().uri(),
        facebook: Joi.string().uri(),
        phone: Joi.string(),
      })
    ),
    website: Joi.string(),
    mail: Joi.string(),
    facebook: Joi.string(),
    linkedin: Joi.string(),
    github: Joi.string(),
    createdBy: Joi.forbidden(),
    updatedBy: Joi.forbidden(),
  }),
};

const getClubs = {
  query: Joi.object().keys({
    division: Joi.string().valid('snt', 'mnc'),
  }),
};

const getClubDetails = {
  params: Joi.object().keys({
    clubId: Joi.string(),
  }),
};

const getClubEvents = {
  params: Joi.object().keys({
    clubId: Joi.string().required(),
  }),
};

const getClubAchievements = {
  params: Joi.object().keys({
    clubId: Joi.string().required(),
  }),
};

const updateClub = {
  params: Joi.object().keys({
    clubId: Joi.string(),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
    division: Joi.string().valid('snt', 'mnc'),
    logoUrl: Joi.string().uri(),
    backgroundImageUrl: Joi.string().uri(),
    tagline: Joi.string(),
    about: Joi.string(),
    contacts: Joi.array().items(
      Joi.object().keys({
        name: Joi.string().required,
        position: Joi.string().required,
        imageUrl: Joi.string().uri().required,
        mail: Joi.string().required,
        linkedin: Joi.string().uri(),
        facebook: Joi.string().uri(),
        phone: Joi.string(),
      })
    ),
    website: Joi.string(),
    mail: Joi.string(),
    facebook: Joi.string(),
    linkedin: Joi.string(),
    github: Joi.string(),
    createdBy: Joi.forbidden(),
    updatedBy: Joi.forbidden(),
  }),
};

const deleteClub = {
  params: Joi.object().keys({
    clubId: Joi.string(),
  }),
};

module.exports = {
  createClub,
  getClubs,
  getClubDetails,
  getClubEvents,
  getClubAchievements,
  updateClub,
  deleteClub,
};
