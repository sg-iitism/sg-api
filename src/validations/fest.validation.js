const Joi = require('joi');

const createFest = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    subtitle: Joi.string(),
    logoUrl: Joi.string().uri(),
    createdBy: Joi.forbidden(),
    updatedBy: Joi.forbidden(),
  }),
};

const addFestYear = {
  params: Joi.object().keys({
    festId: Joi.string(),
  }),
  body: Joi.object().keys({
    year: Joi.number().min(1900).max(3000).required(),
    start: Joi.date().required(),
    end: Joi.date().required(),
    tagline: Joi.string(),
    participants: Joi.string(),
    about: Joi.string(),
    website: Joi.string(),
    mail: Joi.string(),
    facebook: Joi.string(),
    androidApp: Joi.string(),
    coreTeam: Joi.array().items(
      Joi.object()
        .keys({
          name: Joi.string().required(),
          position: Joi.string().required(),
          imageUrl: Joi.string().uri().required(),
          mail: Joi.string(),
          linkedin: Joi.string().uri(),
          facebook: Joi.string().uri(),
          phone: Joi.string().pattern(/^[0-9]*$/),
        })
        .or('linkedin', 'facebook', 'mail', 'phone')
    ),
    createdBy: Joi.forbidden(),
    updatedBy: Joi.forbidden(),
  }),
};

const getFestDetails = {
  params: Joi.object().keys({
    festId: Joi.string(),
  }),
  query: Joi.object().keys({
    latest: Joi.string().valid('true', 'false'),
  }),
};

const getFestYears = {
  params: Joi.object().keys({
    festId: Joi.string().required(),
  }),
};

const getFestDetailsByYear = {
  params: Joi.object().keys({
    festId: Joi.string().required(),
    year: Joi.string()
      .pattern(/^[0-9]*$/)
      .length(4),
  }),
};

const getFestEvents = {
  params: Joi.object().keys({
    festId: Joi.string().required(),
  }),
};

const getFestEventsByYear = {
  params: Joi.object().keys({
    festId: Joi.string().required(),
    year: Joi.string()
      .pattern(/^[0-9]*$/)
      .required(),
  }),
};

const updateFest = {
  params: Joi.object().keys({
    festId: Joi.string(),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
    subtitle: Joi.string(),
    logoUrl: Joi.string().uri(),
    createdBy: Joi.forbidden(),
    updatedBy: Joi.forbidden(),
  }),
};

const updateFestArchiveByYear = {
  params: Joi.object().keys({
    festId: Joi.string().required(),
    year: Joi.string()
      .pattern(/^[0-9]*$/)
      .length(4),
  }),
  body: Joi.object().keys({
    start: Joi.date(),
    end: Joi.date(),
    tagline: Joi.string(),
    participants: Joi.string(),
    about: Joi.string(),
    website: Joi.string(),
    mail: Joi.string(),
    facebook: Joi.string(),
    androidApp: Joi.string(),
    coreTeam: Joi.array().items(
      Joi.object()
        .keys({
          name: Joi.string().required(),
          position: Joi.string().required(),
          imageUrl: Joi.string().uri().required(),
          mail: Joi.string(),
          linkedin: Joi.string().uri(),
          facebook: Joi.string().uri(),
          phone: Joi.string().pattern(/^[0-9]*$/),
        })
        .or('linkedin', 'facebook', 'mail', 'phone')
    ),
    fest: Joi.forbidden(),
    createdBy: Joi.forbidden(),
    updatedBy: Joi.forbidden(),
    year: Joi.forbidden(),
  }),
};

const deleteFest = {
  params: Joi.object().keys({
    festId: Joi.string(),
  }),
};

const deleteFestArchiveByYear = {
  params: Joi.object().keys({
    festId: Joi.string().required(),
    year: Joi.string()
      .pattern(/^[0-9]*$/)
      .length(4),
  }),
};

module.exports = {
  createFest,
  addFestYear,
  getFestYears,
  getFestDetails,
  getFestDetailsByYear,
  getFestEvents,
  getFestEventsByYear,
  updateFest,
  updateFestArchiveByYear,
  deleteFest,
  deleteFestArchiveByYear,
};
