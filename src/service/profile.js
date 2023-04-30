const profileRepository = require("../repository/profile");
const ServiceError = require("../core/serviceError");

const getByAuthId = async (auth0Id) => {
  const profile = await profileRepository.getByAuthId(auth0Id);
  return {
    items: profile,
    count: profile.length,
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
