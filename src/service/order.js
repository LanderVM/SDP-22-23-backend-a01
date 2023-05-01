const orderRepository = require("../repository/order");
const ServiceError = require("../core/serviceError");

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
      order = await orderRepository.getByPostalCode(
        trackAndTraceCode,
        verificationCode
      );
      break;
    case "ORDER_ID":
      order = await orderRepository.getByOrderId(
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

const getById = async (id) => {
  const order = await orderRepository.findById(id);

  if (!order) {
    throw ServiceError.notFound(`There is no order with id "${id}"`);
  }

  return {
    items: order,
    count: order.length || 1,
  };
};

const post = async ({
  delivery_country,
  delivery_city,
  delivery_postal_code,
  delivery_street,
  delivery_house_number,
  delivery_box,
  CARRIER_carrier_id,
  CUSTOMER_supplier_id,
  PACKAGING_packaging_id,
}) => {
  const order = orderRepository.post(
    delivery_country,
    delivery_city,
    delivery_postal_code,
    delivery_street,
    delivery_house_number,
    delivery_box,
    (order_date = Date.now()),
    (order_status = 0),
    (tracking_code = null),
    CARRIER_carrier_id,
    CUSTOMER_supplier_id,
    PACKAGING_packaging_id
  );

  return {
    items: order,
    count: order.length || 1,
  };
};

module.exports = {
  getByTrackingCodes,
  post,
};
