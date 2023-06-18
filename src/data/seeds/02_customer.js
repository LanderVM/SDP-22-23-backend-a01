const { tables } = require("../index");

module.exports = {
  seed: async (knex) => {
    await knex(tables.customer).insert([
      {
        id: 1,
        auth0_id: "auth0|64386bcdcaca39fa928508a0", //test account
        email: "test@mail.com",
        username: "Test",
        image_url:
          "https://s.gravatar.com/avatar/97dfebf4098c0f5c16bca61e2b76c373?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fte.png",
        supplier_id: 1,
        SUPPLIER_supplier_id: 3,
      },
      {
        id: 2,
        auth0_id: "auth0|644ed8f2dfb8300113c88c32",
        email: "erik@janInc.com",
        username: "Erik",
        image_url:
          "https://s.gravatar.com/avatar/2463d6b2a517deaaa2e1f4d61a299eed?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fer.png",
        supplier_id: 1,
        SUPPLIER_supplier_id: 3,
      },
      {
        id: 3,
        auth0_id: "auth0|6457cab093ce6d0d9f4dc5fb",
        email: "erika@janInc.com",
        username: "Erika",
        image_url:
          "https://s.gravatar.com/avatar/2968a161670d0ed0c6d26961529ac953?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fer.png",
        supplier_id: 1,
        SUPPLIER_supplier_id: 3,
      },
      {
        id: 4,
        auth0_id: "auth0|648f79553cedf9f3adc7c59c",
        email: "berttimco@gmail.com",
        username: "Bert",
        image_url:
          "https://s.gravatar.com/avatar/74d81d6aada690a1b114800a2c3dcec8?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fbe.png",
        supplier_id: 2,
        SUPPLIER_supplier_id: 3,
      },
      {
        id: 5,
        auth0_id: "auth0|6457cb06896616a9beeb91b0",
        email: "bart@timCo.com",
        username: "Bart",
        image_url:
          "https://s.gravatar.com/avatar/bfcfa4a79d8e219a21cd65a1759a6205?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fba.png",
        supplier_id: 2,
        SUPPLIER_supplier_id: 3,
      },
      {
        id: 6,
        auth0_id: "auth0|6457cb4fdad598694bc7f6cf",
        email: "berta@timCo.com",
        username: "Berta",
        image_url:
          "https://s.gravatar.com/avatar/ec14e0034e64ea808a11a89cce82765e?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fbe.png",
        supplier_id: 2,
        SUPPLIER_supplier_id: 3,
      },
    ]);
  },
};
