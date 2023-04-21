const customerRepository = require("../repository/customer");
const ServiceError = require("../core/serviceError");

const getByEmail = async (email) => {
  const customer = await customerRepository.getByEmail(email);
  if (!customer) {
    throw ServiceError.notFound(`There is no customer with email ${email}`);
  }
  return {
    items: customer,
    count: customer.length,
  };
};

const getBySupplierId = async (supplierId) => {
  const customer = await customerRepository.getBySupplierId(supplierId);
  if (!customer) {
    throw ServiceError.notFound(
      `There is no customer with supplier id: ${supplierId}`
    );
  }
  return {
    items: customer,
    count: customer.length,
  };
};

module.exports = {
  getByEmail,
  getBySupplierId,
};
