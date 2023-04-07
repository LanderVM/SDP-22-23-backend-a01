const { tables } = require("../index");

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.user, (table) => {
      table.increments("user_id");
      table.string("email", 255).notNullable();
      table.string("street", 255).notNullable();
      table.string("box", 255).notNullable();
      table.string("city", 255).notNullable();
      table.string("country", 255).notNullable();
      table.integer("house_number").notNullable();
      table.boolean("is_admin").defaultTo(0);
      table.string("mobile_phone_number", 255).notNullable();
      table.string("name", 255).notNullable();
      table.string("password", 255).notNullable();
      table.integer("postal_code").notNullable();
      table.string("surname", 255).notNullable();
      table.string("phone_number", 255).notNullable();
      table.integer("SUPPLIER_supplier_id").notNullable();
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists(tables.user);
  },
};
