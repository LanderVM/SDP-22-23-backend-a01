const packagingRepository = require("../repository/packaging");
const ServiceError = require("../core/serviceError");
const customerRepository = require("../repository/customer");

const getBySupplierId = async (auth0Id) => {
  const { SUPPLIER_supplier_id: supplierId } =
    await customerRepository.getSupplierId(auth0Id);
  console.log(supplierId);
  const packagings = await packagingRepository.getBySupplierId(supplierId);

  return {
    items: packagings,
    count: packagings.length,
  };
};

module.exports = {
  getBySupplierId,
};
