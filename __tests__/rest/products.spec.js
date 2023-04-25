const { tables } = require("../../src/data");
const { withServer } = require("../helpers");

const data = {
  producten: [
    {
      product_id: 1,
      name: "test_product vijf",
      price: 11,
      stock: 5,
      description: "omschrijning test_product 5",
      photo:
        "https://cloudfront.alterego-design.com/media/catalog/product/cache/6/image/9df78eab33525d08d6e5fb8d27136e95/s/p/spano_black_newsite_01_4.jpg?_gl=1*51oyrg*_ga*MTM2NTk4Mjg3OC4xNjgxMjI0MDM5*_ga_Q3T21C0ST5*MTY4MTIyNDAzOC4xLjAuMTY4MTIyNDAzOC42MC4wLjA.&_ga=2.26334013.1693298657.1681224039-1365982878.1681224039",
      deliveryTime: "2d",
    },
    {
      product_id: 2,
      name: "test_product drie",
      price: 5,
      stock: 3,
      description: "omschrijning test_product 3",
      photo:
        "https://cloudfront.alterego-design.com/media/catalog/product/cache/6/image/9df78eab33525d08d6e5fb8d27136e95/s/p/spano_black_newsite_01_4.jpg?_gl=1*51oyrg*_ga*MTM2NTk4Mjg3OC4xNjgxMjI0MDM5*_ga_Q3T21C0ST5*MTY4MTIyNDAzOC4xLjAuMTY4MTIyNDAzOC42MC4wLjA.&_ga=2.26334013.1693298657.1681224039-1365982878.1681224039",
      deliveryTime: "12h",
    },
    {
      product_id: 3,
      name: "test_product vier",
      price: 9,
      stock: 6,
      description: "omschrijning test_product 3",
      photo:
        "https://cloudfront.alterego-design.com/media/catalog/product/cache/6/image/9df78eab33525d08d6e5fb8d27136e95/s/p/spano_black_newsite_01_4.jpg?_gl=1*51oyrg*_ga*MTM2NTk4Mjg3OC4xNjgxMjI0MDM5*_ga_Q3T21C0ST5*MTY4MTIyNDAzOC4xLjAuMTY4MTIyNDAzOC42MC4wLjA.&_ga=2.26334013.1693298657.1681224039-1365982878.1681224039",
      deliveryTime: "1d",
    },
  ],
};

const dataToDelete = {
  producten: [1, 2, 3],
};

