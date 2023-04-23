const { tables } = require("../index");

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.order_line, (table) => {
      table.increments("order_line_id");
      table.integer("ORDER_order_id").unsigned()
      table.foreign("ORDER_order_id").references(`${tables.customer_order}.order_id`);
      table.integer("PRODUCT_product_id").unsigned();
      table.foreign().references(`${tables.product}.product_id`);
      table.integer("product_count").notNullable();
      table.double("total_price").notNullable();
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists(tables.order_line);
  },
};
