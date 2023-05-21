const { tables } = require("../index");

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.carrier_contact_person, (table) => {
      table
        .integer("Carrier_carrier_id")
        .unsigned()
        .notNullable()
        .references(`${tables.carrier}.carrier_id`)
        .onDelete("CASCADE")
        .onUpdate("CASCADE")
        .withKeyName("fk_carrier_contact_person_carrier");

      table
        .integer("contactPersonList_contact_person_id")
        .unsigned()
        .notNullable()
        .references(`${tables.contact_person}.contact_person_id`)
        .onDelete("CASCADE")
        .onUpdate("CASCADE")
        .withKeyName("fk_carrier_contact_person_contact_person");

      table.primary([
        "Carrier_carrier_id",
        "contactPersonList_contact_person_id",
      ]);
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists(tables.carrier_contact_person);
  },
};
