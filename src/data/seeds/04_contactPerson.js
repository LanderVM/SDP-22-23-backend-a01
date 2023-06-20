const { tables } = require("../index");

module.exports = {
  seed: async (knex) => {
    await knex(tables.contact_person).insert([
      {
        contact_person_id: 1,
        email: "BramDeVries@post.nl",
        phone_number: "0491 87 65 43",
      },
      {
        contact_person_id: 2,
        email: "ThijsJansen@bpost.be",
        phone_number: "0479 12 34 56",
      },
      {
        contact_person_id: 3,
        email: "EvaBakker@bpost.be",
        phone_number: "0499 33 44 55",
      },
      {
        contact_person_id: 4,
        email: "LucasJacobs@post.nl",
        phone_number: "0493 23 45 67",
      },
      {
        contact_person_id: 5,
        email: "SaraMulder@bpost.be",
        phone_number: "0474 87 65 43",
      },
      {
        contact_person_id: 6,
        email: "DaanVanDerLinden@bpost.be",
        phone_number: "0479 55 44 33",
      },
    ]);
  },
};
