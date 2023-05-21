const { tables } = require("../index");

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.supplier_contact_person, (table) => {
      table.string("email_id").primary();
      table.string("full_name").notNullable();
      table
        .integer("SUPPLIER_supplier_id")
        .notNullable()
        .unsigned()
        .references(`${tables.supplier}.supplier_id`);
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists(tables.supplier_contact_person);
  },
};
