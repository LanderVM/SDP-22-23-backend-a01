const orderRepository = require("../repository/order");
const ServiceError = require("../core/serviceError");

const getByTrackingCodes = async (trackAndTraceCode, verificatiecode) => {
  const verificationType =
    await orderRepository.getVerificationTypeByTrackAndTraceCode(
      trackAndTraceCode
    );

  if (!verificationType) {
    throw ServiceError.notFound(
      `There is no order with track and trace code "${trackAndTraceCode}" and verification code "${verificatiecode}"`
    );
  }

  switch (verificationType.verification_type) {
    case "POST_CODE":
      order = await orderRepository.getBypostalCode(
        trackAndTraceCode,
        verificatiecode
      );
      break;
    case "ORDER_ID":
      order = await orderRepository.getByOrderId(
        trackAndTraceCode,
        verificatiecode
      );
  }

  if (!order) {
    throw ServiceError.notFound(
      `There is no order with track and trace code "${trackAndTraceCode}" and verification code "${verificatiecode}"`
    );
  }
  return {
    items: order,
    count: order.length,
  };
};

module.exports = {
  getByTrackingCodes,
};
