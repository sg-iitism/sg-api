const Joi = require('joi');

const createAchievement = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    details: Joi.string().required(),
    imageUrl: Joi.string().uri().required(),
    club: Joi.string().required(),
    updatedBy: Joi.forbidden(),
  }),
};

const getAllAchievements = {
  query: Joi.object().keys({
    limit: Joi.number().integer(),
  }),
};

const getAchievementDetails = {
  params: Joi.object().keys({
    achievementId: Joi.string(),
  }),
};

const updateAchievement = {
  params: Joi.object().keys({
    achievementId: Joi.string(),
  }),
  body: Joi.object().keys({
    title: Joi.string(),
    details: Joi.string(),
    imageUrl: Joi.string().uri(),
    club: Joi.string(),
    updatedBy: Joi.forbidden(),
  }),
};

const deleteAchievement = {
  params: Joi.object().keys({
    achievementId: Joi.string(),
  }),
};

module.exports = {
  createAchievement,
  getAllAchievements,
  getAchievementDetails,
  updateAchievement,
  deleteAchievement,
};
