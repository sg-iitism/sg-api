const httpStatus = require('http-status');
const { Senate } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create an senate
 * @param {Object} senateBody
 * @returns {Promise<Senate>}
 */
const createSenate = async (body, user) => {
  const { startYear, endYear, members } = body;
  if (await Senate.doesTenureExist(startYear, endYear)) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `Sorry, there is already a senate with a tenure in between ${startYear} and ${endYear}.`
    );
  }
  const _id = `${startYear}-${endYear}`;
  const senateBody = {
    ...(members && { members }),
    _id,
    startYear,
    endYear,
    createdBy: user.id,
  };
  return Senate.create(senateBody);
};

/**
 * Get latest senate
 * @returns {Promise<QueryResult>}
 */
const getLatestSenate = async () => {
  return Senate.find({}).sort({ endYear: 'desc' }).limit(1);
};

/**
 * Get senate by id
 * @param {ObjectId} id
 * @returns {Promise<Senate>}
 */
const getSenateById = async (id) => {
  return Senate.findById(id);
};

/**
 * Get all tenures of senate
 * @returns {Promise<QueryResult>}
 */
const getSenateTenures = async () => {
  return Senate.find({}, { members: 0 }).sort({ endYear: 'asc' });
};

/**
 * Update senate by id
 * @param {ObjectId} senateId
 * @param {Object} updateBody
 * @returns {Promise<Senate>}
 */
const updateSenateById = async (senateId, updateBody, user) => {
  const senate = await getSenateById(senateId);
  if (!senate) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Senate not found');
  }

  Object.assign(senate, { ...updateBody, updatedBy: user.id });
  await senate.save();
  return senate;
};

/**
 * Delete senate by senateId
 * @param {ObjectId} senateId
 * @returns {Promise<Senate>}
 */
const deleteSenateById = async (senateId) => {
  const senate = await getSenateById(senateId);
  if (!senate) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Senate not found');
  }
  await senate.remove();
  return senate;
};

module.exports = {
  createSenate,
  getLatestSenate,
  getSenateTenures,
  getSenateById,
  updateSenateById,
  deleteSenateById,
};
