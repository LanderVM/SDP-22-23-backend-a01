const { tables } = require("../index");

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.customer, (table) => {
      table.string("email_id", 255).primary();
      table.string("username", 255).notNullable();
      table.integer("SUPPLIER_supplier_id").notNullable();
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists(tables.customer);
  },
};
