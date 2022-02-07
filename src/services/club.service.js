const httpStatus = require('http-status');
const { Club } = require('../models');
const ApiError = require('../utils/ApiError');
const convertToSlug = require('../utils/convertToSlug');

/**
 * Create an club
 * @param {Object} clubBody
 * @returns {Promise<Club>}
 */
const createClub = async (body, user) => {
  const {
    name,
    division,
    logoUrl,
    backgroundImageUrl,
    tagline,
    about,
    contacts,
    website,
    mail,
    facebook,
    linkedin,
    github,
    instagram,
  } = body;
  if (await Club.isNameTaken(name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Sorry, there is already a club with this name.');
  }
  const _id = convertToSlug(name);
  const clubBody = {
    ...(logoUrl && { logoUrl }),
    ...(backgroundImageUrl && { backgroundImageUrl }),
    ...(tagline && { tagline }),
    ...(about && { about }),
    ...(contacts && { contacts }),
    ...(website && { website }),
    ...(mail && { mail }),
    ...(facebook && { facebook }),
    ...(linkedin && { linkedin }),
    ...(github && { github }),
    ...(instagram && { instagram }),
    _id,
    name,
    division,
    createdBy: user.id,
  };
  return Club.create(clubBody);
};

/**
 * Get all clubs
 * @returns {Promise<QueryResult>}
 */
const getAllClubs = async (division) => {
  const query = {};
  if (division) {
    Object.assign(query, { division });
  }
  const clubs = await Club.find(query, { _id: 1, name: 1, division: 1, logoUrl: 1, tagline: 1 }).sort({ end: 'desc' });
  return clubs;
};

/**
 * Get club by id
 * @param {ObjectId} id
 * @returns {Promise<Club>}
 */
const getClubById = async (id) => {
  return Club.findById(id);
};

/**
 * Update club by id
 * @param {ObjectId} clubId
 * @param {Object} updateBody
 * @returns {Promise<Club>}
 */
const updateClubById = async (clubId, updateBody, user) => {
  const club = await getClubById(clubId);
  if (!club) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Club not found');
  }

  if (user.role !== 'admin' && (user.role !== 'moderator' || user.moderatorClub !== clubId)) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
  }

  Object.assign(club, { ...updateBody, updatedBy: user.id });
  await club.save();
  return club;
};

/**
 * Delete club by clubId
 * @param {ObjectId} clubId
 * @returns {Promise<Club>}
 */
const deleteClubById = async (clubId) => {
  const club = await getClubById(clubId);
  if (!club) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Club not found');
  }
  await club.remove();
  return club;
};

module.exports = {
  createClub,
  getAllClubs,
  getClubById,
  updateClubById,
  deleteClubById,
};
