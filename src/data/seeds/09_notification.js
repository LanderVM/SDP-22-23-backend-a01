const { tables } = require("../index");

module.exports = {
  seed: async (knex) =>{
    await knex(tables.order_notification).insert([
      {
        notification_id:1,
        order_date: new Date(2023,05,03),
        CUSTOMER_supplier_id:1,
        ORDER_order_id:2,
        is_read:false,
        message:"Your order has been delivered.",
      },{
        notification_id:2,
        order_date: new Date(2023,04,18),
        CUSTOMER_supplier_id:2,
        ORDER_order_id:4,
        is_read:false,
        message:"Your order has been processed",
      },{
        notification_id:3,
        order_date: new Date(2023,03,22),
        CUSTOMER_supplier_id:2,
        ORDER_order_id:5,
        is_read:false,
        message:"Your order has been processed",
      },{
        notification_id:4,
        order_date: new Date(2023,02,24),
        CUSTOMER_supplier_id:2,
        ORDER_order_id:6,
        is_read:false,
        message:"Your order has been processed",
      },{
        notification_id:5,
        order_date: new Date(2023,01,20),
        CUSTOMER_supplier_id:2,
        ORDER_order_id:7,
        is_read:true,
        message:"Your order has been processed",
      },{
        notification_id:6,
        order_date: new Date(2023,01,21),
        CUSTOMER_supplier_id:2,
        ORDER_order_id:8,
        is_read:true,
        message:"Your order has been processed",
      },{
        notification_id:7,
        order_date: new Date(2023,02,17),
        CUSTOMER_supplier_id:2,
        ORDER_order_id:9,
        is_read:false,
        message:"Your order has been processed",
      },{
        notification_id:8,
        order_date: new Date(2023,03,05),
        CUSTOMER_supplier_id:2,
        ORDER_order_id:10,
        is_read:false,
        message:"Your order has been processed",
      },{
        notification_id:9,
        order_date: new Date(2023,01,24),
        CUSTOMER_supplier_id:2,
        ORDER_order_id:11,
        is_read:false,
        message:"Your order has been processed",
      },
    ]);
  },
}