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
    .where("order_id", orderId)
    .andWhere("CUSTOMER_supplier_id", supplierId)
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
      CARRIER_carrier_id,
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

module.exports = {
  getVerificationTypeByTrackAndTraceCode,
  getTrackAndTraceByOrderId,
  getTrackAndTraceByPostalCode,
  getById,
  postOrder,
};
