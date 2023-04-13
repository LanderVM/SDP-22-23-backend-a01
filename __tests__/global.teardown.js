const { shutdownData, getKnex, tables } = require('../src/data');

module.exports = async () => {
  await getKnex()(tables.product).delete();

  await shutdownData();
};