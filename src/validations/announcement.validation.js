const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createAnnouncement = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    details: Joi.string().required(),
    createdBy: Joi.forbidden(),
    updatedBy: Joi.forbidden(),
  }),
};

const getAnnouncements = {
  query: Joi.object().keys({
    title: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getAnnouncementDetails = {
  params: Joi.object().keys({
    announcementId: Joi.string().custom(objectId),
  }),
};

const updateAnnouncement = {
  params: Joi.object().keys({
    announcementId: Joi.string(),
  }),
  body: Joi.object().keys({
    title: Joi.string(),
    details: Joi.string(),
    createdBy: Joi.forbidden(),
    updatedBy: Joi.forbidden(),
  }),
};

const deleteAnnouncement = {
  params: Joi.object().keys({
    announcementId: Joi.string(),
  }),
};

module.exports = {
  createAnnouncement,
  getAnnouncements,
  getAnnouncementDetails,
  updateAnnouncement,
  deleteAnnouncement,
};
