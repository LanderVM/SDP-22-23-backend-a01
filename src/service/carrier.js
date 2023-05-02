const carrierRepository = require("../repository/carrier");
const ServiceError = require("../core/serviceError");
const customerRepository = require("../repository/customer");

const getBySupplierId = async (auth0Id) => {
  const { SUPPLIER_supplier_id: supplierId } =
    await customerRepository.getSupplierId(auth0Id);
  const carriers = await carrierRepository.getBySupplierId(supplierId);

  return {
    items: carriers,
    count: carriers.length,
  };
};

module.exports = {
  getBySupplierId,
};
