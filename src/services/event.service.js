const httpStatus = require('http-status');
const { v4: uuidv4 } = require('uuid');
const { Event, FestArchive } = require('../models');
const ApiError = require('../utils/ApiError');
const convertToSlug = require('../utils/convertToSlug');

/**
 * Create an event
 * @param {Object} eventBody
 * @returns {Promise<Event>}
 */
const createEvent = async (body, user) => {
  const { name, start, end, showCommonly, imageUrl, website, festOrganizer, clubOrganizers } = body;
  if (
    user.role !== 'admin' &&
    (user.role !== ' moderator' || (festOrganizer !== user.moderatorFest && !clubOrganizers.includes(user.moderatorClub)))
  ) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
  }
  const _id = `${convertToSlug(name)}-${uuidv4()}`;
  const eventBody = {
    ...(showCommonly !== undefined && { showCommonly }),
    ...(imageUrl && { imageUrl }),
    ...(website && { website }),
    ...(festOrganizer && { festOrganizer }),
    ...(clubOrganizers && { clubOrganizers }),
    _id,
    name,
    start,
    end,
    createdBy: user.id,
  };
  return Event.create(eventBody);
};

/**
 * Get all events
 * @returns {Promise<QueryResult>}
 */
const getAllEvents = async (admin) => {
  const query = {};
  if (!admin) {
    Object.assign(query, { showCommonly: true });
  }
  const events = await Event.find(query, { details: 0 }).sort({ end: 'desc' });
  return events;
};

/**
 * Get event by id
 * @param {ObjectId} id
 * @returns {Promise<Event>}
 */
const getEventById = async (id) => {
  return Event.findById(id);
};

/**
 * Get event by club id
 * @param {ObjectId} clubId
 * @returns {Promise<Event>}
 */
const getEventsByClubId = async (clubId) => {
  return Event.find({ clubOrganizers: { $in: [clubId] } }).sort({ end: 'desc' });
};

/**
 * Get events by fest id (latest year)
 * @param {ObjectId} festId
 * @returns {Promise<Event>}
 */
const getEventsByFestId = async (festId) => {
  const festLatestYears = await FestArchive.find({ fest: festId }, { year: 1, start: 1, end: 1 })
    .sort({ year: 'desc' })
    .limit(1);
  if (!festLatestYears.length) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No year found for this fest.');
  }
  const latestFest = festLatestYears[0];
  return Event.find({
    $and: [{ festOrganizer: festId }, { start: { $gte: latestFest.start } }, { end: { $lte: latestFest.end } }],
  }).sort({ end: 'desc' });
};

/**
 * Get events by fest id and year
 * @param {ObjectId} festId
 * @param {ObjectId} year
 * @returns {Promise<Event>}
 */
const getEventsByFestIdAndYear = async (festId, year) => {
  const selectedArchives = await FestArchive.find({ fest: festId, year: Number(year) }, { start: 1, end: 1 }).limit(1);
  if (!selectedArchives) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'The archive for this year is not available.');
  }
  const selectedArchive = selectedArchives[0];
  return Event.find({
    $and: [{ festOrganizer: festId }, { start: { $gte: selectedArchive.start } }, { end: { $lte: selectedArchive.end } }],
  }).sort({ end: 'desc' });
};

/**
 * Update event by id
 * @param {ObjectId} eventId
 * @param {Object} updateBody
 * @returns {Promise<Event>}
 */
const updateEventById = async (eventId, updateBody, user) => {
  const event = await getEventById(eventId);
  if (!event) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Event not found');
  }

  if (
    user.role !== 'admin' &&
    (user.role !== ' moderator' ||
      (event.festOrganizer !== user.moderatorFest && !event.clubOrganizers.includes(user.moderatorClub)))
  ) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
  }

  Object.assign(event, { ...updateBody, updatedBy: user.id });
  await event.save();
  return event;
};

/**
 * Delete event by eventId
 * @param {ObjectId} eventId
 * @returns {Promise<Event>}
 */
const deleteEventById = async (eventId, user) => {
  const event = await getEventById(eventId);
  if (!event) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Event not found');
  }

  if (
    user.role !== 'admin' &&
    (user.role !== ' moderator' ||
      (event.festOrganizer !== user.moderatorFest && !event.clubOrganizers.includes(user.moderatorClub)))
  ) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
  }

  await event.remove();
  return event;
};

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  getEventsByClubId,
  getEventsByFestId,
  getEventsByFestIdAndYear,
  updateEventById,
  deleteEventById,
};
