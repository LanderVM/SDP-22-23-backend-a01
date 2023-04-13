const config = require('config');

const { initializeDatabase } = require('../src/data');
const { initializeLogger } = require('../src/core/logging');

module.exports = async () => {
  initializeLogger({
    level: config.get('log.level'),
    disabled: config.get('log.disabled'),
  });

  await initializeDatabase();
};