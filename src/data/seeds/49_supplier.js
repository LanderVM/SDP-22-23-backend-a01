const { tables } = require("../index");

module.exports = {
  seed: async (knex) => {
    await knex(tables.supplier).insert([
      {
        supplier_id: 1,
        delivery_country: "Belgium",
        delivery_city: "Brussel",
        delivery_postal_code: "1200",
        delivery_street: "Hippokrateslaan",
        delivery_house_number: "10",
        delivery_box: "",
        email: "sales@janInc.com",
        name: "Tim CO",
        phone_number: "0426343211",
        logo_URL:
          "https://static.vecteezy.com/system/resources/previews/002/534/045/original/social-media-twitter-logo-blue-isolated-free-vector.jpg",
      },
      {
        supplier_id: 2,
        delivery_country: "Belgium",
        delivery_city: "Aalst",
        delivery_postal_code: "9300",
        delivery_street: "Merestraat",
        delivery_house_number: "80",
        delivery_box: "B",
        email: "sales@timCo.com",
        name: "Jan INC",
        phone_number: "0456443212",
        logo_URL:
          "https://static.vecteezy.com/ti/gratis-vector/p3/2520838-apple-logo-zwart-geisoleerd-op-transparante-achtergrond-gratis-vector.jpg",
      },
    ]);
  },
};
