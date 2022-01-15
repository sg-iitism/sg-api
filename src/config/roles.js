const allRoles = {
  user: [],
  admin: [
    'getUsers',
    'manageUsers',
    'manageImages',
    'manageEvents',
    'manageClubs',
    'updateClub',
    'manageAchievements',
    'manageFests',
    'updateFest',
    'manageFestArchives',
    'updateFestArchives',
  ],
  moderator: ['manageImages', 'manageEvents', 'updateClub', 'manageAchievements', 'updateFest', 'updateFestArchives'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
