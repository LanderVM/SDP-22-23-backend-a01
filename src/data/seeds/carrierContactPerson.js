const { tables } = require("../index");

module.exports = {
  seed: async (knex) => {
    await knex(tables.carrier_contact_person).insert([
      {
        carrier_id: 1,
        contact_person_id: 4,
      },
      {
        carrier_id: 2,
        contact_person_id: 5,
      },
      {
        carrier_id: 2,
        contact_person_id: 6,
      },
      {
        carrier_id: 3,
        contact_person_id: 2,
      },
      {
        carrier_id: 3,
        contact_person_id: 3,
      },
      {
        carrier_id: 4,
        contact_person_id: 1,
      },
    ]);
  },
};
