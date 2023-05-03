const { getKnex, tables } = require("../data/index");

const getByAuthId = async (auth0Id) => {
  const formatProfile = ({
    auth0_id,
    email,
    username,
    image_URL,
    supplier_id,
    delivery_country,
    delivery_city,
    delivery_postal_code,
    delivery_street,
    delivery_house_number,
    delivery_box,
    supplier_email,
    name,
    phone_number,
    logo_URL,
  }) => ({
    auth0_id,
    user_email: email,
    username,
    image_URL,
    supplier_id,
    supplier_delivery_country: delivery_country,
    supplier_delivery_city: delivery_city,
    supplier_delivery_postal_code: delivery_postal_code,
    supplier_delivery_street: delivery_street,
    supplier_delivery_house_number: delivery_house_number,
    supplier_delivery_box: delivery_box,
    supplier_email,
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

const getSupplierId = async (auth0Id) => {
  supplierId = await getKnex()(tables.customer)
    .select("SUPPLIER_supplier_id")
    .where("auth0_id", auth0Id)
    .first();
  return supplierId;
};

const getAllColleagues = async (auth0Id, supplierId) => {
  const colleagues = await getKnex()(tables.customer)
    .select("username", "email", "image_URL")
    .where("SUPPLIER_supplier_id", supplierId)
    .andWhere("auth0_id", "!=", auth0Id);

  return colleagues;
};

const getAllOrders = async (auth0Id) => {
  const subOrders = await getKnex()(tables.order).where(
      "CUSTOMER_auth0_id",
      auth0Id
  )
      .join(tables.sub_order, `${tables.order}.order_id`, `${tables.sub_order}.ORDER_order_id`)
      .join(tables.sub_order_line, `${tables.sub_order}.sub_order_id`, `${tables.sub_order_line}.ORDER_order_id`)
      .join(tables.product, `${tables.sub_order_line}.PRODUCT_product_id`, `${tables.product}.product_id`)
  const ordersGrouped = subOrders.reduce((orderList, product) => {
    const order_id = product.ORDER_order_id;
    if (!orderList[order_id]) {
      orderList[order_id] = [];
    }
    orderList[order_id].push(product);
    return orderList;
  }, {});
  return ordersGrouped;
};

module.exports = {
  getByAuthId,
  getAllColleagues,
  getSupplierId,
  getAllOrders,
};
