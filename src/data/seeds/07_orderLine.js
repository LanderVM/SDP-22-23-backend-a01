const { tables } = require("../index");

module.exports = {
  seed: async (knex) => {
    await knex(tables.order_line).insert([
      {
        order_line_id: 1,
        product_count: 2,
        ORDER_order_id: 4,
        PRODUCT_product_id: 5,
        original_acquisition_price: 99.51,
      },
      {
        order_line_id: 2,
        product_count: 1,
        ORDER_order_id: 1,
        PRODUCT_product_id: 1,
        original_acquisition_price: 101,
      },
      {
        order_line_id: 3,
        product_count: 1,
        ORDER_order_id: 4,
        PRODUCT_product_id: 4,
        original_acquisition_price: 35,
      },
      {
        order_line_id: 4,
        product_count: 2,
        ORDER_order_id: 4,
        PRODUCT_product_id: 1,
        original_acquisition_price: 45,
      },
      {
        order_line_id: 5,
        product_count: 4,
        ORDER_order_id: 3,
        PRODUCT_product_id: 4,
        original_acquisition_price: 95,
      },
      {
        order_line_id: 6,
        product_count: 2,
        ORDER_order_id: 3,
        PRODUCT_product_id: 2,
        original_acquisition_price: 995,
      },
      {
        order_line_id: 7,
        product_count: 3,
        ORDER_order_id: 2,
        PRODUCT_product_id: 5,
        original_acquisition_price: 990,
      },
      {
        order_line_id: 8,
        product_count: 2,
        ORDER_order_id: 2,
        PRODUCT_product_id: 3,
        original_acquisition_price: 995,
      },
      {
        order_line_id: 9,
        product_count: 2,
        ORDER_order_id: 1,
        PRODUCT_product_id: 4,
        original_acquisition_price: 302,
      },
      {
        order_line_id: 10,
        product_count: 1,
        ORDER_order_id: 2,
        PRODUCT_product_id: 1,
        original_acquisition_price: 99.55,
      },
      {
        order_line_id: 11,
        product_count: 2,
        ORDER_order_id: 1,
        PRODUCT_product_id: 3,
        original_acquisition_price: 99.5,
      },
      {
        order_line_id: 12,
        product_count: 1,
        ORDER_order_id: 4,
        PRODUCT_product_id: 3,
        original_acquisition_price: 99.5,
      },
      {
        order_line_id: 13,
        product_count: 1,
        ORDER_order_id: 1,
        PRODUCT_product_id: 5,
        original_acquisition_price: 87.5,
      },
    ]);
  },
};
