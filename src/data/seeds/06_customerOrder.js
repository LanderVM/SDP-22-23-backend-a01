const { tables } = require("../index");

module.exports = {
  seed: async (knex) => {
    await knex(tables.order).insert([
      {
        order_id: 1,
        order_date: "2023-02-20",
        delivery_country: "Belgium",
        delivery_city: "Bilzen",
        delivery_postal_code: 3740,
        delivery_street: "Bekerstraat",
        delivery_house_number: 66,
        delivery_box: null,
        order_status: 0,
        tracking_code: null,
        CARRIER_carrier_id: null,
        PACKAGING_packaging_id: 1,
        SUPPLIER_supplier_id: 3,
        CUSTOMER_supplier_id: 2,
      },
      {
        order_id: 2,
        order_date: "2023-05-01",
        delivery_country: "Belgium",
        delivery_city: "Haaltert",
        delivery_postal_code: 9451,
        delivery_street: "Bellelaan",
        delivery_house_number: 12,
        delivery_box: "B",
        order_status: 4,
        tracking_code: "322228968778",
        CARRIER_carrier_id: 2,
        PACKAGING_packaging_id: 3,
        SUPPLIER_supplier_id: 3,
        CUSTOMER_supplier_id: 1,
      },
      {
        order_id: 3,
        order_date: "2023-04-18",
        delivery_country: "Belgium",
        delivery_city: "Lokeren",
        delivery_postal_code: 9160,
        delivery_street: "Honkstraat",
        delivery_house_number: 33,
        delivery_box: null,
        order_status: 0,
        tracking_code: null,
        CARRIER_carrier_id: null,
        PACKAGING_packaging_id: 1,
        SUPPLIER_supplier_id: 3,
        CUSTOMER_supplier_id: 1,
      },
      {
        order_id: 4,
        order_date: "2023-04-15",
        delivery_country: "Belgium",
        delivery_city: "Gent",
        delivery_postal_code: 9000,
        delivery_street: "Doodskoplaan",
        delivery_house_number: 73,
        delivery_box: "A1",
        order_status: 2,
        tracking_code: "postnl_S0CYTUZ6AA8MM",
        CARRIER_carrier_id: 1,
        PACKAGING_packaging_id: 4,
        SUPPLIER_supplier_id: 3,
        CUSTOMER_supplier_id: 2,
      },
      {
        order_id: 5,
        order_date: "2023-03-15",
        delivery_country: "Belgium",
        delivery_city: "Mere",
        delivery_postal_code: 9001,
        delivery_street: "Erikstraat",
        delivery_house_number: 74,
        delivery_box: "B",
        order_status: 2,
        tracking_code: "postnl_S0CYTUZ6AA8ML",
        CARRIER_carrier_id: 1,
        PACKAGING_packaging_id: 1,
        SUPPLIER_supplier_id: 3,
        CUSTOMER_supplier_id: 2,
      },
      {
        order_id: 6,
        order_date: "2023-02-15",
        delivery_country: "Belgium",
        delivery_city: "Melle",
        delivery_postal_code: 9002,
        delivery_street: "Geerardstraat",
        delivery_house_number: 75,
        delivery_box: "C",
        order_status: 2,
        tracking_code: "postnl_S0CYTUZ6AA8MK",
        CARRIER_carrier_id: 1,
        PACKAGING_packaging_id: 1,
        SUPPLIER_supplier_id: 3,
        CUSTOMER_supplier_id: 2,
      },
      {
        order_id: 7,
        order_date: "2023-01-15",
        delivery_country: "Belgium",
        delivery_city: "Deinze",
        delivery_postal_code: 9003,
        delivery_street: "Rogierstraat",
        delivery_house_number: 76,
        delivery_box: "D",
        order_status: 2,
        tracking_code: "postnl_S0CYTUZ6AA8MJ",
        CARRIER_carrier_id: 1,
        PACKAGING_packaging_id: 1,
        SUPPLIER_supplier_id: 3,
        CUSTOMER_supplier_id: 2,
      },
      {
        order_id: 8,
        order_date: "2023-01-13",
        delivery_country: "Belgium",
        delivery_city: "Genk",
        delivery_postal_code: 9004,
        delivery_street: "Janstraat",
        delivery_house_number: 66,
        delivery_box: "C",
        order_status: 2,
        tracking_code: "postnl_S0CYTUZ6AA8MH",
        CARRIER_carrier_id: 1,
        PACKAGING_packaging_id: 1,
        SUPPLIER_supplier_id: 3,
        CUSTOMER_supplier_id: 2,
      },
      {
        order_id: 9,
        order_date: "2023-02-11",
        delivery_country: "Belgium",
        delivery_city: "Hasselt",
        delivery_postal_code: 9011,
        delivery_street: "Evertstraat",
        delivery_house_number: 56,
        delivery_box: "C",
        order_status: 2,
        tracking_code: "postnl_S0CYTUZ6AA8MG",
        CARRIER_carrier_id: 2,
        PACKAGING_packaging_id: 1,
        SUPPLIER_supplier_id: 3,
        CUSTOMER_supplier_id: 2,
      },
      {
        order_id: 10,
        order_date: "2023-02-22",
        delivery_country: "Belgium",
        delivery_city: "Antwerpen",
        delivery_postal_code: 9013,
        delivery_street: "Gunterlaan",
        delivery_house_number: 46,
        delivery_box: "B",
        order_status: 2,
        tracking_code: "postnl_S0CYTUZ6AA8MF",
        CARRIER_carrier_id: 2,
        PACKAGING_packaging_id: 1,
        SUPPLIER_supplier_id: 3,
        CUSTOMER_supplier_id: 2,
      },
      {
        order_id: 11,
        order_date: "2023-01-15",
        delivery_country: "Belgium",
        delivery_city: "Mechelen",
        delivery_postal_code: 9015,
        delivery_street: "Herbertlaan",
        delivery_house_number: 88,
        delivery_box: "B",
        order_status: 2,
        tracking_code: "postnl_S0CYTUZ6AA8MD",
        CARRIER_carrier_id: 2,
        PACKAGING_packaging_id: 1,
        SUPPLIER_supplier_id: 3,
        CUSTOMER_supplier_id: 2,
      },
    ]);
  },
};
