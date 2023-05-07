const { getKnex, tables } = require("../data/index");
const moment = require("moment");

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
  const subOrders = await getKnex()(tables.customer)
      .select(`${tables.order}.order_id`, `${tables.order}.order_date`, `${tables.order}.order_status`,
          `${tables.product}.product_id`, `${tables.product}.image_URL`, `${tables.product}.brand`, `${tables.product}.name`)
      .where("auth0_id", auth0Id)
      .join(tables.order, `${tables.customer}.SUPPLIER_supplier_id`, `${tables.order}.CUSTOMER_supplier_id`)
      .join(tables.order_line, `${tables.order}.order_id`, `${tables.order_line}.ORDER_order_id`)
      .join(tables.product, `${tables.order_line}.PRODUCT_product_id`, `${tables.product}.product_id`)
      .where(`${tables.order}.order_date`, '>=', moment().subtract(3, 'months').toDate())
      .orderBy(`${tables.order}.order_date`)
  const productsGroupedByOrderId = subOrders.reduce((orderList, product) => {
    const order_id = product.order_id;
    if (!orderList[order_id]) {
      orderList[order_id] = [];
    }
    orderList[order_id].push(product);
    return orderList;
  }, {});
  return productsGroupedByOrderId;
};

module.exports = {
  getByAuthId,
  getAllColleagues,
  getSupplierId,
  getAllOrders,
};
