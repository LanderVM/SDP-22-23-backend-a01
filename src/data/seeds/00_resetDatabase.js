const { tables } = require("../index");

module.exports = {
  seed: async (knex) => {
    await knex(tables.customer).delete();
    await knex(tables.supplier).delete();
    await knex(tables.order_line).delete();
    await knex(tables.product).delete();
    await knex(tables.customer_order).delete();
    await knex(tables.carrier).delete();
    await knex(tables.tracking_code_details).delete();
  },
};
