const { tables } = require("../index");

module.exports = {
  seed: async (knex) => {
    await knex(tables.product).delete();
    await knex(tables.user).delete();
    await knex(tables.customer_order).delete();
    await knex(tables.tracking_code_details).delete();
    await knex(tables.carrier).delete();
  },
};
