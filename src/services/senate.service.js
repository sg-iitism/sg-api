const httpStatus = require('http-status');
const mongoose = require('mongoose');
const { Senate } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create an senate
 * @param {Object} senateBody
 * @returns {Promise<Senate>}
 */
const createSenate = async (body, user) => {
  const { startYear, endYear, members, otherMembers } = body;
  if (await Senate.doesTenureExist(startYear, endYear)) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `Sorry, there is already a senate with a tenure in between ${startYear} and ${endYear}.`
    );
  }
  const _id = `${startYear}-${endYear}`;
  const senateBody = {
    ...(members && { members }),
    ...(otherMembers && { otherMembers }),
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
  return Senate.find({}, { members: 0, otherMembers: 0 }).sort({ endYear: 'asc' });
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

/**
 * Add an other member in senate
 * @param {ObjectId} senateId
 * @param {Object} body
 * @param {Object} user
 * @returns {Promise<Senate>}
 */
const addOtherMember = async (senateId, body, user) => {
  const memberId = new mongoose.Types.ObjectId();
  await Senate.updateOne(
    { _id: senateId },
    { $push: { otherMembers: { ...body, _id: memberId } }, $set: { updatedBy: user.id } }
  );
  const data = { ...body, id: memberId };
  return data;
};

/**
 * Update details of an other member in senate
 * @param {ObjectId} senateId
 * @param {ObjectId} otherMemberId
 * @param {Object} body
 * @param {Object} user
 * @returns {Promise<Senate>}
 */
const updateOtherMember = async (senateId, otherMemberId, body, user) => {
  const { name, branch } = body;
  return Senate.updateOne(
    { _id: senateId, 'otherMembers._id': otherMemberId },
    {
      $set: {
        ...(name && { 'otherMembers.$.name': name }),
        ...(branch && { 'otherMembers.$.branch': branch }),
        updatedBy: user.id,
      },
    }
  );
};

/**
 * Delete an other member in senate
 * @param {ObjectId} senateId
 * @param {ObjectId} otherMemberId
 * @param {Object} user
 * @returns {Promise<Senate>}
 */
const deleteOtherMember = async (senateId, otherMemberId, user) => {
  return Senate.updateOne(
    { _id: senateId },
    {
      $pull: {
        otherMembers: { _id: otherMemberId },
      },
      $set: {
        updatedBy: user.id,
      },
    }
  );
};

module.exports = {
  createSenate,
  getLatestSenate,
  getSenateTenures,
  getSenateById,
  updateSenateById,
  deleteSenateById,
  addOtherMember,
  updateOtherMember,
  deleteOtherMember,
};
