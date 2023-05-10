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

const getById = async (orderId, auth0Id) => {
  const { SUPPLIER_supplier_id: supplierId } =
    await customerService.getSupplierId(auth0Id);
  const order = await orderRepository.getById(orderId, supplierId);

  if (!(order && order.order_info)) {
    throw ServiceError.notFound(
      `There is no order with id "${orderId}" for your company`
    );
  }
  return order;
};

const getPackagingById = async (orderId, auth0Id) => {
  const { SUPPLIER_supplier_id: supplierId } =
    await customerService.getSupplierId(auth0Id);
  const packaging = await orderRepository.getPackagingById(orderId, supplierId);

  if (!packaging) {
    throw ServiceError.notFound(
      `There is no packaging for the order with id "${orderId}" for your company`
    );
  }
  return {
    items: packaging,
    count: packaging.length || 1,
  };
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
    order_lines,
  },
  auth0Id
) => {
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
    (CUSTOMER_supplier_id = (await getByAuthId(auth0Id)).items.supplier_id),
    PACKAGING_packaging_id,
    SUPPLIER_supplier_id,
    auth0Id
  );

  await orderLineService.create(order_lines, id);

  return getById(id, auth0Id);
};

const updateOrder = async (auth0Id, { order_id, ...body }) => {
  const { SUPPLIER_supplier_id: supplierId } =
    await customerService.getSupplierId(auth0Id);

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
  getById,
  getPackagingById,
  createOrder,
  updateOrder,
};
