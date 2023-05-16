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
  if (!supplierId) {
    throw ServiceError.notFound(
      `There are no suppliers for this users company`
    );
  }
  return supplierId;
};

const getAllColleagues = async (auth0Id) => {
  const { SUPPLIER_supplier_id: supplierId } = await getSupplierId(auth0Id);
  const colleagues = await customerRepository.getAllColleagues(
    auth0Id,
    supplierId
  );
  if (!colleagues[0]) {
    throw ServiceError.notFound(`There are no colleagues for this user`);
  }
  return {
    items: colleagues,
    count: colleagues.length,
  };
};

const getAllOrders = async (
  { statuses = null },
  auth0Id
) => {
  const orders = await customerRepository.getAllOrders(
    Array.isArray(statuses) ? statuses : statuses ? Array(statuses) : null,
    auth0Id
  );

  if (!orders) {
    throw ServiceError.notFound(`There are no orders for this company`);
  }
  return {
    items: orders,
    count: orders.length,
  };
};

module.exports = {
  getByAuthId,
  getAllColleagues,
  getAllOrders,
  getSupplierId,
};
