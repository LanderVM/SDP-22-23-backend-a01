const { tables } = require("../index");

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.tracking_code_details, (table) => {
      table.increments("tracking_code_details_id");
      table.integer("character_count").notNullable();
      table.boolean("is_integers_only").notNullable();
      table.string("tracking_code_prefix", 255).notNullable();
      table.string("verification_type", 255).notNullable();
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists(tables.tracking_code_details);
  },
};
