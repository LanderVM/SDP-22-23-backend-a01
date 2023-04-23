const { tables } = require("../index");

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.supplier, (table) => {
      table.increments("supplier_id");
      table.string("address",255).notNullable();
      table.string("email",255).notNullable();
      table.string("name", 255).notNullable();
      table.integer("phone_number").notNullable();
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists(tables.supplier);
  },
};