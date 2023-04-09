const { getKnex, tables } = require("../data/index");

const getByEmail = async (email) => {
  const user = await getKnex()(tables.user).select("*").where("email", email);
  return user;
};

const getBySupplierId = async (supplierId) => {
  const user = await getKnex()(tables.user)
    .select("*")
    .where("SUPPLIER_supplier_id", supplierId);
  return user;
};

module.exports = {
  getByEmail,
  getBySupplierId,
};
