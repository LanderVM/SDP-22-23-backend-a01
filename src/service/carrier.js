const carrierRepository = require("../repository/carrier");
const ServiceError = require("../core/serviceError");
const customerService = require("./customer");

const getBySupplierId = async (auth0Id) => {
  const { SUPPLIER_supplier_id: supplierId } =
    await customerService.getSupplierId(auth0Id);
  const carriers = await carrierRepository.getBySupplierId(supplierId);

  return {
    items: carriers,
    count: carriers.length,
  };
};

module.exports = {
  getBySupplierId,
};
