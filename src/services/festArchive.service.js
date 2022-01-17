const httpStatus = require('http-status');
const { Fest, FestArchive } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Add an year to fest
 * @param {String} festId
 * @param {Object} body
 * @param {Object} user
 * @returns {Promise<FestArchive>}
 */
const addFestYear = async (festId, body, user) => {
  const { year, coreTeam, start, end, tagline, participants, about, website, mail, facebook, androidApp } = body;
  const doesFestExist = await Fest.exists({ _id: festId });
  if (!doesFestExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Fest ${festId} not found`);
  }
  const doesFestArchiveAlreadyExist = await FestArchive.exists({ fest: festId, year: +year });
  if (doesFestArchiveAlreadyExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Sorry, the year ${year} is already existing for the fest ${festId}.`);
  }
  const festArchiveBody = {
    ...(coreTeam && { coreTeam }),
    ...(start && { start }),
    ...(end && { end }),
    ...(tagline && { tagline }),
    ...(participants && { participants }),
    ...(about && { about }),
    ...(website && { website }),
    ...(mail && { mail }),
    ...(facebook && { facebook }),
    ...(androidApp && { androidApp }),
    year,
    fest: festId,
    createdBy: user.id,
  };
  return FestArchive.create(festArchiveBody);
};

/**
 * Get all years in which the fest was held
 * @param {String} festId
 * @returns {Promise<QueryResult>}
 */
const getFestYears = async (festId) => {
  return FestArchive.find({ fest: festId }, { year: 1 }).sort({
    year: 'desc',
  });
};

/**
 * Get fest details of latest year
 * @param {String} festId
 * @returns {QueryResult}
 */
const getFestDetailsOfLatestYear = async (festId) => {
  const festArchives = await FestArchive.find({ fest: festId }).sort({ year: 'desc' }).limit(1);
  if (!festArchives.length) {
    throw new ApiError(httpStatus.NOT_FOUND, `No archive found for the fest '${festId}'`);
  }
  return festArchives[0];
};

/**
 * Get fest details by year
 * @param {String} festId
 * @param {String} year
 * @returns {QueryResult}
 */
const getFestDetailsByYear = async (festId, year) => {
  const festArchives = await FestArchive.find({ fest: festId, year: Number(year) });
  if (!festArchives.length) {
    throw new ApiError(httpStatus.NOT_FOUND, `Archive for the year ${year} is not available for fest '${festId}'`);
  }
  return festArchives[0];
};

/**
 * Update festArchive by year
 * @param {String} festId
 * @param {String} year
 * @param {Object} updateBody
 * @returns {Promise<FestArchive>}
 */
const updateFestArchiveByYear = async (festId, year, updateBody, user) => {
  const festArchive = await getFestDetailsByYear(festId, year);

  if (user.role !== 'admin' && (user.role !== ' moderator' || user.moderatorFest !== festId)) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
  }

  Object.assign(festArchive, { ...updateBody, updatedBy: user.id });
  await festArchive.save();
  return festArchive;
};

/**
 * Delete festArchive by year
 * @param {String} festId
 * @param {String} year
 * @returns {Promise<FestArchive>}
 */
const deleteFestArchiveByYear = async (festId, year) => {
  const festArchive = await getFestDetailsByYear(festId, year);
  await festArchive.remove();
  return festArchive;
};

module.exports = {
  addFestYear,
  getFestYears,
  getFestDetailsOfLatestYear,
  getFestDetailsByYear,
  updateFestArchiveByYear,
  deleteFestArchiveByYear,
};
