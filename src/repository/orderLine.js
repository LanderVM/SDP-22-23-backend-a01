const { getKnex, tables } = require("../data/index");
const { getLogger } = require("../core/logging");

const formatOrderLine = ({
  product_count,
  ORDER_order_id,
  PRODUCT_product_id,
  original_acquisition_price,
}) => ({
  product_count,
  order_id: ORDER_order_id,
  product_id: PRODUCT_product_id,
  original_acquisition_price,
});

const getById = async (id) => {
  const orderLine = await getKnex()(tables.sub_order_line)
    .where("order_line_id", id)
    .first();
  return formatOrderLine(orderLine);
};

const create = async (
  productCount,
  orderId,
  productId,
  originalAcquisitionPrice
) => {
  try {
    const [id] = await getKnex()(tables.sub_order_line).insert(
      productCount,
      orderId,
      productId,
      originalAcquisitionPrice
    );
    return id;
  } catch (error) {
    const logger = getLogger();
    logger.error("Error in create", {
      error,
    });
    throw error;
  }
};

module.exports = {
  getById,
  create,
};
