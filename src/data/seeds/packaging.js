const { tables } = require("../index");

module.exports = {
  seed: async (knex) => {
    await knex(tables.packaging).insert([
      {
        packaging_id: 1,
        is_active: true,
        height: 5.5,
        length: 6.6,
        width: 4,
        name: "Medium",
        price: 10,
        packaging_type: 1,
        SUPPLIER_supplier_id: 1,
      },
      {
        packaging_id: 2,
        is_active: true,
        height: 4.5,
        length: 4.5,
        width: 3,
        name: "Medium",
        price: 30,
        packaging_type: 1,
        SUPPLIER_supplier_id: 2,
      },
      {
        packaging_id: 3,
        is_active: false,
        height: 4.5,
        length: 6.6,
        width: 5,
        name: "MediumOld",
        price: 14,
        packaging_type: 0,
        SUPPLIER_supplier_id: 1,
      },
      {
        packaging_id: 4,
        is_active: false,
        height: 3,
        length: 2,
        width: 2,
        name: "Small",
        price: 15,
        packaging_type: 0,
        SUPPLIER_supplier_id: 2,
      },
    ]);
  },
};
