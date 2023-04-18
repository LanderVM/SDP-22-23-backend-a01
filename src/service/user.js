const userRepository = require("../repository/user");
const ServiceError = require("../core/serviceError");

const getByEmail = async (email) => {
  const user = await userRepository.getByEmail(email);
  if (!user) {
    throw ServiceError.notFound(`There is no user with email ${email}`);
  }
  return {
    items: user,
    count: user.length,
  };
};

const getBySupplierId = async (supplierId) => {
  const user = await userRepository.getBySupplierId(supplierId);
  if (!user) {
    throw ServiceError.notFound(
      `There is no user with supplier id: ${supplierId}`
    );
  }
  return {
    items: user,
    count: user.length,
  };
};

module.exports = {
  getByEmail,
  getBySupplierId,
};
