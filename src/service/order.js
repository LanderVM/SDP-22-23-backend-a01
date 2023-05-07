const orderRepository = require("../repository/order");
const ServiceError = require("../core/serviceError");
const { getByAuthId } = require("./customer");
const { create: postOrderLine } = require("./orderLine");
const customerService = require("./customer");

const getByTrackingCodes = async ({ trackAndTraceCode, verificationCode }) => {
  const verificationType =
    await orderRepository.getVerificationTypeByTrackAndTraceCode(
      trackAndTraceCode
    );

  if (!verificationType) {
    throw ServiceError.notFound(
      `There is no order with track and trace code "${trackAndTraceCode}" and verification code "${verificationCode}"`
    );
  }

  switch (verificationType.verification_type) {
    case "POST_CODE":
      order = await orderRepository.getTrackAndTraceByPostalCode(
        trackAndTraceCode,
        verificationCode
      );
      break;
    case "ORDER_ID":
      order = await orderRepository.getTrackAndTraceByOrderId(
        trackAndTraceCode,
        verificationCode
      );
  }

  if (!order) {
    throw ServiceError.notFound(
      `There is no order with track and trace code "${trackAndTraceCode}" and verification code "${verificationCode}"`
    );
  }
  return {
    items: order,
    count: order.length || 1,
  };
};

const getById = async (orderId, auth0Id) => {
  const { SUPPLIER_supplier_id: supplierId } =
    await customerService.getSupplierId(auth0Id);
  const order = await orderRepository.getById(orderId, supplierId);

  if (!(order && order.order_info)) {
    throw ServiceError.notFound(
      `There is no order with id "${orderId}" for your company`
    );
  }
  console.log(order)
  return order;
};

const postOrder = async (
  {
    delivery_country,
    delivery_city,
    delivery_postal_code,
    delivery_street,
    delivery_house_number,
    delivery_box,
    CARRIER_carrier_id,
    PACKAGING_packaging_id,
    SUPPLIER_supplier_id,
  },
  auth0Id
) => {
  const id = await orderRepository.postOrder(
    delivery_country,
    delivery_city,
    delivery_postal_code,
    delivery_street,
    delivery_house_number,
    delivery_box,
    (order_date = new Date()),
    (order_status = 0),
    (tracking_code = null),
    CARRIER_carrier_id,
    (CUSTOMER_supplier_id = (await getByAuthId(auth0Id)).items.supplier_id),
    PACKAGING_packaging_id,
    SUPPLIER_supplier_id
  );

  return getById(id, auth0Id);
};
/*
const create = async ({
  email,
  products,
  address
}) => {
  const supplierCustomer = await supplierRepository.findSupplierByUserEmail(email); //{ supplier_id: 3 }; await supplierRepository.findSupplierByUserEmail(email);




  let date = new Date();
  date = date.toISOString().split("T")[0];

  const suppliers = {
    1: [{
        productId: 1,
        amount: 5
      },
      {
        productId: 2,
        amount: 5
      },
    ],
    2: [{
        productId: 4,
        amount: 5
      },
      {
        productId: 5,
        amount: 5
      },
    ],
  }; //await organizeProducts(products);

  console.log(suppliers);
  orders = [];
  orderObjects = [];

  Object.keys(suppliers).forEach(async (el) => {
    orderId = await orderRepository.create(
      supplierCustomer.supplier_id,
      addressString,
      date,
      el
    );
    orders.push(orderId);

    products = suppliers[el];

    products.forEach(async (el) => {
      price = await productRepository.getById(el.productId).price; //bug: price is NaN
      totalPrice = price * el.amount;
      console.log(`prijs=${price}`);
      console.log(`totale prijs=${totalPrice}`);
      await orderLineRepository.create(
        orderId,
        el.productId,
        el.amount,
        totalPrice
      );
    });
  });

  orders.forEach(async el => {
    order = await orderRepository.findById(el);
    orderObjects.push(order);
  });

  return orderObjects;
};*/

module.exports = {
  getByTrackingCodes,
  getById,
  postOrder,
};
