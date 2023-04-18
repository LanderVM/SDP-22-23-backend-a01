const { getKnex, tables } = require("../data/index");

const getByTrackAndTraceCode = async (code) => {
  const product = await getKnex()(tables.customer_order)
    .where("tracking_code", code)
    .first();
  return product;
};

module.exports = {
  getByTrackAndTraceCode,
};
