const { tables } = require("../../src/data/index");
const { withServer } = require("../helpers");

const data = {
  customers: [
    {
      auth0_id: "auth0|644ed8f2dfb8300113c88c32",
      email: "erik@janInc.com",
      username: "Erik",
      image_url:
        "https://s.gravatar.com/avatar/2463d6b2a517deaaa2e1f4d61a299eed?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fer.png",
      SUPPLIER_supplier_id: 1,
    },
    {
      auth0_id: "auth0|6457cab093ce6d0d9f4dc5fb",
      email: "erika@janInc.com",
      username: "Erika",
      image_url:
        "https://s.gravatar.com/avatar/2968a161670d0ed0c6d26961529ac953?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fer.png",
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
};

const dataToDelete = {
  customers: [
    "auth0|644ed8f2dfb8300113c88c32",
    "auth0|6457cab093ce6d0d9f4dc5fb",
    "auth0|64439bc8bc6509196a8e5990",
  ],
};

describe("customers", () => {
  let server;
  let request;
  let knex;

  withServer(({ knex: k, request: r, authHeader: a }) => {
    knex = k;
    request = r;
    authHeader = a;
  });

  const url = "/api/customers";

  describe("GET api/customers", () => {
    beforeAll(async () => {
      await knex(tables.customer).insert(data.customers);
    });

    afterAll(async () => {
      await knex(tables.customer)
        .whereIn("auth0_id", dataToDelete.customers)
        .delete();
    });

    it("should 200 and return the requested customer by auth0id", async () => {
      const response = await request.get(`${url}/me`);
      // Geeft geen data terug want test behoort niet tot bedrijf
      expect(response.status).toBe(200);
      expect(response.body.count).toBe(1);
      expect(response.body.items).toEqual({
        email_id: "erik@janInc.com",
        username: "jan",
        SUPPLIER_supplier_id: 1,
      });
    });

    it("should 401 and return nothing", async () => {
      const email = "error";
      const response = await request.get(`${url}/${email}`);
      expect(response.status).toBe(401);
    });
  });
});
