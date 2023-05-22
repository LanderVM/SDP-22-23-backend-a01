const { getKnex, tables } = require("../data/index");
const { getLogger } = require("../core/logging");

const getVerificationTypeByTrackAndTraceCode = async (trackAndTraceCode) => {
  const product = await getKnex()(tables.order)
    .select("verification_type")
    .join(
      tables.carrier,
      `${tables.carrier}.carrier_id`,
      `${tables.order}.CARRIER_carrier_id`
    )
    .join(
      tables.tracking_code_details,
      `${tables.tracking_code_details}.tracking_code_details_id`,
      `${tables.carrier}.TRACKINGCODEDETAILS_tracking_code_details_id`
    )
    .where("tracking_code", trackAndTraceCode)
    .first();
  return product;
};

const getProductsByTrackingCodes = async (
  trackAndTraceCode,
  verificationCode,
  verificationColumn
) => {
  const product = await getKnex()(tables.order)
    .join(
      tables.carrier,
      `${tables.carrier}.carrier_id`,
      `${tables.order}.CARRIER_carrier_id`
    )
    .join(
      tables.tracking_code_details,
      `${tables.tracking_code_details}.tracking_code_details_id`,
      `${tables.carrier}.TRACKINGCODEDETAILS_tracking_code_details_id`
    )
    .where("tracking_code", trackAndTraceCode)
    .andWhere(verificationColumn, verificationCode)
    .first();

  return product;
};

const getCodesByOrder = async (orderId, auth0Id) => {
  const trackCodes = await getKnex()(tables.order)
    .join(
      tables.carrier,
      `${tables.carrier}.carrier_id`,
      `${tables.order}.CARRIER_carrier_id`
    )
    .join(
      tables.tracking_code_details,
      `${tables.tracking_code_details}.tracking_code_details_id`,
      `${tables.carrier}.TRACKINGCODEDETAILS_tracking_code_details_id`
    )
    .where("order_id", orderId)
    .first();

  return trackCodes;
};
const getTrackAndTraceByOrderId = async (
  trackAndTraceCode,
  verificationCode
) => {
  return getProductsByTrackingCodes(
    trackAndTraceCode,
    verificationCode,
    "order_id"
  );
};

const getTrackAndTraceByPostalCode = async (
  trackAndTraceCode,
  verificationCode
) => {
  return getProductsByTrackingCodes(
    trackAndTraceCode,
    verificationCode,
    "delivery_postal_code"
  );
};

const getById = async (orderId, supplierId) => {
  const order = await getKnex()(tables.order)
    .select(
      "order_id",
      "order_date",
      "delivery_country",
      "delivery_city",
      "delivery_postal_code",
      "delivery_street",
      "delivery_house_number",
      "delivery_box",
      "order_status",
      "tracking_code",
      "height",
      "length",
      "width",
      "name",
      "price",
      "PACKAGING_packaging_id as packaging_id"
    )
    .join(
      tables.packaging,
      `${tables.order}.PACKAGING_packaging_id`,
      `${tables.packaging}.packaging_id`
    )
    .where("order_id", orderId)
    .andWhere("CUSTOMER_supplier_id", supplierId)
    .first();
  const productList = await getKnex()(tables.order_line)
    .select(
      "product_id",
      "product_count",
      "original_acquisition_price",
      "image_URL",
      "brand",
      "name",
      "description"
    )
    .join(
      tables.product,
      `${tables.order_line}.PRODUCT_product_id`,
      `${tables.product}.product_id`
    )
    .where("ORDER_order_id", orderId);
  return {
    order_info: order,
    product_list: productList,
  };
};

const createOrder = async (
  delivery_country,
  delivery_city,
  delivery_postal_code,
  delivery_street,
  delivery_house_number,
  delivery_box,
  order_date,
  order_status,
  tracking_code,
  CUSTOMER_supplier_id,
  PACKAGING_packaging_id,
  SUPPLIER_supplier_id
) => {
  try {
    const [id] = await getKnex()(tables.order).insert({
      delivery_country,
      delivery_city,
      delivery_postal_code,
      delivery_street,
      delivery_house_number,
      delivery_box,
      order_date,
      order_status,
      tracking_code,
      CUSTOMER_supplier_id,
      PACKAGING_packaging_id,
      SUPPLIER_supplier_id,
    });
    return id;
  } catch (error) {
    const logger = getLogger();
    logger.error("Error in create", {
      error,
    });
    throw error;
  }
};

const updateOrder = async (supplierId, order_id, body) => {
  try {
    await getKnex()(tables.order)
      .update(body)
      .where("CUSTOMER_supplier_id", supplierId)
      .andWhere("order_id", order_id)
      .andWhere("order_status", 0);

    const updatedRows = await getKnex()(tables.order)
      .select(
        "delivery_box",
        "delivery_city",
        "delivery_country",
        "delivery_house_number",
        "delivery_postal_code",
        "delivery_street",
        "name as packaging_name",
        "PACKAGING_packaging_id as packaging_id"
      )
      .join(
        tables.packaging,
        `${tables.order}.PACKAGING_packaging_id`,
        `${tables.packaging}.packaging_id`
      )
      .where("CUSTOMER_supplier_id", supplierId)
      .andWhere("order_id", order_id)
      .andWhere("order_status", 0)
      .first();
    return updatedRows;
  } catch (error) {
    const logger = getLogger();
    logger.error("Error in updating order", {
      error,
    });
    throw error;
  }
};

module.exports = {
  getVerificationTypeByTrackAndTraceCode,
  getTrackAndTraceByOrderId,
  getTrackAndTraceByPostalCode,
  getCodesByOrder,
  getById,
  createOrder,
  updateOrder,
};
