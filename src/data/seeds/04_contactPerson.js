const { tables } = require("../index");

module.exports = {
  seed: async (knex) => {
    await knex(tables.contact_person).insert([
      {
        contact_person_id: 1,
        email: "twee@post.nl",
        phone_number: "899321480",
      },
      {
        contact_person_id: 2,
        email: "vier@bpost.be",
        phone_number: "479554433",
      },
      {
        contact_person_id: 3,
        email: "drie@bpost.be",
        phone_number: "499334455",
      },
      {
        contact_person_id: 4,
        email: "een@post.nl",
        phone_number: "899321480",
      },
      {
        contact_person_id: 5,
        email: "een@bpost.be",
        phone_number: "499334455",
      },
      {
        contact_person_id: 6,
        email: "twee@bpost.be",
        phone_number: "479554433",
      },
    ]);
  },
};
