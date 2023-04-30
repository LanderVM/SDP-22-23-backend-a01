const { tables } = require("../../src/data");
const { withServer } = require("../helpers");

const data = {
  products: [
    {
      product_id: 1,
      name: "iPhone 9",
      description: "An apple mobile which is nothing like apple",
      price: 549,
      stock: 94,
      brand: "Apple",
      category: "smartphones",
      image_URL: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
    },
    {
      product_id: 2,
      name: "iPhone X",
      description:
        "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
      price: 899,
      stock: 34,
      brand: "Apple",
      category: "smartphones",
      image_URL: "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
    },
    {
      product_id: 3,
      name: "Samsung Universe 9",
      description:
        "Samsung's new variant which goes beyond Galaxy to the Universe",
      price: 1249,
      stock: 36,
      brand: "Samsung",
      category: "smartphones",
      image_URL: "https://i.dummyjson.com/data/products/3/thumbnail.jpg",
    },
  ],
};

const dataToDelete = {
  products: [1, 2, 3],
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

  const url = "/api/products";

  describe("GET /api/products", () => {
    beforeAll(async () => {
      await knex(tables.product).insert(data.products);
    });

    afterAll(async () => {
      await knex(tables.product)
        .whereIn("product_id", dataToDelete.products)
        .delete();
    });

    it("should be 200 and return all products", async () => {
      const response = await request.get(url);
      expect(response.status).toBe(200);
      expect(response.body.count).toBe(3);
      expect(response.body.items[0]).toEqual({
        product_id: 1,
        name: "iPhone 9",
        description: "An apple mobile which is nothing like apple",
        price: 549,
        stock: 94,
        brand: "Apple",
        category: "smartphones",
        image_URL: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
      });
      expect(response.body.items[1]).toEqual({
        product_id: 2,
        name: "iPhone X",
        description:
          "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
        price: 899,
        stock: 34,
        brand: "Apple",
        category: "smartphones",
        image_URL: "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
      });
      expect(response.body.items[2]).toEqual({
        product_id: 3,
        name: "Samsung Universe 9",
        description:
          "Samsung's new variant which goes beyond Galaxy to the Universe",
        price: 1249,
        stock: 36,
        brand: "Samsung",
        category: "smartphones",
        image_URL: "https://i.dummyjson.com/data/products/3/thumbnail.jpg",
      });
    });
  });

  describe("GET /api/products/id/:productId", () => {
    beforeAll(async () => {
      await knex(tables.product).insert(data.products);
    });

    afterAll(async () => {
      await knex(tables.product)
        .whereIn("product_id", dataToDelete.products)
        .delete();
    });

    it("should be 200 and return product iPhone 9", async () => {
      const response = await request.get(`${url}/id/1`);
      expect(response.status).toBe(200);
      expect(response.body.items).toEqual({
        product_id: 1,
        name: "iPhone 9",
        description: "An apple mobile which is nothing like apple",
        price: 549,
        stock: 94,
        brand: "Apple",
        category: "smartphones",
        image_URL: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
      });
    });
    it("should be 401 and return nothing", async () => {
      const response = await request.get(`${url}/id/99`);
      expect(response.status).toBe(401);
    });
  });

  describe("GET /api/products/filter", () => {
    beforeAll(async () => {
      await knex(tables.product).insert(data.products);
    });

    afterAll(async () => {
      await knex(tables.product)
        .whereIn("product_id", dataToDelete.products)
        .delete();
    });

    it("should be 200 and return product iPhone X", async () => {
      const response = await request.get(
        `${url}/filter?startPrice=800&endPrice=900`
      );
      expect(response.status).toBe(200);
      expect(response.body.items.length).toBe(1);
      expect(response.body.items[0]).toEqual({
        product_id: 2,
        name: "iPhone X",
        description:
          "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
        price: 899,
        stock: 34,
        brand: "Apple",
        category: "smartphones",
        image_URL: "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
      });
    });
    it("should be 200 and return nothing", async () => {
      const response = await request.get(`${url}/filter?inStock=false`);
      expect(response.status).toBe(200);
      expect(response.body.items.length).toBe(0);
      expect(response.body.items[0]).toEqual();
    });

    it("should be 200 and return nothing", async () => {
      const response = await request.get(`${url}/filter?startPrice=90000`);
      expect(response.status).toBe(200);
      expect(response.body.items.length).toBe(0);
      expect(response.body.items[0]).toEqual();
    });
  });

  describe("GET /api/products/name", () => {
    beforeAll(async () => {
      await knex(tables.product).insert(data.products);
    });

    afterAll(async () => {
      await knex(tables.product)
        .whereIn("product_id", dataToDelete.products)
        .delete();
    });

    it("should be 200 and return iPhone 9", async () => {
      const response = await request.get(`${url}/name/iPhone 9`);
      expect(response.status).toBe(200);
      expect(response.body.items).toEqual({
        product_id: 1,
        name: "iPhone 9",
        description: "An apple mobile which is nothing like apple",
        price: 549,
        stock: 94,
        brand: "Apple",
        category: "smartphones",
        image_URL: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
      });
    });
    it("should be 401 and return nothing", async () => {
      const response = await request.get(`${url}/name/no_product`);
      expect(response.status).toBe(401);
    });
  });
});
