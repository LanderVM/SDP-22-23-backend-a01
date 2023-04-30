const { tables } = require("../index");

module.exports = {
  seed: async (knex) => {
    await knex(tables.customer).insert([
      {
        auth0_id: "auth0|644ed8f2dfb8300113c88c32",
        email: "erik@janInc.com",
        username: "Erik",
        image_url:
          "https://s.gravatar.com/avatar/2463d6b2a517deaaa2e1f4d61a299eed?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fer.png",
        SUPPLIER_supplier_id: 1,
      },
      {
        auth0_id: "auth0|64439bc8bc6509196a8e5990",
        email: "bert@timCo.com",
        username: "Bert",
        image_url:
          "https://s.gravatar.com/avatar/74d81d6aada690a1b114800a2c3dcec8?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fbe.png",
        SUPPLIER_supplier_id: 2,
      },
    ]);
  },
};
