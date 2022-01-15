const httpStatus = require('http-status');
const { Fest, FestArchive } = require('../models');
const ApiError = require('../utils/ApiError');
const convertToSlug = require('../utils/convertToSlug');

/**
 * Create an fest
 * @param {Object} festBody
 * @returns {Promise<Fest>}
 */
const createFest = async (body, user) => {
  const { name, subtitle, logoUrl } = body;
  if (await Fest.isNameTaken(name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Sorry, there is already a fest with this name.');
  }
  const _id = convertToSlug(name);
  const festBody = {
    ...(logoUrl && { logoUrl }),
    ...(subtitle && { subtitle }),
    _id,
    name,
    createdBy: user.id,
  };
  return Fest.create(festBody);
};

/**
 * Get all fests
 * @returns {Promise<QueryResult>}
 */
const getAllFests = async () => {
  return Fest.find({});
};

/**
 * Get fest by id
 * @param {ObjectId} id
 * @returns {Promise<Fest>}
 */
const getFestById = async (id) => {
  return Fest.findById(id);
};

/**
 * Update fest by id
 * @param {ObjectId} festId
 * @param {Object} updateBody
 * @param {Object} user
 * @returns {Promise<Fest>}
 */
const updateFestById = async (festId, updateBody, user) => {
  const fest = await getFestById(festId);
  if (!fest) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Fest not found');
  }

  if (user.role !== 'admin' && (user.role !== ' moderator' || user.moderatorFest !== festId)) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
  }

  Object.assign(fest, { ...updateBody, updatedBy: user.id });
  await fest.save();
  return fest;
};

/**
 * Delete fest by festId
 * @param {ObjectId} festId
 * @returns {Promise<Fest>}
 */
const deleteFestById = async (festId) => {
  const archiveCount = await FestArchive.find({ fest: festId }, { year: 1 }).countDocuments();
  if (archiveCount) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Found ${archiveCount} archives for this fest. Please delete those first.`);
  }
  const fest = await getFestById(festId);
  if (!fest) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Fest not found');
  }
  await fest.remove();
  return fest;
};

module.exports = {
  createFest,
  getAllFests,
  getFestById,
  updateFestById,
  deleteFestById,
};
