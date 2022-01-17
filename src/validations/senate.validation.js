const Joi = require('joi');

const createSenate = {
  body: Joi.object().keys({
    startYear: Joi.number().min(1900).max(3000),
    endYear: Joi.number().min(1900).max(3000),
    members: Joi.array().items(
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

const getSenateById = {
  params: Joi.object().keys({
    senateId: Joi.string(),
  }),
};

const updateSenate = {
  params: Joi.object().keys({
    senateId: Joi.string(),
  }),
  body: Joi.object().keys({
    members: Joi.array().items(
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

const deleteSenate = {
  params: Joi.object().keys({
    senateId: Joi.string(),
  }),
};

module.exports = {
  createSenate,
  getSenateById,
  updateSenate,
  deleteSenate,
};
