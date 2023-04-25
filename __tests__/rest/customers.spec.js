const supertest = require("supertest");
const createServer = require("../../src/createServer");
const { getKnex, tables } = require("../../src/data/index");
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
  //let server;
  let request;
  let knex;

  /*beforeAll(async () => {
		server = await createServer();
		request = supertest(server.getApp().callback());
		knex = getKnex();
	})

  afterAll(async () => {
		await server.stop();
	});*/

  withServer(({ knex: k, request: r, authHeader: a }) => {
    knex = k;
    request = r;
    authHeader = a;
  });

  const url = "/api/customer";

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
      const response = await request.get(`${url}/email/${email}`);
      expect(response.status).toBe(200);
      expect(response.body.count).toBe(1);
      expect(response.body.items).toMatchObject(data.customers[0]);
    });

    it("should 401", async () => {
      const email = "error";
      const response = await request.get(`${url}/email/${email}`);
      expect(response.status).toBe(401);
    });

    it("should 200 and return the requested customer by supplierId", async () => {
      const supId = 1;
      const response = await request.get(`${url}/supplierId/${supId}`);
      expect(response.status).toBe(200);
      expect(response.body.count).toBe(1);
      expect(response.body.items).toMatchObject(data.customers[0]);
    });

    it("should 401", async () => {
      const supId = 419;
      const response = await request.get(`${url}/supplierId/${supId}`);
      expect(response.status).toBe(401);
    });
  });
});
