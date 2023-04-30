const { tables } = require("../index");

module.exports = {
  seed: async (knex) => {
    await knex(tables.customer).insert([
      {
        auth0_id: "auth0|644ed8f2dfb8300113c88c32",
        email: "erik@janInc.com",
        username: "Erik",
        SUPPLIER_supplier_id: 1,
      },
      {
        auth0_id: "auth0|64439bc8bc6509196a8e5990",
        email: "bert@timCo.com",
        username: "Bert",
        SUPPLIER_supplier_id: 2,
      },
    ]);
  },
};
