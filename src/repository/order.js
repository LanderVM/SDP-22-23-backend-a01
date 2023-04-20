const { getKnex, tables } = require("../data/index");

const getVerificationTypeByTrackAndTraceCode = async (code) => {
  const product = await getKnex()(tables.customer_order)
    .select("verification_type")
    .join(
      tables.carrier,
      `${tables.carrier}.carrier_id`,
      `${tables.customer_order}.CARRIER_carrier_id`
    )
    .join(
      tables.tracking_code_details,
      `${tables.tracking_code_details}.tracking_code_details_id`,
      `${tables.carrier}.TRACKINGCODEDETAILS_tracking_code_details_id`
    )
    .where("tracking_code", code)
    .first();
  return product;
};

const getByOrderId = async (trackAndTraceCode, verificatiecode) => {
  const product = await getKnex()(tables.customer_order)
    .join(
      tables.carrier,
      `${tables.carrier}.carrier_id`,
      `${tables.customer_order}.CARRIER_carrier_id`
    )
    .join(
      tables.tracking_code_details,
      `${tables.tracking_code_details}.tracking_code_details_id`,
      `${tables.carrier}.TRACKINGCODEDETAILS_tracking_code_details_id`
    )
    .where("tracking_code", trackAndTraceCode)
    .andWhere("order_id", verificatiecode)
    .first();

  return product;
};

const getBypostalCode = async (trackAndTraceCode, verificatiecode) => {
  const product = await getKnex()(tables.customer_order)
    .join(
      tables.carrier,
      `${tables.carrier}.carrier_id`,
      `${tables.customer_order}.CARRIER_carrier_id`
    )
    .join(
      tables.tracking_code_details,
      `${tables.tracking_code_details}.tracking_code_details_id`,
      `${tables.carrier}.TRACKINGCODEDETAILS_tracking_code_details_id`
    )
    .where("tracking_code", trackAndTraceCode)
    .andWhere("delivery_postal_code", verificatiecode)
    .first();

  return product;
};

module.exports = {
  getVerificationTypeByTrackAndTraceCode,
  getByOrderId,
  getBypostalCode,
};
