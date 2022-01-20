const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');
const { clubService, eventService, achievementService } = require('../services');

const createClub = catchAsync(async (req, res) => {
  const club = await clubService.createClub(req.body, req.user);
  res.status(httpStatus.CREATED).send(club);
});

const getClubs = catchAsync(async (req, res) => {
  const { division } = req.query;
  const result = await clubService.getAllClubs(division);
  res.send(result);
});

const getClubDetails = catchAsync(async (req, res) => {
  const result = await clubService.getClubById(req.params.clubId);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Club not found');
  }
  res.send(result);
});

const getClubEvents = catchAsync(async (req, res) => {
  const result = await eventService.getEventsByClubId(req.params.clubId);
  res.send(result);
});

const getClubAchievements = catchAsync(async (req, res) => {
  const result = await achievementService.getAchievementsByClubId(req.params.clubId, req.query.detailsLength);
  res.send(result);
});

const updateClub = catchAsync(async (req, res) => {
  const club = await clubService.updateClubById(req.params.clubId, req.body, req.user);
  res.send(club);
});

const deleteClub = catchAsync(async (req, res) => {
  await clubService.deleteClubById(req.params.clubId, req.user);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createClub,
  getClubs,
  getClubDetails,
  getClubEvents,
  getClubAchievements,
  updateClub,
  deleteClub,
};
