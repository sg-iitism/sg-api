const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');
const { senateService } = require('../services');

const createSenate = catchAsync(async (req, res) => {
  const senate = await senateService.createSenate(req.body, req.user);
  res.status(httpStatus.CREATED).send(senate);
});

const getLatestSenate = catchAsync(async (req, res) => {
  const latestSenates = await senateService.getLatestSenate();
  if (!latestSenates.length) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Senate not found');
  }
  const latestSenate = latestSenates[0];
  res.send(latestSenate);
});

const getSenateById = catchAsync(async (req, res) => {
  const result = await senateService.getSenateById(req.params.senateId);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Senate not found');
  }
  res.send(result);
});

const getSenateTenures = catchAsync(async (req, res) => {
  const result = await senateService.getSenateTenures();
  res.send(result);
});

const updateSenate = catchAsync(async (req, res) => {
  const senate = await senateService.updateSenateById(req.params.senateId, req.body, req.user);
  res.send(senate);
});

const deleteSenate = catchAsync(async (req, res) => {
  await senateService.deleteSenateById(req.params.senateId, req.user);
  res.status(httpStatus.NO_CONTENT).send();
});

const addOtherMember = catchAsync(async (req, res) => {
  await senateService.addOtherMember(req.params.senateId, req.body, req.user);
  res.status(httpStatus.NO_CONTENT).send();
});

const updateOtherMember = catchAsync(async (req, res) => {
  await senateService.updateOtherMember(req.params.senateId, req.params.otherMemberId, req.body, req.user);
  res.status(httpStatus.NO_CONTENT).send();
});

const deleteOtherMember = catchAsync(async (req, res) => {
  await senateService.deleteOtherMember(req.params.senateId, req.params.otherMemberId, req.user);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createSenate,
  getLatestSenate,
  getSenateById,
  getSenateTenures,
  updateSenate,
  deleteSenate,
  addOtherMember,
  updateOtherMember,
  deleteOtherMember,
};
