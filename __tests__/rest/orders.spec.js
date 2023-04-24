const ServiceError = require("../../src/core/serviceError");
const { tables } = require("../../src/data");
const { withServer } = require("../helpers");

const data = {
  trackingCodeDetails: [
    {
      tracking_code_details_id: 1,
      character_count: 13,
      is_integers_only: false,
      tracking_code_prefix: "testprefix",
      verification_type: "POST_CODE",
    },
    {
      tracking_code_details_id: 2,
      character_count: 10,
      is_integers_only: true,
      tracking_code_prefix: "32",
      verification_type: "ORDER_ID",
    },
  ],
  carriers: [
    {
      carrier_id: 1,
      is_active: true,
      name: "postnl",
      SUPPLIER_supplier_id: 2,
      TRACKINGCODEDETAILS_tracking_code_details_id: 1,
    },
    {
      carrier_id: 2,
      is_active: true,
      name: "bpost",
      SUPPLIER_supplier_id: 2,
      TRACKINGCODEDETAILS_tracking_code_details_id: 2,
    },
    {
      carrier_id: 3,
      is_active: true,
      name: "bpost",
      SUPPLIER_supplier_id: 1,
      TRACKINGCODEDETAILS_tracking_code_details_id: 2,
    },
    {
      carrier_id: 4,
      is_active: true,
      name: "postnl",
      SUPPLIER_supplier_id: 1,
      TRACKINGCODEDETAILS_tracking_code_details_id: 1,
    },
  ],
  orders: [
    {
      order_id: 1,
      delivery_country: "Belgium",
      delivery_city: "Bilzen",
      delivery_postal_code: 3740,
      delivery_street: "Bekerstraat",
      delivery_house_number: 66,
      order_date: "2023-04-18",
      delivery_box: null,
      order_status: 0,
      tracking_code: null,
      CARRIER_carrier_id: null,
      CUSTOMER_supplier_id: 1,
      PACKAGING_packaging_id: 1,
      SUPPLIER_supplier_id: 2,
    },
    {
      order_id: 2,
      delivery_country: "Belgium",
      delivery_city: "Haaltert",
      delivery_postal_code: 9451,
      delivery_street: "Bellelaan",
      delivery_house_number: 12,
      delivery_box: "B",
      order_date: "2023-04-16",
      order_status: 4,
      tracking_code: "322228968778",
      CARRIER_carrier_id: 3,
      CUSTOMER_supplier_id: 1,
      PACKAGING_packaging_id: 3,
      SUPPLIER_supplier_id: 2,
    },
    {
      order_id: 3,
      delivery_country: "Belgium",
      delivery_city: "Lokeren",
      delivery_postal_code: 9160,
      delivery_street: "Honkstraat",
      delivery_house_number: 33,
      order_date: "2023-04-15",
      delivery_box: null,
      order_status: 0,
      tracking_code: null,
      CARRIER_carrier_id: null,
      CUSTOMER_supplier_id: 2,
      PACKAGING_packaging_id: 1,
      SUPPLIER_supplier_id: 3,
    },
    {
      order_id: 4,
      delivery_country: "Belgium",
      delivery_city: "Gent",
      delivery_postal_code: 9000,
      delivery_street: "Doodskoplaan",
      delivery_house_number: 73,
      order_date: "2023-04-17",
      delivery_box: "A1",
      order_status: 2,
      tracking_code: "testprefixS0CYTUZ6AA8MM",
      CARRIER_carrier_id: 1,
      CUSTOMER_supplier_id: 2,
      PACKAGING_packaging_id: 4,
      SUPPLIER_supplier_id: 1,
    },
  ],
};

const dataToDelete = {
  orders: [1, 2, 3, 4],
};

describe("order", () => {
  let request;
  let knex;
  let authHeader;

  withServer(({ knex: k, request: r, authHeader: a }) => {
    knex = k;
    request = r;
    authHeader = a;
  });

  const url = "/api/order";

  describe("GET /api/order", () => {
    beforeAll(async () => {
      await knex(tables.tracking_code_details).insert(data.trackingCodeDetails);
      await knex(tables.carrier).insert(data.carriers);
      await knex(tables.customer_order).insert(data.orders);
    });

    afterAll(async () => {
      await knex(tables.customer_order).delete();
      await knex(tables.carrier).delete();
      await knex(tables.tracking_code_details).delete();
    });

    it("Zou een 200 code moeten geven en de correcte order", async () => {
      const response = await request.get(
        `${url}/?trackAndTraceCode=testprefixS0CYTUZ6AA8MM&verificationCode=9000`
      );
      expect(response.status).toBe(200);
      expect(response.body.count).toBe(1);
      expect(response.body.items).toEqual({
        order_id: 4,
        delivery_country: "Belgium",
        delivery_city: "Gent",
        delivery_postal_code: 9000,
        delivery_street: "Doodskoplaan",
        delivery_house_number: 73,
        delivery_box: "A1",
        order_date: "2023-04-16T22:00:00.000Z",
        order_status: 2,
        tracking_code: "testprefixS0CYTUZ6AA8MM",
        CARRIER_carrier_id: 1,
        CUSTOMER_supplier_id: 2,
        PACKAGING_packaging_id: 4,
        SUPPLIER_supplier_id: 2,
        carrier_id: 1,
        is_active: 1,
        name: "postnl",
        TRACKINGCODEDETAILS_tracking_code_details_id: 1,
        tracking_code_details_id: 1,
        character_count: 13,
        is_integers_only: 0,
        tracking_code_prefix: "testprefix",
        verification_type: "POST_CODE",
      });
    });
    it("Zou een 200 code moeten geven en de correcte order", async () => {
      const response = await request.get(
        `${url}/?trackAndTraceCode=322228968778&verificationCode=2`
      );
      expect(response.status).toBe(200);
      expect(response.body.count).toBe(1);
      expect(response.body.items).toEqual({
        order_id: 2,
        delivery_country: "Belgium",
        delivery_city: "Haaltert",
        delivery_postal_code: 9451,
        delivery_street: "Bellelaan",
        delivery_house_number: 12,
        delivery_box: "B",
        order_date: "2023-04-15T22:00:00.000Z",
        order_status: 4,
        tracking_code: "322228968778",
        CARRIER_carrier_id: 3,
        CUSTOMER_supplier_id: 1,
        PACKAGING_packaging_id: 3,
        SUPPLIER_supplier_id: 1,
        carrier_id: 3,
        is_active: 1,
        name: "bpost",
        TRACKINGCODEDETAILS_tracking_code_details_id: 2,
        tracking_code_details_id: 2,
        character_count: 10,
        is_integers_only: 1,
        tracking_code_prefix: "32",
        verification_type: "ORDER_ID",
      });
    });
    /*it("should throw error", async () => {
      const throws = async () => {
        await request.get(
          `${url}/?trackAndTraceCode=fout&verificationCode=9000`
        );
      };
      expect(throws).toThrow(new ServiceError());
    });*/
  });
});
