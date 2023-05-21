const { tables } = require("../index");

module.exports = {
  seed: async (knex) => {
    await knex(tables.carrier_contact_person).insert([
      {
        Carrier_carrier_id: 1,
        contactPersonList_contact_person_id: 4,
      },
      {
        Carrier_carrier_id: 2,
        contactPersonList_contact_person_id: 5,
      },
      {
        Carrier_carrier_id: 2,
        contactPersonList_contact_person_id: 6,
      },
      {
        Carrier_carrier_id: 3,
        contactPersonList_contact_person_id: 2,
      },
      {
        Carrier_carrier_id: 3,
        contactPersonList_contact_person_id: 3,
      },
      {
        Carrier_carrier_id: 4,
        contactPersonList_contact_person_id: 1,
      },
    ]);
  },
};
