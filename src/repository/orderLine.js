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
  const orderLine = await getKnex()(tables.order_line)
    .where("order_line_id", id)
    .first();
  return formatOrderLine(orderLine);
};

const create = async (orderLines) => {
  try {
    const firstId = await getKnex()(tables.order_line).insert(orderLines);

    return firstId;
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
