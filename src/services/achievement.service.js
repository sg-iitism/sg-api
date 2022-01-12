const httpStatus = require('http-status');
const { v4: uuidv4 } = require('uuid');
const { Achievement, Club } = require('../models');
const ApiError = require('../utils/ApiError');
const convertToSlug = require('../utils/convertToSlug');

/**
 * Create an achievement
 * @param {Object} achievementBody
 * @returns {Promise<Achievement>}
 */
const createAchievement = async (body, user) => {
  const { title, details, imageUrl, club } = body;
  if (user.role !== 'admin' && (user.role !== ' moderator' || user.moderatorClub !== club)) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
  }
  const doesClubExist = await Club.exists({ _id: club });
  if (!doesClubExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Club ${club} not found`);
  }
  const _id = `${convertToSlug(title)}-${uuidv4()}`;
  const achievementBody = {
    _id,
    title,
    details,
    imageUrl,
    club,
    updatedBy: user.id,
  };
  return Achievement.create(achievementBody);
};

/**
 * Get all achievements of a club
 * @param {ObjectId} clubId
 * @returns {Promise<QueryResult>}
 */
const getAchievementsByClubId = async (clubId) => {
  const achievements = await Achievement.find({ club: clubId }).sort({
    updatedAt: 'desc',
  });
  return achievements;
};

/**
 * Get achievement by id
 * @param {ObjectId} id
 * @returns {Promise<Achievement>}
 */
const getAchievementById = async (id) => {
  return Achievement.findById(id);
};

/**
 * Update achievement by id
 * @param {ObjectId} achievementId
 * @param {Object} updateBody
 * @returns {Promise<Achievement>}
 */
const updateAchievementById = async (achievementId, updateBody, user) => {
  const achievement = await getAchievementById(achievementId);
  if (!achievement) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Achievement not found');
  }

  if (
    user.role !== 'admin' &&
    (user.role !== ' moderator' ||
      (achievement.festOrganizer !== user.moderatorFest && !achievement.clubOrganizers.includes(user.moderatorClub)))
  ) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
  }

  if (updateBody.club) {
    const doesClubExist = await Club.exists({ _id: updateBody.club });
    if (!doesClubExist) {
      throw new ApiError(httpStatus.BAD_REQUEST, `Club ${updateBody.club} not found`);
    }
  }

  Object.assign(achievement, { ...updateBody, updatedBy: user.id });
  await achievement.save();
  return achievement;
};

/**
 * Delete achievement by achievementId
 * @param {ObjectId} achievementId
 * @returns {Promise<Achievement>}
 */
const deleteAchievementById = async (achievementId, user) => {
  const achievement = await getAchievementById(achievementId);
  if (!achievement) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Achievement not found');
  }

  if (user.role !== 'admin' && (user.role !== ' moderator' || user.moderatorClub !== achievement.club)) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
  }

  await achievement.remove();
  return achievement;
};

module.exports = {
  createAchievement,
  getAchievementsByClubId,
  getAchievementById,
  updateAchievementById,
  deleteAchievementById,
};
