const allRoles = {
  user: [],
  admin: ['getUsers', 'manageUsers', 'manageImages', 'manageEvents'],
  moderator: ['manageImages', 'manageEvents'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
