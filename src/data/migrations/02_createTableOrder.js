const { tables } = require("../index");

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.customer_order, (table) => {
      table.increments("order_id");
      table.string("delivery_address", 255).notNullable();
      table.date("order_date").notNullable();
      table.decimal("original_acquisition_price").notNullable();
      table.integer("order_status").notNullable();
      table.string("tracking_code", 255);
      table
        .integer("CARRIER_carrier_id")
        .unsigned()
        .references("carrier.carrier_id");
      table.integer("CUSTOMER_supplier_id").notNullable();
      table.integer("PACKAGING_packaging_id").notNullable();
      table.integer("SUPPLIER_supplier_id").notNullable();

      //table.foreign("CARRIER_carrier_id").references("carrier.carrier_id");
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists(tables.customer_order);
  },
};
