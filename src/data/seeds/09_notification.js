const { tables } = require("../index");

module.exports = {
  seed: async (knex) =>{
    await knex(tables.order_notification).insert([
      {
        notification_id:1,
        order_date: new Date(),
        CUSTOMER_supplier_id:1,
        ORDER_order_id:2,
      },{
        notification_id:2,
        order_date: new Date(),
        CUSTOMER_supplier_id:2,
        ORDER_order_id:4,
      },
    ]);
  },
}