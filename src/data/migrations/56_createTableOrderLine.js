const { tables } = require("../index");

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.sub_order_line, (table) => {
      table.increments("order_line_id");
      table.integer("product_count").notNullable();
      table
        .integer("ORDER_order_id")
        .notNullable()
        .unsigned()
        .references(`${tables.sub_order}.sub_order_id`);
      table
        .integer("PRODUCT_product_id")
        .notNullable()
        .unsigned()
        .references(`${tables.product}.product_id`);
      table.decimal("original_acquisition_price").notNullable();
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists(tables.sub_order_line);
  },
};
