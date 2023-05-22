const { tables } = require("../index");

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.customer, (table) => {
      table.increments("id");
      table.string("auth0_id");
      table.string("email").notNullable();
      table.string("username").notNullable();
      table.longText("image_URL").notNullable();
      table.integer("SUPPLIER_supplier_id").notNullable();
      table
        .integer("supplier_id")
        .notNullable()
        .unsigned()
        .references(`${tables.supplier}.supplier_id`);
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists(tables.customer);
  },
};
