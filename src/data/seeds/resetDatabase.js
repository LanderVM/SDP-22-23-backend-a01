const { tables } = require("../index");

module.exports = {
  seed: async (knex) => {
    await knex(tables.user).delete();
  },
};
