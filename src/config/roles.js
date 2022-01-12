const allRoles = {
  user: [],
  admin: ['getUsers', 'manageUsers', 'manageImages', 'manageEvents', 'manageClubs', 'updateClub', 'manageAchievements'],
  moderator: ['manageImages', 'manageEvents', 'updateClub', 'manageAchievements'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
