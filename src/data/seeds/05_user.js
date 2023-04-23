const { tables } = require("../index");

module.exports = {
  seed: async (knex) => {
    await knex(tables.customer).insert([
      {
        email: "erik@janInc.com",
        username: "jan",
        SUPPLIER_supplier_id: 1,
      },
      {
        email: "bert@timCo.com",
        username: "bert",
        SUPPLIER_supplier_id: 2,
      },{
        email: "testOrderPlaatsen@mail.com",
        username: "bert",
        SUPPLIER_supplier_id: 3,
      },
    ]);
  },
};
