const { getKnex, tables } = require("../data/index");

const getBySupplierId = async (supplierId) => {
  const carriers = await getKnex()(tables.carrier).where(
    "SUPPLIER_supplier_id",
    supplierId
  );
  return carriers;
};

module.exports = {
  getBySupplierId,
};
