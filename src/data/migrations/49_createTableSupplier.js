const { tables } = require("../index");

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.supplier, (table) => {
      table.increments("supplier_id");
      table.string("delivery_country").notNullable();
      table.string("delivery_city").notNullable();
      table.integer("delivery_postal_code").notNullable();
      table.string("delivery_street").notNullable();
      table.integer("delivery_house_number").notNullable();
      table.string("delivery_box");
      table.string("supplier_email").notNullable();
      table.string("name").notNullable();
      table.string("phone_number").notNullable();
      table.longText("logo_URL").notNullable();
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists(tables.supplier);
  },
};
