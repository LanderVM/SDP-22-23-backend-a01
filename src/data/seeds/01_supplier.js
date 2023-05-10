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
        supplier_email: "sales@janInc.com",
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
        supplier_email: "sales@timCo.com",
        name: "Jan INC",
        phone_number: "0456443212",
        logo_URL:
          "https://1000logos.net/wp-content/uploads/2016/10/Apple-Logo.png",
      },
      {
        supplier_id: 3,
        delivery_country: "Belgium",
        delivery_city: "Aalst",
        delivery_postal_code: "9300",
        delivery_street: "Bosstraat",
        delivery_house_number: "72",
        delivery_box: "A",
        supplier_email: "sales@bartInc.com",
        name: "Bart INC",
        phone_number: "0488449921",
        logo_URL:
          "https://w7.pngwing.com/pngs/716/152/png-transparent-rolex-daytona-logo-brand-watch-rolex-text-rolex-ai-thumbnail.png",
      },
    ]);
  },
};
