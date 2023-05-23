const { tables } = require("../../src/data");
const { withServer } = require("../helpers");

const data = {
  orders: [
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
      SUPPLIER_supplier_id: 8,
      CUSTOMER_supplier_id: 5,
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
      SUPPLIER_supplier_id: 8,
      CUSTOMER_supplier_id: 5,
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
      SUPPLIER_supplier_id: 8,
      CUSTOMER_supplier_id: 5,
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
      tracking_code: "bpost_S0CYTUZ6AA8MM",
      CARRIER_carrier_id: 1,
      PACKAGING_packaging_id: 4,
      SUPPLIER_supplier_id: 8,
      CUSTOMER_supplier_id: 5,
    },
  ],
  carriers: [
    {
      carrier_id: 1,
      is_active: true,
      name: "postnl",
      SUPPLIER_supplier_id: 8,
      TRACKINGCODEDETAILS_tracking_code_details_id: 1,
    },
    {
      carrier_id: 2,
      is_active: true,
      name: "bpost",
      SUPPLIER_supplier_id: 8,
      TRACKINGCODEDETAILS_tracking_code_details_id: 2,
    },
  ],
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
  suppliers: [
    {
      supplier_id: 5,
      delivery_country: "Belgium",
      delivery_city: "Brussel",
      delivery_postal_code: "1200",
      delivery_street: "Hippokrateslaan",
      delivery_house_number: "10",
      delivery_box: "",
      supplier_email: "sales@janInc.com",
      name: "Jan INC",
      phone_number: "0426343211",
      logo_URL:
        "https://static.vecteezy.com/system/resources/previews/002/534/045/original/social-media-twitter-logo-blue-isolated-free-vector.jpg",
    },
    {
      supplier_id: 8,
      delivery_country: "Belgium",
      delivery_city: "Zottegem",
      delivery_postal_code: "9620",
      delivery_street: "Kastanjelaan",
      delivery_house_number: "12",
      delivery_box: "",
      supplier_email: "sales@metaverse.com",
      name: "Meta Verse",
      phone_number: "0479845110",
      logo_URL:
        "https://w7.pngwing.com/pngs/890/957/png-transparent-facebook-metaverse-logo-thumbnail.png",
    },
  ],
  customers: [
    {
      id: 6,
      auth0_id: "auth0|6457cb4fdad598694bc7f6cf",
      email: "berta@timCo.com",
      username: "Berta",
      image_url:
        "https://s.gravatar.com/avatar/ec14e0034e64ea808a11a89cce82765e?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fbe.png",
      supplier_id: 5,
      SUPPLIER_supplier_id: 8,
    },
  ],
};

const dataToDelete = {
  orders: [1, 2, 3, 4],
  carriers: [1, 2],
  trackingCodeDetails: [1, 2],
  suppliers: [5, 6, 8],
  customers: [6],
};

describe("orders", () => {
  let request;
  let knex;
  let authHeader;

  withServer(({ knex: k, request: r, authHeader: a }) => {
    knex = k;
    request = r;
    authHeader = a;
  });

  const url = "/api/orders";

  describe("GET /api/orders", () => {
    beforeAll(async () => {
      await knex(tables.supplier).insert(data.suppliers);
      await knex(tables.customer).insert(data.customers);
      await knex(tables.tracking_code_details).insert(data.trackingCodeDetails);
      await knex(tables.carrier).insert(data.carriers);
      await knex(tables.order).insert(data.orders);
    });

    afterAll(async () => {
      await knex(tables.order)
        .whereIn("order_id", dataToDelete.orders)
        .delete();
      await knex(tables.carrier)
        .whereIn("carrier_id", dataToDelete.carriers)
        .delete();
      await knex(tables.tracking_code_details)
        .whereIn("tracking_code_details_id", dataToDelete.trackingCodeDetails)
        .delete();
      await knex(tables.customer)
        .whereIn("id", dataToDelete.customers)
        .delete();
      await knex(tables.supplier)
        .whereIn("supplier_id", dataToDelete.suppliers)
        .delete();
    });

    it("should be 200 and return order with order_id 4", async () => {
      const response = await request.get(
        `${url}/?trackAndTraceCode=bpost_S0CYTUZ6AA8MM&verificationCode=9000`
      );
      expect(response.status).toBe(200);
      expect(response.body.count).toBe(1);
      expect(response.body.items).toEqual({
        order_id: 4,
        delivery_country: "Belgium",
        delivery_city: "Gent",
        delivery_postal_code: "9000",
        delivery_street: "Doodskoplaan",
        delivery_house_number: "73",
        delivery_box: "A1",
        order_date: "2023-04-15",
        order_status: 2,
        tracking_code: "bpost_S0CYTUZ6AA8MM",
        CARRIER_carrier_id: 1,
        CUSTOMER_supplier_id: 5,
        PACKAGING_packaging_id: 4,
        SUPPLIER_supplier_id: 8,
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
    it("should be 200 and return order with order_id 2", async () => {
      const response = await request.get(
        `${url}/?trackAndTraceCode=322228968778&verificationCode=2`
      );
      expect(response.status).toBe(200);
      expect(response.body.count).toBe(1);
      expect(response.body.items).toEqual({
        order_id: 2,
        delivery_country: "Belgium",
        delivery_city: "Haaltert",
        delivery_postal_code: "9451",
        delivery_street: "Bellelaan",
        delivery_house_number: "12",
        delivery_box: "B",
        order_date: "2023-05-01",
        order_status: 4,
        tracking_code: "322228968778",
        CARRIER_carrier_id: 2,
        CUSTOMER_supplier_id: 5,
        PACKAGING_packaging_id: 3,
        SUPPLIER_supplier_id: 8,
        carrier_id: 2,
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

    it("should be 401 and return nothing", async () => {
      const response = await request.get(
        `${url}/?trackAndTraceCode=error&verificationCode=2`
      );
      expect(response.status).toBe(401);
    });

    it("should be 401 and return order nothing", async () => {
      const response = await request.get(
        `${url}/?trackAndTraceCode=322228968778&verificationCode=420`
      );
      expect(response.status).toBe(401);
    });
  });
});
