const { getKnex, tables } = require("../data/index");

const formatProfile = ({
  auth0_id,
  email,
  username,
  supplier_id,
  address,
  name,
  phone_number,
}) => ({
  auth0_id,
  user_email: email,
  username,
  supplier_id,
  supplier_address: address,
  supplier_name: name,
  supplier_phone_number: phone_number,
});

const getAll = async (auth0Id) => {
  const profile = await getKnex()(tables.customer)
    .where("auth0_id", auth0Id)
    .join(
      tables.supplier,
      `${tables.supplier}.supplier_id`,
      `${tables.customer}.SUPPLIER_supplier_id`
    )
    .first();
  return formatProfile(profile);
};

module.exports = {
  getAll,
};
