const { getKnex, tables } = require("../data/index");

const getByTrackAndTraceCode = async (code) => {
  const product = await getKnex()(tables.customer_order)
    .first()
    .where("tracking_code", code);
  return product;
};

module.exports = {
  getByTrackAndTraceCode,
};
