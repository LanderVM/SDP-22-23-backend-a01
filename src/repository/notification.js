const { getKnex, tables } = require("../data/index");

const getAllByAuthId = async (auth0Id) =>{
  console.log(auth0Id);
  const supplierId = await getKnex()(tables.customer).select("SUPPLIER_supplier_id").where("auth0_id", auth0Id);
  
  const notifications = await getKnex()(tables.order_notification)
  .join(tables.order,`${tables.order_notification}.ORDER_order_id`,"=",`${tables.order}.order_id`)
  .select("*")
  .where(`${tables.order_notification}.CUSTOMER_supplier_id`,supplierId[0].SUPPLIER_supplier_id.toString());
  
  return notifications;
}

module.exports = {
  getAllByAuthId,
}
