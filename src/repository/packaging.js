const { getKnex, tables } = require("../data/index");

const getBySupplierId = async (supplierId) => {
  const packagings = await getKnex()(tables.packaging)
      .select("SUPPLIER_supplier_id",
          getKnex().raw('CONCAT(length, \' x \', width, \' x \', height) as measurements'),
          'name as packaging_name',
          getKnex().raw('CONCAT(\'€ \', price) as price'),
          'packaging_id')
      .where(
    "SUPPLIER_supplier_id",
    supplierId)
      .andWhereNot("is_active", 0)
  return packagings;
};

module.exports = {
  getBySupplierId,
};
