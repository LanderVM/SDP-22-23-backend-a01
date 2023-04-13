const { tables } = require("../index");

module.exports = {
  seed: async (knex) => {
    await knex(tables.product).insert([
      {
        product_id: 1,
        name: "test_product vijf",
        price: 11,
        stock: 5,
        description: "omschrijning test_product 5",
        photo: "https://cloudfront.alterego-design.com/media/catalog/product/cache/6/image/9df78eab33525d08d6e5fb8d27136e95/s/p/spano_black_newsite_01_4.jpg?_gl=1*51oyrg*_ga*MTM2NTk4Mjg3OC4xNjgxMjI0MDM5*_ga_Q3T21C0ST5*MTY4MTIyNDAzOC4xLjAuMTY4MTIyNDAzOC42MC4wLjA.&_ga=2.26334013.1693298657.1681224039-1365982878.1681224039",
        age: new Date()
      },
      {
        product_id: 2,
        name: "test_product drie",
        price: 5,
        stock: 3,
        description: "omschrijning test_product 3",
        photo: "https://cloudfront.alterego-design.com/media/catalog/product/cache/6/image/9df78eab33525d08d6e5fb8d27136e95/s/p/spano_black_newsite_01_4.jpg?_gl=1*51oyrg*_ga*MTM2NTk4Mjg3OC4xNjgxMjI0MDM5*_ga_Q3T21C0ST5*MTY4MTIyNDAzOC4xLjAuMTY4MTIyNDAzOC42MC4wLjA.&_ga=2.26334013.1693298657.1681224039-1365982878.1681224039",
        age: new Date()
      },
      {
        product_id: 3,
        name: "test_product vier",
        price: 9,
        stock: 6,
        description: "omschrijning test_product 3",
        photo: "https://cloudfront.alterego-design.com/media/catalog/product/cache/6/image/9df78eab33525d08d6e5fb8d27136e95/s/p/spano_black_newsite_01_4.jpg?_gl=1*51oyrg*_ga*MTM2NTk4Mjg3OC4xNjgxMjI0MDM5*_ga_Q3T21C0ST5*MTY4MTIyNDAzOC4xLjAuMTY4MTIyNDAzOC42MC4wLjA.&_ga=2.26334013.1693298657.1681224039-1365982878.1681224039",
        age: new Date()
      },
      {
        product_id: 4,
        name: "test_product een",
        price: 1,
        stock: 1,
        description: "omschrijning test_product 4",
        photo: "https://cloudfront.alterego-design.com/media/catalog/product/cache/6/image/9df78eab33525d08d6e5fb8d27136e95/s/p/spano_black_newsite_01_4.jpg?_gl=1*51oyrg*_ga*MTM2NTk4Mjg3OC4xNjgxMjI0MDM5*_ga_Q3T21C0ST5*MTY4MTIyNDAzOC4xLjAuMTY4MTIyNDAzOC42MC4wLjA.&_ga=2.26334013.1693298657.1681224039-1365982878.1681224039",
        age: new Date()
      },
      {
        product_id: 5,
        name: "test_product twee",
        price: 2,
        stock: 3,
        description: "omschrijning test_product 2",
        photo: "https://cloudfront.alterego-design.com/media/catalog/product/cache/6/image/9df78eab33525d08d6e5fb8d27136e95/s/p/spano_black_newsite_01_4.jpg?_gl=1*51oyrg*_ga*MTM2NTk4Mjg3OC4xNjgxMjI0MDM5*_ga_Q3T21C0ST5*MTY4MTIyNDAzOC4xLjAuMTY4MTIyNDAzOC42MC4wLjA.&_ga=2.26334013.1693298657.1681224039-1365982878.1681224039",
        age: new Date()
      },
    ]);
  },
};
