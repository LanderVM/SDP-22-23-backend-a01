const { tables } = require("../index");

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.company_logo, (table) => {
      table.increments("logo_id");
      table.binary("LOGO").notNullable();
      table
        .integer("SUPPLIER_supplier_id")
        .notNullable()
        .unsigned()
        .references(`${tables.supplier}.supplier_id`);
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists(tables.company_logo);
  },
};
