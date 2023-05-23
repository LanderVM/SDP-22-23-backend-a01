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
      delivery_time: "12h",
      supplier_id: 4,
    },
    {
      product_id: 2,
      name: "iPhone X",
      description:
        "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
      price: 899,
      stock: 0,
      brand: "Apple",
      category: "smartphones",
      image_URL: "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
      delivery_time: "1d",
      supplier_id: 4,
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
      delivery_time: "3d",
      supplier_id: 4,
    },
  ],
  suppliers: [
    {
      supplier_id: 4,
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
  products: [1, 2, 3],
  suppliers: [4],
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
      await knex(tables.supplier).insert(data.suppliers);
      await knex(tables.product).insert(data.products);
    });
    afterAll(async () => {
      await knex(tables.product)
        .whereIn("product_id", dataToDelete.products)
        .delete();

      await knex(tables.supplier)
        .whereIn("supplier_id", dataToDelete.suppliers)
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
        delivery_time: "12h",
        supplier_id: 4,
      });
      expect(response.body.items[1]).toEqual({
        product_id: 2,
        name: "iPhone X",
        description:
          "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
        price: 899,
        stock: 0,
        brand: "Apple",
        category: "smartphones",
        image_URL: "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
        delivery_time: "1d",
        supplier_id: 4,
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
        delivery_time: "3d",
        supplier_id: 4,
      });
    });

    it("should be 200 and return product iPhone X", async () => {
      const response = await request.get(`${url}?startPrice=500&endPrice=600`);
      expect(response.status).toBe(200);
      expect(response.body.items.length).toBe(1);
      expect(response.body.items[0]).toMatchObject({
        product_id: 1,
        name: "iPhone 9",
        price: 549,
        stock: 94,
      });
    });

    it("should be 200 and return 1 item with no stock", async () => {
      const response = await request.get(`${url}?inStock=false`);
      expect(response.status).toBe(200);
      expect(response.body.items.length).toBe(3);
      expect(response.body.items[1]).toHaveProperty("stock", 0);
    });

    it("should be 200 and return nothing", async () => {
      const response = await request.get(`${url}?startPrice=90000`);
      expect(response.status).toBe(200);
      expect(response.body.items.length).toBe(0);
    });
  });

  describe("GET /api/products/ids/:productId", () => {
    beforeAll(async () => {
      await knex(tables.supplier).insert(data.suppliers);
      await knex(tables.product).insert(data.products);
    });
    afterAll(async () => {
      await knex(tables.product)
        .whereIn("product_id", dataToDelete.products)
        .delete();

      await knex(tables.supplier)
        .whereIn("supplier_id", dataToDelete.suppliers)
        .delete();
    });

    it("should be 200 and return product iPhone 9", async () => {
      const response = await request.get(`${url}/ids?productId=1`);
      expect(response.status).toBe(200);
      expect(response.body.items.length).toBe(1);
      expect(response.body.items[0]).toMatchObject({
        product_id: 1,
        name: "iPhone 9",
        price: 549,
        stock: 94,
      });
    });

    it("should be 401 and return nothing", async () => {
      const response = await request.get(`${url}/ids?productId=990`);
      expect(response.status).toBe(401);
    });
  });

  describe("GET /api/products/categories", () => {
    beforeAll(async () => {
      await knex(tables.supplier).insert(data.suppliers);
      await knex(tables.product).insert(data.products);
    });
    afterAll(async () => {
      await knex(tables.product)
        .whereIn("product_id", dataToDelete.products)
        .delete();

      await knex(tables.supplier)
        .whereIn("supplier_id", dataToDelete.suppliers)
        .delete();
    });

    it("should be 200 and return all categories", async () => {
      const response = await request.get(`${url}/categories`);
      expect(response.status).toBe(200);
      expect(response.body.items.length).toBe(1);
      expect(response.body.items[0]).toHaveProperty("category", "smartphones");
    });
  });

  describe("GET /api/products/brands", () => {
    beforeAll(async () => {
      await knex(tables.supplier).insert(data.suppliers);
      await knex(tables.product).insert(data.products);
    });
    afterAll(async () => {
      await knex(tables.product)
        .whereIn("product_id", dataToDelete.products)
        .delete();

      await knex(tables.supplier)
        .whereIn("supplier_id", dataToDelete.suppliers)
        .delete();
    });

    it("should be 200 and return all brands", async () => {
      const response = await request.get(`${url}/brands`);
      expect(response.status).toBe(200);
      expect(response.body.items.length).toBe(2);
      expect(response.body.items[0]).toHaveProperty("brand", "Apple");
      expect(response.body.items[1]).toHaveProperty("brand", "Samsung");
    });
  });

  describe("GET /api/products/brands", () => {
    beforeAll(async () => {
      await knex(tables.supplier).insert(data.suppliers);
      await knex(tables.product).insert(data.products);
    });
    afterAll(async () => {
      await knex(tables.product)
        .whereIn("product_id", dataToDelete.products)
        .delete();

      await knex(tables.supplier)
        .whereIn("supplier_id", dataToDelete.suppliers)
        .delete();
    });

    it("should be 200 and return the highest product price", async () => {
      const response = await request.get(`${url}/highestPrice`);
      expect(response.status).toBe(200);
      expect(response.body.count).toBe(1);
      expect(response.body.items).toHaveProperty("price", 1249);
    });
  });
});
