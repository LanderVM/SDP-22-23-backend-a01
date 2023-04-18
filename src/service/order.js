const orderRepository = require("../repository/order");
const ServiceError = require("../core/serviceError");

const getByTrackAndTraceCode = async (code) => {
  const order = await orderRepository.getByTrackAndTraceCode(code);
  if (!order) {
    throw ServiceError.notFound(
      `There is no order with track and trace code ${code}`
    );
  }
  return {
    items: order,
    count: order.length,
  };
};

module.exports = {
  getByTrackAndTraceCode,
};
