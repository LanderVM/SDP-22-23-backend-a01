const { tables } = require("../index");

module.exports = {
  seed: async (knex) =>{
    await knex(tables.order_notification).insert([
      {
        notification_id:1,
        order_date: new Date(2023,05,03),
        CUSTOMER_supplier_id:1,
        ORDER_order_id:2,
      },{
        notification_id:2,
        order_date: new Date(),
        CUSTOMER_supplier_id:2,
        ORDER_order_id:4,
      },{
        notification_id:3,
        order_date: new Date(),
        CUSTOMER_supplier_id:2,
        ORDER_order_id:5,
      },{
        notification_id:4,
        order_date: new Date(),
        CUSTOMER_supplier_id:2,
        ORDER_order_id:6,
      },{
        notification_id:5,
        order_date: new Date(),
        CUSTOMER_supplier_id:2,
        ORDER_order_id:7,
      },{
        notification_id:6,
        order_date: new Date(),
        CUSTOMER_supplier_id:2,
        ORDER_order_id:8,
      },{
        notification_id:7,
        order_date: new Date(),
        CUSTOMER_supplier_id:2,
        ORDER_order_id:9,
      },{
        notification_id:8,
        order_date: new Date(),
        CUSTOMER_supplier_id:2,
        ORDER_order_id:10,
      },{
        notification_id:9,
        order_date: new Date(),
        CUSTOMER_supplier_id:2,
        ORDER_order_id:11,
      },
    ]);
  },
}