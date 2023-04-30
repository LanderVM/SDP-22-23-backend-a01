const { tables } = require("../index");

module.exports = {
  seed: async (knex) => {
    await knex(tables.supplier).insert([
      {
        supplier_id: 1,
        address: "Timlaan 24 1000 Brussel",
        email: "sales@janInc.com",
        name: "Tim CO",
        phone_number: "0426343211",
        logo_URL:
          "https://static.vecteezy.com/system/resources/previews/002/534/045/original/social-media-twitter-logo-blue-isolated-free-vector.jpg",
      },
      {
        supplier_id: 2,
        address: "Janstraat 12 9000 Aalst",
        email: "sales@timCo.com",
        name: "Jan INC",
        phone_number: "0456443212",
        logo_URL:
          "https://static.vecteezy.com/ti/gratis-vector/p3/2520838-apple-logo-zwart-geisoleerd-op-transparante-achtergrond-gratis-vector.jpg",
      },
    ]);
  },
};
