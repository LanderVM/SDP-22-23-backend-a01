const { getKnex, tables } = require("../data/index");

const getVerificationTypeByTrackAndTraceCode = async (trackAndTraceCode) => {
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
    .where("tracking_code", trackAndTraceCode)
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

const findById = async (orderId) => {
  const order = await getKnex()(tables.customer_order).where('order_id',orderId).first();
  return order;
}

const create = async (supplierCustomerId,address,date,supplierId) => {
  const [id] =  await getKnex()(tables.customer_order).insert({
    delivery_address:address,order_date:date,original_acquisition_price:0,order_status:0,
    tracking_code:null,CARRIER_carrier_id:null,CUSTOMER_supplier_id:supplierCustomerId,
    PACKAGING_packaging_id:1,SUPPLIER_supplier_id:supplierId,
  })
  return id;
}


module.exports = {
  getVerificationTypeByTrackAndTraceCode,
  getByOrderId,
  getBypostalCode,
  findById,
  create,
};
