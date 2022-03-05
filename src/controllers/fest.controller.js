const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { festService, festArchiveService, eventService } = require('../services');

const createFest = catchAsync(async (req, res) => {
  const fest = await festService.createFest(req.body, req.user);
  res.status(httpStatus.CREATED).send(fest);
});

const addFestYear = catchAsync(async (req, res) => {
  const fest = await festArchiveService.addFestYear(req.params.festId, req.body, req.user);
  res.status(httpStatus.CREATED).send(fest);
});

const getFests = catchAsync(async (req, res) => {
  const result = await festService.getAllFests();
  res.send(result);
});

const getFestDetails = catchAsync(async (req, res) => {
  let result;
  if (req.query.latest === 'true') {
    result = await festArchiveService.getFestDetailsOfLatestYear(req.params.festId);
  } else {
    result = await festService.getFestById(req.params.festId);
  }
  res.send(result);
});

const getFestYears = catchAsync(async (req, res) => {
  const result = await festArchiveService.getFestYears(req.params.festId);
  res.send(result);
});

const getFestDetailsByYear = catchAsync(async (req, res) => {
  const result = await festArchiveService.getFestDetailsByYear(req.params.festId, req.params.year);
  res.send(result);
});

const getFestEvents = catchAsync(async (req, res) => {
  const result = await eventService.getEventsByFestId(req.params.festId);
  res.send(result);
});

const getEventsByFestIdAndYear = catchAsync(async (req, res) => {
  const result = await eventService.getEventsByFestIdAndYear(req.params.festId, req.params.year);
  res.send(result);
});

const updateFest = catchAsync(async (req, res) => {
  const fest = await festService.updateFestById(req.params.festId, req.body, req.user);
  res.send(fest);
});

const updateFestArchiveByYear = catchAsync(async (req, res) => {
  const festArchive = await festArchiveService.updateFestArchiveByYear(
    req.params.festId,
    req.params.year,
    req.body,
    req.user
  );
  res.send(festArchive);
});

const deleteFestArchiveByYear = catchAsync(async (req, res) => {
  await festArchiveService.deleteFestArchiveByYear(req.params.festId, req.params.year);
  res.status(httpStatus.NO_CONTENT).send();
});

const deleteFest = catchAsync(async (req, res) => {
  await festService.deleteFestById(req.params.festId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createFest,
  addFestYear,
  getFests,
  getFestDetails,
  getFestYears,
  getFestDetailsByYear,
  getFestEvents,
  getEventsByFestIdAndYear,
  updateFest,
  updateFestArchiveByYear,
  deleteFestArchiveByYear,
  deleteFest,
};
