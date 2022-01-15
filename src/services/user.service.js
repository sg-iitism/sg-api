const httpStatus = require('http-status');
const { User, Club, Fest } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  const { email, moderatorClub, moderatorFest } = userBody;
  if (await User.isEmailTaken(email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  if (moderatorClub) {
    const doesClubExist = await Club.exists({ _id: moderatorClub });
    if (!doesClubExist) {
      throw new ApiError(httpStatus.BAD_REQUEST, `Club ${moderatorClub} not found`);
    }
  }
  if (moderatorFest) {
    const doesFestExist = await Fest.exists({ _id: moderatorFest });
    if (!doesFestExist) {
      throw new ApiError(httpStatus.BAD_REQUEST, `Fest ${moderatorFest} not found`);
    }
  }
  return User.create(userBody);
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (filter, options) => {
  const users = await User.paginate(filter, options);
  return users;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return User.findById(id);
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (isAdmin, userId, updateBody) => {
  const { email, moderatorClub, moderatorFest } = updateBody;
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (email && (await User.isEmailTaken(email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  if (moderatorClub) {
    const doesClubExist = await Club.exists({ _id: moderatorClub });
    if (!doesClubExist) {
      throw new ApiError(httpStatus.BAD_REQUEST, `Club ${moderatorClub} not found`);
    }
  }
  if (moderatorFest) {
    const doesFestExist = await Fest.exists({ _id: moderatorFest });
    if (!doesFestExist) {
      throw new ApiError(httpStatus.BAD_REQUEST, `Fest ${moderatorFest} not found`);
    }
  }
  if (!isAdmin && (updateBody.email || updateBody.role || updateBody.moderatorClub || updateBody.moderatorFest)) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `Non-admins can't update their email, role, club or fest. Please request an admin to do it for you.`
    );
  }
  if (email && email !== user.email) {
    user.isEmailVerified = false;
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.remove();
  return user;
};

module.exports = {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
};
