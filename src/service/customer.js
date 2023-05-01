const customerRepository = require("../repository/customer");
const ServiceError = require("../core/serviceError");

const getByAuthId = async (auth0Id) => {
  const profile = await customerRepository.getByAuthId(auth0Id);
  if (!profile) {
    throw ServiceError.notFound(`There is no user with auth0id "${auth0Id}"`);
  }
  return {
    items: profile,
    count: profile.length || 1,
  };
};

const getSupplierId = async (auth0Id) => {
  const supplierId = await customerRepository.getSupplierId(auth0Id);
  return supplierId;
};

const getAllColleagues = async (auth0Id) => {
  const { SUPPLIER_supplier_id: supplierId } = await getSupplierId(auth0Id);
  const colleagues = await customerRepository.getAllColleagues(
    auth0Id,
    supplierId
  );
  return {
    items: colleagues,
    count: colleagues.length,
  };
};

const getAllOrders = async (auth0Id) => {
  const orders = await customerRepository.getAllOrders(auth0Id);
  return {
    items: orders,
    count: orders.length,
  };
};

module.exports = {
  getByAuthId,
  getAllColleagues,
  getAllOrders,
};
