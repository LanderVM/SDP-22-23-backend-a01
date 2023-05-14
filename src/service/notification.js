const notificationRepository = require("../repository/notification");
const ServiceError = require("../core/serviceError");

const getAllByAuthId = async (auth0Id) => {
  
  const notifications = await notificationRepository.getAllByAuthId(auth0Id);
  
  if (!notifications) {
    throw ServiceError.notFound("there are no notifications for this auth0Id");
  }

  return {
    items:notifications,
    count:notifications.length || 1,
  };
}

module.exports = {
  getAllByAuthId,
}