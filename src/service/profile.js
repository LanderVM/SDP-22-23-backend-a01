const profileRepository = require("../repository/profile");
const ServiceError = require("../core/serviceError");

const getAll = async (auth0Id) => {
  const profile = await profileRepository.getAll(auth0Id);
  /*if (!products) {
    throw ServiceError.notFound(`There are no products.`);
  }*/
  return {
    items: profile,
    count: profile.length,
  };
};

module.exports = {
  getAll,
};
