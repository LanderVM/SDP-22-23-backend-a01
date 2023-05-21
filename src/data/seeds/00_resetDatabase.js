const { tables } = require("../index");

module.exports = {
  seed: async (knex) => {
    await knex(tables.user).delete();
    await knex(tables.supplier_contact_person).delete();
    await knex(tables.company_logo).delete();
    await knex(tables.carrier_contact_person).delete();
    await knex(tables.order_notification).delete();
    await knex(tables.packaging).delete();
    await knex(tables.order_line).delete();
    await knex(tables.product).delete();
    await knex(tables.order).delete();
    await knex(tables.contact_person).delete();
    await knex(tables.carrier).delete();
    await knex(tables.tracking_code_details).delete();
    await knex(tables.customer).delete();
    await knex(tables.supplier).delete();
  },
};
