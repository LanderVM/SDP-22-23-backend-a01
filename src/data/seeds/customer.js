const { tables } = require("../index");

module.exports = {
  seed: async (knex) => {
    await knex(tables.customer).insert([
      {
        email_id: "erik@janInc.com",
        username: "jan",
        SUPPLIER_supplier_id: 1,
      },
      {
        email_id: "bert@timCo.com",
        username: "bert",
        SUPPLIER_supplier_id: 2,
      },
    ]);
  },
};
