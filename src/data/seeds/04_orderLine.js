const { tables } = require("../index");

module.exports = {
  seed: async (knex) => {
    await knex(tables.order_line).insert([
      {
        order_line_id: 1,
        ORDER_order_id: 4,
        PRODUCT_product_id: 5,
        product_count: 2,
        total_price: 99.51,
      },
      {
        order_line_id: 2,
        ORDER_order_id: 1,
        PRODUCT_product_id: 1,
        product_count: 1,
        total_price: 101,
      },
      {
        order_line_id: 3,
        ORDER_order_id: 4,
        PRODUCT_product_id: 4,
        product_count: 1,
        total_price: 35,
      },
      {
        order_line_id: 4,
        ORDER_order_id: 4,
        PRODUCT_product_id: 1,
        product_count: 2,
        total_price: 45,
      },
      {
        order_line_id: 5,
        ORDER_order_id: 3,
        PRODUCT_product_id: 4,
        product_count: 4,
        total_price: 95,
      },
      {
        order_line_id: 6,
        ORDER_order_id: 3,
        PRODUCT_product_id: 2,
        product_count: 2,
        total_price: 995,
      },
      {
        order_line_id: 7,
        ORDER_order_id: 2,
        PRODUCT_product_id: 5,
        product_count: 3,
        total_price: 990,
      },
      {
        order_line_id: 8,
        ORDER_order_id: 2,
        PRODUCT_product_id: 3,
        product_count: 2,
        total_price: 995,
      },
      {
        order_line_id: 9,
        ORDER_order_id: 1,
        PRODUCT_product_id: 4,
        product_count: 2,
        total_price: 302,
      },
      {
        order_line_id: 10,
        ORDER_order_id: 2,
        PRODUCT_product_id: 1,
        product_count: 1,
        total_price: 99.55,
      },
      {
        order_line_id: 11,
        ORDER_order_id: 1,
        PRODUCT_product_id: 3,
        product_count: 2,
        total_price: 99.5,
      },
      {
        order_line_id: 12,
        ORDER_order_id: 4,
        PRODUCT_product_id: 3,
        product_count: 1,
        total_price: 99.5,
      },
      {
        order_line_id: 13,
        ORDER_order_id: 1,
        PRODUCT_product_id: 5,
        product_count: 1,
        total_price: 87.5,
      },
    ]);
  },
};
