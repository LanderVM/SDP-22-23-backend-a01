const { getKnex, tables } = require("../data/index");

const getBySupplierId = async (supplierId) => {
  const packagings = await getKnex()(tables.packaging).where(
    "SUPPLIER_supplier_id",
    supplierId
  );
  return packagings;
};

module.exports = {
  getBySupplierId,
};
