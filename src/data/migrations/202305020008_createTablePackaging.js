const { tables } = require("../index");

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.packaging, (table) => {
      table.increments("packaging_id");
      table.boolean("is_active").notNullable();
      table.double("height").notNullable();
      table.double("length").notNullable();
      table.double("width").notNullable();
      table.string("name").notNullable();
      table.decimal("price").notNullable();
      table.integer("packaging_type").notNullable();
      table
        .integer("SUPPLIER_supplier_id")
        .notNullable()
        .unsigned()
        .references(`${tables.supplier}.supplier_id`);
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists(tables.packaging);
  },
};
