const { tables } = require("../index");

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.carrier, (table) => {
      table.increments("carrier_id");
      table.boolean("is_active").notNullable();
      table.string("name").notNullable();
      table
        .integer("SUPPLIER_supplier_id")
        .notNullable()
        .unsigned()
        .references(`${tables.supplier}.supplier_id`);
      table
        .integer("TRACKINGCODEDETAILS_tracking_code_details_id")
        .unsigned()
        .references(`${tables.tracking_code_details}.tracking_code_details_id`);
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists(tables.carrier);
  },
};
