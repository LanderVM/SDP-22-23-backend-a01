const { tables } = require("../index");

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.user, (table) => {
      table.string("email", 255).primary();
      table.string("username", 255).notNullable();
      table.integer("SUPPLIER_supplier_id").notNullable();
      table.foreign("SUPPLIER_supplier_id").references(`${tables.supplier}.supplier_id`)
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists(tables.user);
  },
};
