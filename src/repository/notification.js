const { getKnex, tables } = require("../data/index");
const { getLogger } = require("../core/logging");

const getById = async (id) =>{
  const notification = await getKnex()(tables.order_notification).where("notification_id",id).first();

  return notification;
}

const getAllByAuthId = async (auth0Id) =>{
  
  const supplierId = await getKnex()(tables.customer).select("SUPPLIER_supplier_id").where("auth0_id", auth0Id);
  
  const notifications = await getKnex()(tables.order_notification)
  .join(tables.order,`${tables.order_notification}.ORDER_order_id`,"=",`${tables.order}.order_id`)
  .select("*")
  .where(`${tables.order_notification}.CUSTOMER_supplier_id`,supplierId[0].SUPPLIER_supplier_id.toString());
  
  return notifications;
}

const getNotReadByAuthId = async (auth0Id) => {
  const supplierId = await getKnex()(tables.customer).select("SUPPLIER_supplier_id").where("auth0_id", auth0Id);

  if (supplierId.length===0) {
    return {info:"no supplier found for auth0id"}
  }

  const notifications = await getKnex()(tables.order_notification)
  .join(tables.order,`${tables.order_notification}.ORDER_order_id`,"=",`${tables.order}.order_id`)
  .where(`${tables.order_notification}.CUSTOMER_supplier_id`,supplierId[0].SUPPLIER_supplier_id.toString())
  .andWhereNot("status","read").select("*");
  
  return notifications;
}

const getSortedOnDateDescByAuthId = async (auth0Id) => {
  const supplierId = await getKnex()(tables.customer).select("SUPPLIER_supplier_id").where("auth0_id", auth0Id);

  if (supplierId.length===0) {
    return {info:"no supplier found for auth0id"}
  }

  const notifications = await getKnex()(tables.order_notification)
  .join(tables.order,`${tables.order_notification}.ORDER_order_id`,"=",`${tables.order}.order_id`)
  .where(`${tables.order_notification}.CUSTOMER_supplier_id`,supplierId[0].SUPPLIER_supplier_id.toString())
  .orderBy("notification_date","desc")
  .select("*");
  
  return notifications;
}

const updateById = async (id,{notification_date,CUSTOMER_supplier_id,ORDER_order_id,status,message}) => {
  try {
    const theDate = new Date(notification_date);

    await getKnex()(tables.order_notification).update({
      notification_date:theDate,
      CUSTOMER_supplier_id,
      ORDER_order_id,
      status,
      message,
    }).where(`${tables.order_notification}.notification_id`, id);

    return await getById(id);
  } catch (error) {
    const logger = getLogger();
    logger.error('Error in repository update notification', {error});
    throw error;
  }
}

const updateByArray = async (array) => {
  try {
    await getKnex()(tables.order_notification)
    .whereIn(`${tables.order_notification}.notification_id`,array)
    .update({
      status:"unread",
    })

    return await getKnex()(tables.order_notification).select("*").whereIn(`${tables.order_notification}.notification_id`,array);
  } catch (error) {
    logger.error('Error in repository update notification by array', {error});
    throw error;
  }
}

module.exports = {
  getAllByAuthId,getNotReadByAuthId,updateById,getById,getSortedOnDateDescByAuthId,updateByArray,
}
