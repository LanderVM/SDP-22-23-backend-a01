const profileRepository = require("../repository/profile");
const ServiceError = require("../core/serviceError");

const getByAuthId = async (auth0Id) => {
  const profile = await profileRepository.getByAuthId(auth0Id);
  if (!profile) {
    throw ServiceError.notFound(`There is no user with auth0id "${auth0Id}"`);
  }
  return {
    items: profile,
    count: profile.length || 1,
  };
};
const getAllColleagues = async (auth0Id) => {
  const colleagues = await profileRepository.getAllColleagues(auth0Id);
  return {
    items: colleagues,
    count: colleagues.length,
  };
};

module.exports = {
  getByAuthId,
  getAllColleagues,
};
