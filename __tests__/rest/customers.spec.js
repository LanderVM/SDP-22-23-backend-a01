const { tables } = require("../../src/data/index");
const { withServer } = require("../helpers");

const data = {
  customers: [
    {
      auth0_id: "auth0|64386bcdcaca39fa928508a0", //test account
      email: "test@mail.com",
      username: "Test",
      image_url:
        "https://s.gravatar.com/avatar/97dfebf4098c0f5c16bca61e2b76c373?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fte.png",
      SUPPLIER_supplier_id: 1,
    },
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
  ],
  suppliers: [
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
        "https://static.vecteezy.com/ti/gratis-vector/p3/2520838-apple-logo-zwart-geisoleerd-op-transparante-achtergrond-gratis-vector.jpg",
    },
  ],
};

const dataToDelete = {
  customers: [
    "auth0|64386bcdcaca39fa928508a0",
    "auth0|6457cab093ce6d0d9f4dc5fb",
    "auth0|64439bc8bc6509196a8e5990",
  ],
  suppliers: [1, 2],
};

describe("customers", () => {
  let request;
  let knex;
  let authHeader;

  withServer(({ knex: k, request: r, authHeader: a }) => {
    knex = k;
    request = r;
    authHeader = a;
  });

  const url = "/api/customers";

  describe("GET api/customers/me", () => {
    beforeAll(async () => {
      await knex(tables.supplier).insert(data.suppliers);
      await knex(tables.customer).insert(data.customers);
    });
    afterAll(async () => {
      await knex(tables.customer).delete();
      await knex(tables.supplier).delete();
    });

    it("should 200 and return the current customer", async () => {
      const response = await request
        .get(`${url}/me`)
        .set("Authorization", authHeader);
      expect(response.status).toBe(200);
      expect(response.body.count).toBe(1);
      expect(response.body.items).toMatchObject({
        auth0_id: "auth0|64386bcdcaca39fa928508a0",
        user_email: "test@mail.com",
        username: "Test",
        image_URL:
          "https://s.gravatar.com/avatar/97dfebf4098c0f5c16bca61e2b76c373?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fte.png",
        supplier_id: 1,
      });
    });
  });

  describe("GET api/customers/colleagues", () => {
    beforeAll(async () => {
      await knex(tables.supplier).insert(data.suppliers);
      await knex(tables.customer).insert(data.customers);
    });
    afterAll(async () => {
      await knex(tables.customer).delete();
      await knex(tables.supplier).delete();
    });

    it("should 200 and return a colleague", async () => {
      const response = await request
        .get(`${url}/colleagues`)
        .set("Authorization", authHeader);
      expect(response.status).toBe(200);
      expect(response.body.items.length).toBe(1);
      expect(response.body.items[0]).toMatchObject({
        username: "Erik",
        email: "erik@janInc.com",
        image_URL:
          "https://s.gravatar.com/avatar/2463d6b2a517deaaa2e1f4d61a299eed?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fer.png",
      });
    });
  });

  //TO DO
  describe("GET api/customers/orders", () => {
    beforeAll(async () => {
      await knex(tables.supplier).insert(data.suppliers);
      await knex(tables.customer).insert(data.customers);
    });
    afterAll(async () => {
      await knex(tables.customer).delete();
      await knex(tables.supplier).delete();
    });

    it("should 200 and return the orders for the customers company", async () => {
      const response = await request
        .get(`${url}/orders`)
        .set("Authorization", authHeader);
      expect(response.status).toBe(200);
    });
  });
});