describe("product", () => {
  let request;
  let knex;
  let authHeader;

  withServer(({ knex: k, request: r, authHeader: a }) => {
    knex = k;
    request = r;
    authHeader = a;
  });

  const url = "/api/product";

  describe("GET /api/product", () => {
    beforeAll(async () => {
      await knex(tables.product).insert(data.producten);
    });

    afterAll(async () => {
      await knex(tables.product)
        .whereIn("product_id", dataToDelete.producten)
        .delete();
    });

    it("should be 200 and return all products", async () => {
      const response = await request.get(url);
      expect(response.status).toBe(200);
      expect(response.body.count).toBe(3);
      expect(response.body.items[0]).toEqual({
        product_id: 1,
        name: "test_product vijf",
        price: 11,
        stock: 5,
        description: "omschrijning test_product 5",
        photo:
          "https://cloudfront.alterego-design.com/media/catalog/product/cache/6/image/9df78eab33525d08d6e5fb8d27136e95/s/p/spano_black_newsite_01_4.jpg?_gl=1*51oyrg*_ga*MTM2NTk4Mjg3OC4xNjgxMjI0MDM5*_ga_Q3T21C0ST5*MTY4MTIyNDAzOC4xLjAuMTY4MTIyNDAzOC42MC4wLjA.&_ga=2.26334013.1693298657.1681224039-1365982878.1681224039",
        deliveryTime: "2d",
      });
      expect(response.body.items[1]).toEqual({
        product_id: 2,
        name: "test_product drie",
        price: 5,
        stock: 3,
        description: "omschrijning test_product 3",
        photo:
          "https://cloudfront.alterego-design.com/media/catalog/product/cache/6/image/9df78eab33525d08d6e5fb8d27136e95/s/p/spano_black_newsite_01_4.jpg?_gl=1*51oyrg*_ga*MTM2NTk4Mjg3OC4xNjgxMjI0MDM5*_ga_Q3T21C0ST5*MTY4MTIyNDAzOC4xLjAuMTY4MTIyNDAzOC42MC4wLjA.&_ga=2.26334013.1693298657.1681224039-1365982878.1681224039",
        deliveryTime: "12h",
      });
      expect(response.body.items[2]).toEqual({
        product_id: 3,
        name: "test_product vier",
        price: 9,
        stock: 6,
        description: "omschrijning test_product 3",
        photo:
          "https://cloudfront.alterego-design.com/media/catalog/product/cache/6/image/9df78eab33525d08d6e5fb8d27136e95/s/p/spano_black_newsite_01_4.jpg?_gl=1*51oyrg*_ga*MTM2NTk4Mjg3OC4xNjgxMjI0MDM5*_ga_Q3T21C0ST5*MTY4MTIyNDAzOC4xLjAuMTY4MTIyNDAzOC42MC4wLjA.&_ga=2.26334013.1693298657.1681224039-1365982878.1681224039",
        deliveryTime: "1d",
      });
    });
  });

  describe("GET /api/product/id/:productId", () => {
    beforeAll(async () => {
      await knex(tables.product).insert(data.producten);
    });

    afterAll(async () => {
      await knex(tables.product)
        .whereIn("product_id", dataToDelete.producten)
        .delete();
    });

    it("should be 200 and return product with product_id 1", async () => {
      const response = await request.get(
        `${url}/id/${data.producten[0].product_id}`
      );
      expect(response.status).toBe(200);
      expect(response.body.items).toEqual({
        product_id: 1,
        name: "test_product vijf",
        price: 11,
        stock: 5,
        description: "omschrijning test_product 5",
        photo:
          "https://cloudfront.alterego-design.com/media/catalog/product/cache/6/image/9df78eab33525d08d6e5fb8d27136e95/s/p/spano_black_newsite_01_4.jpg?_gl=1*51oyrg*_ga*MTM2NTk4Mjg3OC4xNjgxMjI0MDM5*_ga_Q3T21C0ST5*MTY4MTIyNDAzOC4xLjAuMTY4MTIyNDAzOC42MC4wLjA.&_ga=2.26334013.1693298657.1681224039-1365982878.1681224039",
        deliveryTime: "2d",
      });
    });
    it("should be 401 and return nothing", async () => {
      const response = await request.get(`${url}/id/99`);
      expect(response.status).toBe(401);
    });
  });

  describe("GET /api/product/filter", () => {
    beforeAll(async () => {
      await knex(tables.product).insert(data.producten);
    });

    afterAll(async () => {
      await knex(tables.product)
        .whereIn("product_id", dataToDelete.producten)
        .delete();
    });

    it("should be 200 and return product with product_id 3", async () => {
      const response = await request.get(
        `${url}/filter?startPrice=6&endPrice=10`
      );
      expect(response.status).toBe(200);
      expect(response.body.items.length).toBe(1);
      expect(response.body.items[0]).toEqual({
        product_id: 3,
        name: "test_product vier",
        price: 9,
        stock: 6,
        description: "omschrijning test_product 3",
        photo:
          "https://cloudfront.alterego-design.com/media/catalog/product/cache/6/image/9df78eab33525d08d6e5fb8d27136e95/s/p/spano_black_newsite_01_4.jpg?_gl=1*51oyrg*_ga*MTM2NTk4Mjg3OC4xNjgxMjI0MDM5*_ga_Q3T21C0ST5*MTY4MTIyNDAzOC4xLjAuMTY4MTIyNDAzOC42MC4wLjA.&_ga=2.26334013.1693298657.1681224039-1365982878.1681224039",
        deliveryTime: "1d",
      });
    });
    it("should be 200 and return nothing", async () => {
      const response = await request.get(`${url}/filter?inStock=false`);
      expect(response.status).toBe(200);
      expect(response.body.items.length).toBe(0);
      expect(response.body.items[0]).toEqual();
    });

    it("should be 200 and return nothing", async () => {
      const response = await request.get(`${url}/filter?startPrice=100`);
      expect(response.status).toBe(200);
      expect(response.body.items.length).toBe(0);
      expect(response.body.items[0]).toEqual();
    });
  });

  describe("GET /api/product/name", () => {
    beforeAll(async () => {
      await knex(tables.product).insert(data.producten);
    });

    afterAll(async () => {
      await knex(tables.product)
        .whereIn("product_id", dataToDelete.producten)
        .delete();
    });

    it("should be 200 and return test_product vier", async () => {
      const response = await request.get(`${url}/name/test_product vier`);
      expect(response.status).toBe(200);
      expect(response.body.items).toEqual({
        product_id: 3,
        name: "test_product vier",
        price: 9,
        stock: 6,
        description: "omschrijning test_product 3",
        photo:
          "https://cloudfront.alterego-design.com/media/catalog/product/cache/6/image/9df78eab33525d08d6e5fb8d27136e95/s/p/spano_black_newsite_01_4.jpg?_gl=1*51oyrg*_ga*MTM2NTk4Mjg3OC4xNjgxMjI0MDM5*_ga_Q3T21C0ST5*MTY4MTIyNDAzOC4xLjAuMTY4MTIyNDAzOC42MC4wLjA.&_ga=2.26334013.1693298657.1681224039-1365982878.1681224039",
        deliveryTime: "1d",
      });
    });
    it("should be 401 and return nothing", async () => {
      const response = await request.get(`${url}/name/no_product`);
      expect(response.status).toBe(401);
    });
  });
});
