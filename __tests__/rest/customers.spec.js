const { tables } = require("../../src/data/index");
const { withServer } = require("../helpers");

const data = {
  customers: [
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
    {
      email_id: "tyson@farma.com",
      username: "tyson",
      SUPPLIER_supplier_id: 3,
    },
  ],
};

const dataToDelete = {
  customers: ["erik@janInc.com", "bert@timCo.com", "tyson@farma.com"],
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
        .whereIn("email_id", dataToDelete.customers)
        .delete();
    });

    it("should 200 and return the requested customer by email", async () => {
      const email = "erik@janInc.com";
      const response = await request.get(`${url}/${email}`);
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
