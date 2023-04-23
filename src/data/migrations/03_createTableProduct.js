const { tables } = require("../index");

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.product, (table) => {
      table.increments("product_id");
      table.string("name", 255).notNullable();
      table.integer("price").notNullable();
      table.integer("stock").notNullable();
      table.string("description").notNullable();
      table.longText("photo").notNullable();
      table.string("deliveryTime").notNullable();
      table.integer("supplier_id").unsigned();
      table.foreign("supplier_id").references(`${tables.supplier}.supplier_id`)
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists(tables.product);
  },
};
