const { tables } = require("../index");

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.supplier, (table) => {
      table.increments("supplier_id");
      table.string("address").notNullable();
      table.string("email").notNullable();
      table.string("name").notNullable();
      table.string("phone_number").notNullable();
      table.longText("logo_URL").notNullable();
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists(tables.supplier);
  },
};
