const packagingRepository = require("../repository/packaging");
const ServiceError = require("../core/serviceError");

const getAll = async () => {
  const packagings = await packagingRepository.getAll();

  if (!packagings[0]) {
    throw ServiceError.notFound(`There are packagings for this company`);
  }
  return {
    items: packagings,
    count: packagings.length,
  };
};

module.exports = {
  getAll,
};
