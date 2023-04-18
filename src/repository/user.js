const { getKnex, tables } = require("../data/index");

const getByEmail = async (email) => {
  const user = await getKnex()(tables.user).where("email", email).first();
  return user;
};

const getBySupplierId = async (supplierId) => {
  const user = await getKnex()(tables.user)
    .where("SUPPLIER_supplier_id", supplierId)
    .first();
  return user;
};

module.exports = {
  getByEmail,
  getBySupplierId,
};
