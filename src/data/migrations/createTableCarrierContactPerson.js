const { tables } = require("../index");

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.carrier_contact_person, (table) => {
      table
        .integer("carrier_id")
        .unsigned()
        .notNullable()
        .references(`${tables.carrier}.carrier_id`)
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table
        .integer("contact_person_id")
        .unsigned()
        .notNullable()
        .references(`${tables.contact_person}.contact_person_id`)
        .onDelete("CASCADE")
        .onUpdate("CASCADE");

      table.primary(["carrier_id", "contact_person_id"]);
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists(tables.carrier_contact_person);
  },
};
