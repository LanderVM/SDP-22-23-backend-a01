const { tables } = require("../index");

module.exports = {
  seed: async (knex) => {
    let products = [
      {
        product_id: 1,
        name: "test_product vijf",
        price: 11,
        stock: 5,
        description: "omschrijning test_product 5",
        photo:
          "https://ekit.co.uk/GalleryEntries/eCommerce_solutions_and_services/MedRes_Product-presentation-2.jpg?q=27012012153123",
        deliveryTime: "2d",
      },
      {
        product_id: 2,
        name: "test_product drie",
        price: 5,
        stock: 3,
        description: "omschrijning test_product 3",
        photo:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj31XiVuandaaNsAs81zMdqw4g9YliThd_Bg&usqp=CAU",
        deliveryTime: "12h",
      },
      {
        product_id: 3,
        name: "test_product vier",
        price: 9,
        stock: 6,
        description: "omschrijning test_product 4",
        photo:
          "https://images.squarespace-cdn.com/content/v1/59d2bea58a02c78793a95114/1664822592112-KRZQFJ3J20V9S9DRD5GC/iPhone+14.png?format=1000w",
        deliveryTime: "1d",
      },
      {
        product_id: 4,
        name: "test_product een",
        price: 1,
        stock: 1,
        description: "omschrijning test_product 1",
        photo:
          "https://cloudfront.alterego-design.com/media/catalog/product/cache/6/image/9df78eab33525d08d6e5fb8d27136e95/s/p/spano_black_newsite_01_4.jpg?_gl=1*51oyrg*_ga*MTM2NTk4Mjg3OC4xNjgxMjI0MDM5*_ga_Q3T21C0ST5*MTY4MTIyNDAzOC4xLjAuMTY4MTIyNDAzOC42MC4wLjA.&_ga=2.26334013.1693298657.1681224039-1365982878.1681224039",
        deliveryTime: "36h",
      },
      {
        product_id: 5,
        name: "test_product twee",
        price: 2,
        stock: 3,
        description: "omschrijning test_product 2",
        photo:
          "https://cloudfront.alterego-design.com/media/catalog/product/cache/6/image/9df78eab33525d08d6e5fb8d27136e95/s/p/spano_black_newsite_01_4.jpg?_gl=1*51oyrg*_ga*MTM2NTk4Mjg3OC4xNjgxMjI0MDM5*_ga_Q3T21C0ST5*MTY4MTIyNDAzOC4xLjAuMTY4MTIyNDAzOC42MC4wLjA.&_ga=2.26334013.1693298657.1681224039-1365982878.1681224039",
        deliveryTime: "6d",
      },
    ];
    for (i = 6; i <= 100; i++) {
      products.push({
        product_id: i,
        name: "test_product " + i,
        price: Math.random() * 100,
        stock: Math.random() * 100,
        description: "omschrijving test_product " + i,
        photo: "url",
        deliveryTime: Math.ceil(Math.random() * 6) + "d",
      });
    }
    await knex(tables.product).insert(products);
  },
};
