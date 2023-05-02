const { tables } = require("../index");

module.exports = {
  seed: async (knex) => {
    await knex(tables.order).insert([
      {
        order_id: 1,
        order_date: "2023-04-18",
        CUSTOMER_auth0_id: "auth0|644ed8f2dfb8300113c88c32",
      },
      {
        order_id: 2,
        order_date: "2023-04-15",
        CUSTOMER_auth0_id: "auth0|64439bc8bc6509196a8e5990",
      },
      {
        order_id: 3,
        order_date: "2023-04-17",
        CUSTOMER_auth0_id: "auth0|64439bc8bc6509196a8e5990",
      },
    ]);
  },
};
