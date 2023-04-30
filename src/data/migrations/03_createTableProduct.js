const { tables } = require("../index");

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.product, (table) => {
      table.increments("product_id");
      table.string("name", 255).notNullable();
      table.integer("price").notNullable();
      table.integer("stock").notNullable();
      table.string("description").notNullable();
      table.string("brand").notNullable();
      table.string("category").notNullable();
      table.longText("image_URL").notNullable();
      table.string("delivery_time").notNullable();
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists(tables.product);
  },
};
