const { tables } = require("../index");

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.contact_person, (table) => {
      table.increments("contact_person_id");
      table.string("email").notNullable();
      table.string("phone_number").notNullable();
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists(tables.contact_person);
  },
};
