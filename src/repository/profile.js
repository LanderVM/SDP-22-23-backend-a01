const { getKnex, tables } = require("../data/index");

// TO DO  not both emails showing
const getByAuthId = async (auth0Id) => {
  const formatProfile = ({
    auth0_id,
    email,
    username,
    image_URL,
    supplier_id,
    address,
    name,
    phone_number,
    logo_URL,
  }) => ({
    auth0_id,
    user_email: email,
    username,
    image_URL,
    supplier_id,
    supplier_address: address,
    supplier_name: name,
    supplier_phone_number: phone_number,
    logo_URL,
  });

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

const getAllColleagues = async (auth0Id) => {
  const { SUPPLIER_supplier_id: supplierId } = await getKnex()(tables.customer)
    .select("SUPPLIER_supplier_id")
    .where("auth0_id", auth0Id)
    .first();

  const colleagues = await getKnex()(tables.customer)
    .select("username", "email", "image_URL")
    .where("SUPPLIER_supplier_id", supplierId)
    .andWhere("auth0_id", "!=", auth0Id);

  return colleagues;
};

module.exports = {
  getByAuthId,
  getAllColleagues,
};
