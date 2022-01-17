const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const imageRoute = require('./image.route');
const eventRoute = require('./event.route');
const clubRoute = require('./club.route');
const achievementRoute = require('./achievement.route');
const festRoute = require('./fest.route');
const senateRoute = require('./senate.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/images',
    route: imageRoute,
  },
  {
    path: '/events',
    route: eventRoute,
  },
  {
    path: '/clubs',
    route: clubRoute,
  },
  {
    path: '/achievements',
    route: achievementRoute,
  },
  {
    path: '/fests',
    route: festRoute,
  },
  {
    path: '/senate',
    route: senateRoute,
  },
  // TODO: remove later
  {
    path: '/prod-docs',
    route: docsRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
