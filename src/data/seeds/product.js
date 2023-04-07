const { tables } = require("../index");

module.exports = {
  seed: async (knex) => {
    await knex(tables.product).insert([
      {
        product_id: 1,
        name: "test_product vijf",
        price: 11,
      },
      {
        product_id: 2,
        name: "test_product drie",
        price: 5,
      },
      {
        product_id: 3,
        name: "test_product vier",
        price: 9,
      },
      {
        product_id: 4,
        name: "test_product een",
        price: 1,
      },
      {
        product_id: 5,
        name: "test_product twee",
        price: 2,
      },
    ]);
  },
};
