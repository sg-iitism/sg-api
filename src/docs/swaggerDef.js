const { version } = require('../../package.json');
const config = require('../config/config');

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'SG API documentation',
    version,
    license: {
      name: 'MIT',
      url: 'https://github.com/sg-iitism/sg-api/blob/master/LICENSE',
    },
  },
  servers: [
    {
      url: config.env === 'development' ? `http://localhost:${config.port}/v1` : `https://sg-iitism-api.herokuapp.com/v1`,
    },
  ],
};

module.exports = swaggerDef;
