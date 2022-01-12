const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');
const { eventService } = require('../services');

const createEvent = catchAsync(async (req, res) => {
  const event = await eventService.createEvent(req.body, req.user);
  res.status(httpStatus.CREATED).send(event);
});

const getEvents = catchAsync(async (req, res) => {
  const { admin } = req.query;
  const result = await eventService.getAllEvents(admin);
  res.send(result);
});

const getEventDetails = catchAsync(async (req, res) => {
  const result = await eventService.getEventById(req.params.eventId);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Event not found');
  }
  res.send(result);
});

const updateEvent = catchAsync(async (req, res) => {
  await eventService.updateEventById(req.params.eventId, req.body, req.user);
  res.status(httpStatus.NO_CONTENT).send();
});

const deleteEvent = catchAsync(async (req, res) => {
  await eventService.deleteEventById(req.params.eventId, req.user);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createEvent,
  getEvents,
  getEventDetails,
  updateEvent,
  deleteEvent,
};
