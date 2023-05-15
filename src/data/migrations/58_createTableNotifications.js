const { tables } = require("../index");

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.order_notification, (table) => {
      table.increments("notification_id");
      table.date("order_date");
      table
        .integer("CUSTOMER_supplier_id")
        .notNullable()
        .unsigned()
        .references(`${tables.supplier}.supplier_id`);
      table
        .integer("ORDER_order_id")
        .notNullable()
        .unsigned()
        .references(`${tables.order}.order_id`);
      table.boolean("is_read");
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists(tables.order_notification);
  },
};
