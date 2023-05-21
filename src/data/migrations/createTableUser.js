const { tables } = require("../index");

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.user, (table) => {
      table.increments("user_id");
      table.string("email").notNullable();
      table.string("street").notNullable();
      table.string("box").notNullable();
      table.string("city").notNullable();
      table.string("country").notNullable();
      table.integer("house_number").notNullable();
      table.boolean("is_admin").notNullable().defaultTo(false);
      table.string("name").notNullable();
      table.string("password").notNullable();
      table.string("postal_code").notNullable();
      table.string("surname").notNullable();
      table.string("phone_number").notNullable();
      table
        .integer("SUPPLIER_supplier_id")
        .notNullable()
        .unsigned()
        .references(`${tables.supplier}.supplier_id`);
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists(tables.user);
  },
};
