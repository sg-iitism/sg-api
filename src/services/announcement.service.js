const httpStatus = require('http-status');
const { Announcement } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a announcement
 * @param {Object} announcementBody
 * @returns {Promise<Announcement>}
 */
const createAnnouncement = async (announcementBody, user) => {
  return Announcement.create({ ...announcementBody, createdBy: user.id });
};

/**
 * Query for announcements
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryAnnouncements = async (filter, options) => {
  const announcements = await Announcement.paginate(filter, options);
  return announcements;
};

/**
 * Get announcement by id
 * @param {ObjectId} id
 * @returns {Promise<Announcement>}
 */
const getAnnouncementById = async (id) => {
  return Announcement.findById(id);
};

/**
 * Update announcement by id
 * @param {ObjectId} announcementId
 * @param {Object} updateBody
 * @returns {Promise<Announcement>}
 */
const updateAnnouncementById = async (announcementId, updateBody, user) => {
  const announcement = await getAnnouncementById(announcementId);
  if (!announcement) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Announcement not found');
  }
  Object.assign(announcement, { ...updateBody, updatedBy: user.id });
  await announcement.save();
  return announcement;
};

/**
 * Delete announcement by id
 * @param {ObjectId} announcementId
 * @returns {Promise<Announcement>}
 */
const deleteAnnouncementById = async (announcementId) => {
  const announcement = await getAnnouncementById(announcementId);
  if (!announcement) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Announcement not found');
  }
  await announcement.remove();
  return announcement;
};

module.exports = {
  createAnnouncement,
  queryAnnouncements,
  getAnnouncementById,
  updateAnnouncementById,
  deleteAnnouncementById,
};
