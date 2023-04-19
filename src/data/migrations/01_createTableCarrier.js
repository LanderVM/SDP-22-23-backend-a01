const { tables } = require("../index");

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.carrier, (table) => {
      table.increments("carrier_id").unsigned();
      table.boolean("is_active").notNullable();
      table.string("name", 255).notNullable();
      table.integer("SUPPLIER_supplier_id").notNullable();
      table
        .integer("TRACKINGCODEDETAILS_tracking_code_details_id")
        .notNullable();
      /*
      table
        .foreign("carrier_id")
        .references("customer_order.CARRIER_carrier_id");*/
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists(tables.carrier);
  },
};
