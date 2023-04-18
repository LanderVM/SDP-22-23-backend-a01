const { tables } = require("../index");

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.customer_order, (table) => {
      table.increments("order_id");
      table.string("delivery_address", 255).notNullable();
      table.date("order_date").notNullable();
      table.decimal("original_acquisition_price").notNullable();
      table.integer("order_status").notNullable();
      table.string("tracking_code");
      table.string("CARRIER_carrier_id");
      table.string("CUSTOMER_supplier_id").notNullable();
      table.string("PACKAGING_packaging_id").notNullable();
      table.string("SUPPLIER_supplier_id").notNullable();
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists(tables.customer_order);
  },
};
