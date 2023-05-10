const { tables } = require("../../src/data");
const { withServer } = require("../helpers");

const data = {
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
      CUSTOMER_supplier_id: 5,
      PACKAGING_packaging_id: 1,
      SUPPLIER_supplier_id: 6,
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
      CUSTOMER_supplier_id: 6,
      PACKAGING_packaging_id: 3,
      SUPPLIER_supplier_id: 5,
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
      CUSTOMER_supplier_id: 5,
      PACKAGING_packaging_id: 1,
      SUPPLIER_supplier_id: 6,
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
      CUSTOMER_supplier_id: 5,
      PACKAGING_packaging_id: 4,
      SUPPLIER_supplier_id: 6,
    },
  ],
  carriers: [
    {
      carrier_id: 1,
      is_active: true,
      name: "postnl",
      SUPPLIER_supplier_id: 6,
      TRACKINGCODEDETAILS_tracking_code_details_id: 1,
    },
    {
      carrier_id: 3,
      is_active: true,
      name: "bpost",
      SUPPLIER_supplier_id: 5,
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
      name: "Tim CO",
      phone_number: "0426343211",
      logo_URL:
        "https://static.vecteezy.com/system/resources/previews/002/534/045/original/social-media-twitter-logo-blue-isolated-free-vector.jpg",
    },
    {
      supplier_id: 6,
      delivery_country: "Belgium",
      delivery_city: "Aalst",
      delivery_postal_code: "9300",
      delivery_street: "Merestraat",
      delivery_house_number: "80",
      delivery_box: "B",
      supplier_email: "sales@timCo.com",
      name: "Jan INC",
      phone_number: "0456443212",
      logo_URL:
        "https://1000logos.net/wp-content/uploads/2016/10/Apple-Logo.png",
    },
  ],
  customers: [
    {
      auth0_id: "auth0|6457cb4fdad598694bc7f6cf",
      email: "berta@timCo.com",
      username: "Berta",
      image_url:
        "https://s.gravatar.com/avatar/ec14e0034e64ea808a11a89cce82765e?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fbe.png",
      SUPPLIER_supplier_id: 5,
    },
    {
      auth0_id: "auth0|644fe09f2d805379de3c9ab6",
      email: "job@bartInc.com",
      username: "Job",
      image_url:
        "https://s.gravatar.com/avatar/2e161b057ddca5c40178441d5f9a3feb?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fjo.png",
      SUPPLIER_supplier_id: 6,
    },
  ],
};

const dataToDelete = {
  orders: [1, 2, 3, 4],
  carriers: [1, 3],
  trackingCodeDetails: [1, 2],
  suppliers: [5, 6],
  customers: [
    "auth0|6457cb4fdad598694bc7f6cf",
    "auth0|644fe09f2d805379de3c9ab6",
  ],
};

//TO DO werkt niet bij nieuwe db
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
        .whereIn("auth0_id", dataToDelete.customers)
        .delete();
      await knex(tables.supplier)
        .whereIn("supplier_id", dataToDelete.suppliers)
        .delete();
    });

    it("should be 200 and return order with order_id 4", async () => {
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
        order_date: "2023-04-17",
        order_status: 2,
        tracking_code: "testprefixS0CYTUZ6AA8MM",
        CARRIER_carrier_id: 1,
        CUSTOMER_supplier_id: 5,
        PACKAGING_packaging_id: 4,
        SUPPLIER_supplier_id: 6,
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
        delivery_postal_code: 9451,
        delivery_street: "Bellelaan",
        delivery_house_number: 12,
        delivery_box: "B",
        order_date: "2023-04-16",
        order_status: 4,
        tracking_code: "322228968778",
        CARRIER_carrier_id: 3,
        CUSTOMER_supplier_id: 6,
        PACKAGING_packaging_id: 3,
        SUPPLIER_supplier_id: 5,
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
