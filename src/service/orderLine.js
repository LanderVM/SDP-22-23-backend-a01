const orderLineRepository = require("../repository/orderLine");
const ServiceError = require("../core/serviceError");
const productService = require("./product");

const getById = async (id) => {
  const orderLine = await orderLineRepository.getById(id);
  if (!orderLine) {
    throw ServiceError.notFound(`There is no orderLine with id ${id}`);
  }
  return {
    items: orderLine,
    count: orderLine.length || 1,
  };
};

const create = async (orderLineData, orderId) => {
  const orderLines = await Promise.all(
    orderLineData.map(async ({ PRODUCT_product_id, product_count }) => {
      return {
        ORDER_order_id: orderId,
        PRODUCT_product_id,
        original_acquisition_price: (
          await productService.getByIds({
            productId: String(PRODUCT_product_id),
          })
        ).items[0].price,
        product_count,
      };
    })
  );

  await orderLineRepository.create(orderLines);
  //return getById(orderLineId);
};

module.exports = {
  create,
  getById,
};
