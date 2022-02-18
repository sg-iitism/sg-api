const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createSenate = {
  body: Joi.object().keys({
    startYear: Joi.number().min(1900).max(3000),
    endYear: Joi.number().min(Joi.ref('startYear')).max(3000),
    members: Joi.array().items(
      Joi.object()
        .keys({
          name: Joi.string().required(),
          position: Joi.string().required(),
          branch: Joi.string(),
          imageUrl: Joi.string().uri().required(),
          mail: Joi.string(),
          linkedin: Joi.string().uri(),
          facebook: Joi.string().uri(),
          phone: Joi.string().pattern(/^[0-9]*$/),
        })
        .or('linkedin', 'facebook', 'mail', 'phone')
    ),
    otherMembers: Joi.array().items(
      Joi.object().keys({
        name: Joi.string().required(),
        branch: Joi.string().required(),
      })
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
          branch: Joi.string(),
          mail: Joi.string(),
          linkedin: Joi.string().uri(),
          facebook: Joi.string().uri(),
          phone: Joi.string().pattern(/^[0-9]*$/),
        })
        .or('linkedin', 'facebook', 'mail', 'phone')
    ),
    otherMembers: Joi.array().items(
      Joi.object().keys({
        name: Joi.string().required(),
        branch: Joi.string().required(),
      })
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

const addOtherMember = {
  params: Joi.object().keys({
    senateId: Joi.string(),
  }),
  body: Joi.object().keys({
    name: Joi.string().required(),
    branch: Joi.string().required(),
  }),
};

const updateOtherMember = {
  params: Joi.object().keys({
    senateId: Joi.string(),
    otherMemberId: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
    branch: Joi.string(),
  }),
};

const deleteOtherMember = {
  params: Joi.object().keys({
    senateId: Joi.string(),
    otherMemberId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createSenate,
  getSenateById,
  updateSenate,
  deleteSenate,
  addOtherMember,
  updateOtherMember,
  deleteOtherMember,
};
