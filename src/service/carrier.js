const carrierRepository = require("../repository/carrier");
const ServiceError = require("../core/serviceError");

const getBySupplierId = async (supplierId) => {
  const carriers = await carrierRepository.getBySupplierId(supplierId);

  return {
    items: carriers,
    count: carriers.length,
  };
};

module.exports = {
  getBySupplierId,
};
