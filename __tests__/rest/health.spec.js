const { tables } = require("../../src/data");
const { withServer } = require("../helpers");

describe("health", () => {
  let request;
  let knex;
  let authHeader;

  withServer(({ knex: k, request: r, authHeader: a }) => {
    knex = k;
    request = r;
    authHeader = a;
  });

  const url = "/api";

  describe("GET /api/ping", () => {
    it("should be 200 and return pong", async () => {
      const response = await request.get(`${url}/ping`);
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        pong: true,
      });
    });

    it("should be 200 and return version", async () => {
      const response = await request.get(`${url}/version`);
      expect(response.status).toBe(200);
      const { version, name, env } = response.body;

      expect(version).toBeDefined();
      expect(name).toBeDefined();
      expect(env).toBeDefined();
    });
  });
});
