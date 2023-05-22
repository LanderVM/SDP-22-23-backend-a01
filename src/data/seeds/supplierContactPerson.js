const { tables } = require("../index");

module.exports = {
  seed: async (knex) => {
    await knex(tables.supplier_contact_person).insert([
      {
        email_id: "bert.bratwurst@gmail.com",
        full_name: "Bert Bratwurst",
        SUPPLIER_supplier_id: 3,
      },
      {
        email_id: "elke.daems@gmail.com",
        full_name: "Elke Daems",
        SUPPLIER_supplier_id: 3,
      },
      {
        email_id: "erik.tanner@gmail.com",
        full_name: "Erik Tanner",
        SUPPLIER_supplier_id: 3,
      },
      {
        email_id: "jan.jaap@gmail.com",
        full_name: "Jan Jaap",
        SUPPLIER_supplier_id: 3,
      },
    ]);
  },
};
