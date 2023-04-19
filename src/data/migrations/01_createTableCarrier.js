const { tables } = require("../index");

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.carrier, (table) => {
      table.increments("carrier_id");
      table.boolean("is_active").notNullable();
      table.string("name", 255).notNullable();
      table.integer("SUPPLIER_supplier_id").notNullable();
      table
        .integer("TRACKINGCODEDETAILS_tracking_code_details_id")
        .unsigned()
        .references("tracking_code_details.tracking_code_details_id");
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists(tables.carrier);
  },
};
