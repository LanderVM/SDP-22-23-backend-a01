const packagingRepository = require("../repository/packaging");
const ServiceError = require("../core/serviceError");

const getBySupplierId = async (supplierId) => {
  const packagings = await packagingRepository.getBySupplierId(supplierId);

  return {
    items: packagings,
    count: packagings.length,
  };
};

module.exports = {
  getBySupplierId,
};
