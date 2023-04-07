const { tables } = require("../index");

module.exports = {
  seed: async (knex) => {
    await knex(tables.product).delete();
    await knex(tables.user).delete();
  },
};
