const orderRepository = require("../repository/order");
const ServiceError = require("../core/serviceError");
const { getByAuthId } = require("./customer");
const orderLineService = require("./orderLine");
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

const getCodesByOrder = async (orderId, auth0Id) => {
  const { supplier_id: supplierId } = await customerService.getSupplierId(
    auth0Id
  );
  const order = await orderRepository.getCodesByOrder(orderId, supplierId);
  let details;

  if (!order) {
    throw ServiceError.notFound(
      `A error occured while trying to fetch tracking details`
    );
  }

  switch (order.verification_type) {
    case "POST_CODE":
      details = {
        trackingCode: order.tracking_code,
        verificationCode: order.delivery_postal_code,
      };
      break;
    case "ORDER_ID":
      details = {
        trackingCode: order.tracking_code,
        verificationCode: order.order_id,
      };
  }

  return details;
};

const getById = async (orderId, auth0Id) => {
  const { supplier_id: supplierId } = await customerService.getSupplierId(
    auth0Id
  );
  const order = await orderRepository.getById(orderId, supplierId);

  if (!(order && order.order_info)) {
    throw ServiceError.notFound(
      `There is no order with id "${orderId}" for your company`
    );
  }
  return order;
};

const createOrder = async (
  {
    delivery_country,
    delivery_city,
    delivery_postal_code,
    delivery_street,
    delivery_house_number,
    delivery_box,
    PACKAGING_packaging_id,
    SUPPLIER_supplier_id,
    supplier_id,
    order_lines,
  },
  auth0Id
) => {
  const customer = await getByAuthId(auth0Id)
  const id = await orderRepository.createOrder(
    delivery_country,
    delivery_city,
    delivery_postal_code,
    delivery_street,
    delivery_house_number,
    delivery_box,
    (order_date = new Date()),
    (order_status = 0),
    (tracking_code = null),
    (CUSTOMER_supplier_id = supplier_id),
    PACKAGING_packaging_id,
    SUPPLIER_supplier_id,
    (CUSTOMER_id = customer.items.id),
  );

  await orderLineService.create(order_lines, id);
  return getById(id, auth0Id);
};

const updateOrder = async (auth0Id, { order_id, ...body }) => {
  const { supplier_id: supplierId } = await customerService.getSupplierId(
    auth0Id
  );

  const order = await orderRepository.updateOrder(supplierId, order_id, body);

  if (!order) {
    throw ServiceError.notFound(
      `There is no order with id "${order_id}" that isn't processed for your company`
    );
  }
  return {
    items: order,
    count: order.length || 1,
  };
};

module.exports = {
  getByTrackingCodes,
  getCodesByOrder,
  getById,
  createOrder,
  updateOrder,
};
