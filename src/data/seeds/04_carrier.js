const { tables } = require("../index");

module.exports = {
  seed: async (knex) => {
    await knex(tables.carrier).insert([
      {
        carrier_id: 1,
        is_active: true,
        name: "postnl",
        SUPPLIER_supplier_id: 3,
        TRACKINGCODEDETAILS_tracking_code_details_id: 1,
      },
      {
        carrier_id: 2,
        is_active: true,
        name: "bpost",
        SUPPLIER_supplier_id: 3,
        TRACKINGCODEDETAILS_tracking_code_details_id: 2,
      },
    ]);
  },
};
