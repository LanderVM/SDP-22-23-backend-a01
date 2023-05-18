const { tables } = require("../index");

module.exports = {
  seed: async (knex) =>{
    await knex(tables.order_notification).insert([
      {
        notification_id:1,
        notification_date: new Date(2023, 5,3),
        CUSTOMER_supplier_id:1,
        ORDER_order_id:2,
        status:"new",
        message:"Your order has been delivered.",
      },{
        notification_id:2,
        notification_date: new Date(2023,4,18),
        CUSTOMER_supplier_id:2,
        ORDER_order_id:4,
        status:"new",
        message:"Your order has been processed",
      },{
        notification_id:3,
        notification_date: new Date(2023,3,22),
        CUSTOMER_supplier_id:2,
        ORDER_order_id:5,
        status:"unread",
        message:"Your order has been processed",
      },{
        notification_id:4,
        notification_date: new Date(2023,2,24),
        CUSTOMER_supplier_id:2,
        ORDER_order_id:6,
        status:"unread",
        message:"Your order has been processed",
      },{
        notification_id:5,
        notification_date: new Date(2023,1,20),
        CUSTOMER_supplier_id:2,
        ORDER_order_id:7,
        status:"read",
        message:"Your order has been processed",
      },{
        notification_id:6,
        notification_date: new Date(2023,1,21),
        CUSTOMER_supplier_id:2,
        ORDER_order_id:8,
        status:"read",
        message:"Your order has been processed",
      },{
        notification_id:7,
        notification_date: new Date(2023,2,17),
        CUSTOMER_supplier_id:2,
        ORDER_order_id:9,
        status:"unread",
        message:"Your order has been processed",
      },{
        notification_id:8,
        notification_date: new Date(2023,3,5),
        CUSTOMER_supplier_id:2,
        ORDER_order_id:10,
        status:"new",
        message:"Your order has been processed",
      },{
        notification_id:9,
        notification_date: new Date(2023,1,24),
        CUSTOMER_supplier_id:2,
        ORDER_order_id:11,
        status:"unread",
        message:"Your order has been processed",
      },
    ]);
  },
}