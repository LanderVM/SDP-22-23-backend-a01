const { tables } = require("../index");

module.exports = {
  seed: async (knex) => {
    await knex(tables.customer_order).insert([
      {
        order_id: 2,
        delivery_address: "Bellelaan 12 Haaltert",
        order_date: "2023-04-16",
        original_acquisition_price: 25,
        order_status: 4,
        tracking_code: "322228968778",
        CARRIER_carrier_id: 3,
        CUSTOMER_supplier_id: 1,
        PACKAGING_packaging_id: 3,
        SUPPLIER_supplier_id: 2,
      },
      {
        order_id: 4,
        delivery_address: "Doodskoplaan 73 Gent",
        order_date: "2023-04-17",
        original_acquisition_price: 24,
        order_status: 2,
        tracking_code: "testprefixS0CYTUZ6AA8MM",
        CARRIER_carrier_id: 1,
        CUSTOMER_supplier_id: 2,
        PACKAGING_packaging_id: 4,
        SUPPLIER_supplier_id: 1,
      },
      {
        order_id: 1,
        delivery_address: "Bekerstraat 66 Bilzen",
        order_date: "2023-04-18",
        original_acquisition_price: 21,
        order_status: 0,
        tracking_code: null,
        CARRIER_carrier_id: null,
        CUSTOMER_supplier_id: 1,
        PACKAGING_packaging_id: 1,
        SUPPLIER_supplier_id: 2,
      },
      {
        order_id: 3,
        delivery_address: "Honkstraat 33 Lokeren",
        order_date: "2023-04-15",
        original_acquisition_price: 3,
        order_status: 0,
        tracking_code: null,
        CARRIER_carrier_id: null,
        CUSTOMER_supplier_id: 2,
        PACKAGING_packaging_id: 1,
        SUPPLIER_supplier_id: 3,
      },
    ]);
  },
};
