const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');
const { achievementService } = require('../services');

const createAchievement = catchAsync(async (req, res) => {
  const achievement = await achievementService.createAchievement(req.body, req.user);
  res.status(httpStatus.CREATED).send(achievement);
});

const getAchievementDetails = catchAsync(async (req, res) => {
  const result = await achievementService.getAchievementById(req.params.achievementId);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Achievement not found');
  }
  res.send(result);
});

const updateAchievement = catchAsync(async (req, res) => {
  await achievementService.updateAchievementById(req.params.achievementId, req.body, req.user);
  res.status(httpStatus.NO_CONTENT).send();
});

const deleteAchievement = catchAsync(async (req, res) => {
  await achievementService.deleteAchievementById(req.params.achievementId, req.user);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createAchievement,
  getAchievementDetails,
  updateAchievement,
  deleteAchievement,
};
