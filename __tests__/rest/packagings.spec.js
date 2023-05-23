const { tables } = require("../../src/data");
const { withServer } = require("../helpers");

const data = {
  customers: [
    {
      id: 10,
      auth0_id: "auth0|64386bcdcaca39fa928508a0", //test account
      email: "test@mail.com",
      username: "Test",
      image_url:
        "https://s.gravatar.com/avatar/97dfebf4098c0f5c16bca61e2b76c373?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fte.png",
      supplier_id: 9,
      SUPPLIER_supplier_id: 10,
    },
  ],
  packagings: [
    {
      packaging_id: 1,
      is_active: true,
      height: 5.5,
      length: 6.6,
      width: 4,
      name: "Medium",
      price: 10,
      packaging_type: 1,
      SUPPLIER_supplier_id: 10,
    },
    {
      packaging_id: 2,
      is_active: true,
      height: 4.5,
      length: 4.5,
      width: 3,
      name: "Medium Short",
      price: 30,
      packaging_type: 1,
      SUPPLIER_supplier_id: 10,
    },
    {
      packaging_id: 3,
      is_active: false,
      height: 4.5,
      length: 6.6,
      width: 5,
      name: "Medium Old",
      price: 14,
      packaging_type: 0,
      SUPPLIER_supplier_id: 10,
    },
  ],
  suppliers: [
    {
      supplier_id: 9,
      delivery_country: "Belgium",
      delivery_city: "Brussel",
      delivery_postal_code: "1200",
      delivery_street: "Hippokrateslaan",
      delivery_house_number: "10",
      delivery_box: "",
      supplier_email: "sales@janInc.com",
      name: "Jan INC",
      phone_number: "0426343211",
      logo_URL:
        "https://static.vecteezy.com/system/resources/previews/002/534/045/original/social-media-twitter-logo-blue-isolated-free-vector.jpg",
    },
    {
      supplier_id: 10,
      delivery_country: "Belgium",
      delivery_city: "Zottegem",
      delivery_postal_code: "9620",
      delivery_street: "Kastanjelaan",
      delivery_house_number: "12",
      delivery_box: "",
      supplier_email: "sales@metaverse.com",
      name: "Meta Verse",
      phone_number: "0479845110",
      logo_URL:
        "https://w7.pngwing.com/pngs/890/957/png-transparent-facebook-metaverse-logo-thumbnail.png",
    },
  ],
};

const dataToDelete = {
  packagings: [1, 2, 3],
  suppliers: [9, 10],
  customers: [10],
};

describe("products", () => {
  let request;
  let knex;
  let authHeader;

  withServer(({ knex: k, request: r, authHeader: a }) => {
    knex = k;
    request = r;
    authHeader = a;
  });

  const url = "/api/packagings";

  describe("GET /api/packagings", () => {
    beforeAll(async () => {
      await knex(tables.supplier).insert(data.suppliers);
      await knex(tables.packaging).insert(data.packagings);
      await knex(tables.customer).insert(data.customers);
    });
    afterAll(async () => {
      await knex(tables.customer)
        .whereIn("id", dataToDelete.customers)
        .delete();
      await knex(tables.packaging)
        .whereIn("packaging_id", dataToDelete.packagings)
        .delete();

      await knex(tables.supplier)
        .whereIn("supplier_id", dataToDelete.suppliers)
        .delete();
    });

    it("should be 200 and return all active packagings", async () => {
      const response = await request.get(url).set("Authorization", authHeader);
      expect(response.status).toBe(200);
      expect(response.body.count).toBe(2);
      expect(response.body.items[0]).toMatchObject({
        SUPPLIER_supplier_id: 10,
        measurements: "6.6 x 4 x 5.5",
        packaging_name: "Medium",
        price: "€ 10.00",
        packaging_id: 1,
      });
      expect(response.body.items[1]).toMatchObject({
        SUPPLIER_supplier_id: 10,
        measurements: "4.5 x 3 x 4.5",
        packaging_name: "Medium Short",
        price: "€ 30.00",
        packaging_id: 2,
      });
    });
  });
});
