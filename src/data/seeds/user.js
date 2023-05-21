const { tables } = require("../index");

module.exports = {
  seed: async (knex) => {
    await knex(tables.user).insert([
      {
        user_id: 1,
        email: "testAdmin@mail.com",
        street: "doeStreet",
        box: "B2",
        city: "Aalst",
        country: "Belgium",
        house_number: 23,
        is_admin: 1,
        name: "Admin",
        password: "testAdmin",
        postal_code: "9300",
        surname: "Test",
        phone_number: "0470 25 25 25",
        SUPPLIER_supplier_id: 2,
      },
      {
        user_id: 2,
        email: "testMagazijnier@mail.com",
        street: "gentStreet",
        box: "A1",
        city: "Gent",
        country: "Belgium",
        house_number: 23,
        is_admin: 0,
        name: "Magazijnier",
        password: "testMagazijnier",
        postal_code: "9300",
        surname: "Tessa",
        phone_number: "0470 25 12 34",
        SUPPLIER_supplier_id: 1,
      },
    ]);
  },
};
