const { shutdownData, getKnex, tables } = require("../src/data");

module.exports = async () => {
  await getKnex()(tables.user).delete();
  await getKnex()(tables.supplier_contact_person).delete();
  await getKnex()(tables.packaging).delete();
  await getKnex()(tables.company_logo).delete();
  await getKnex()(tables.carrier_contact_person).delete();
  await getKnex()(tables.order_notification).delete();
  await getKnex()(tables.order_line).delete();
  await getKnex()(tables.order).delete();
  await getKnex()(tables.product).delete();
  await getKnex()(tables.contact_person).delete();
  await getKnex()(tables.carrier).delete();
  await getKnex()(tables.tracking_code_details).delete();
  await getKnex()(tables.customer).delete();
  await getKnex()(tables.supplier).delete();

  await shutdownData();
};
