const { getKnex, tables } = require("../data/index");
const { getLogger } = require("../core/logging");

const getVerificationTypeByTrackAndTraceCode = async (trackAndTraceCode) => {
  const product = await getKnex()(tables.sub_order)
    .select("verification_type")
    .join(
      tables.carrier,
      `${tables.carrier}.carrier_id`,
      `${tables.sub_order}.CARRIER_carrier_id`
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
  const product = await getKnex()(tables.sub_order)
    .join(
      tables.carrier,
      `${tables.carrier}.carrier_id`,
      `${tables.sub_order}.CARRIER_carrier_id`
    )
    .join(
      tables.tracking_code_details,
      `${tables.tracking_code_details}.tracking_code_details_id`,
      `${tables.carrier}.TRACKINGCODEDETAILS_tracking_code_details_id`
    )
      .join(
          tables.order,
          `${tables.sub_order}.ORDER_order_id`,
          `${tables.order}.order_id`
      )
    .where("tracking_code", trackAndTraceCode)
    .andWhere(verificationColumn, verificationCode)
    .first();

  return product;
};

const getTrackAndTraceByOrderId = async (
  trackAndTraceCode,
  verificationCode
) => {
  return getProductsByTrackingCodes(
    trackAndTraceCode,
    verificationCode,
    "ORDER_order_id"
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

const getById = async (orderId, auth0Id) => {
  const order = await getKnex()(tables.sub_order)
    .where("order_id", orderId)
    .andWhere("CUSTOMER_auth0_id", auth0Id)
    .first();
  return order;
};

const postOrder = async (
  delivery_country,
  delivery_city,
  delivery_postal_code,
  delivery_street,
  delivery_house_number,
  delivery_box,
  order_date,
  order_status,
  tracking_code,
  CARRIER_carrier_id,
  CUSTOMER_supplier_id,
  PACKAGING_packaging_id,
  SUPPLIER_supplier_id,
  auth0Id
) => {
  try {
    const [id] = await getKnex()(tables.sub_order).insert({
      delivery_country,
      delivery_city,
      delivery_postal_code,
      delivery_street,
      delivery_house_number,
      delivery_box,
      order_date,
      order_status,
      tracking_code,
      CARRIER_carrier_id,
      CUSTOMER_supplier_id,
      PACKAGING_packaging_id,
      SUPPLIER_supplier_id,
      CUSTOMER_auth0_id: auth0Id,
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

module.exports = {
  getVerificationTypeByTrackAndTraceCode,
  getTrackAndTraceByOrderId,
  getTrackAndTraceByPostalCode,
  getById,
  postOrder,
};
