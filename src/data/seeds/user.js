const { tables } = require("../index");

module.exports = {
  seed: async (knex) => {
    await knex(tables.user).insert([
      {
        email: "testMagazijnier@mail.com",
        street: "gentStreet",
        box: "A1",
        city: "Gent",
        country: "Belgium",
        house_number: 23,
        is_admin: 0,
        mobile_phone_number: "0470 25 12 34",
        name: "Magazijnier",
        password: "testMagazijnier",
        postal_code: 9000,
        surname: "Tessa",
        phone_number: "02 70 25 25",
        SUPPLIER_supplier_id: 1,
      },
    ]);
  },
};
