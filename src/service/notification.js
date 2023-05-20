const notificationRepository = require("../repository/notification");
const ServiceError = require("../core/serviceError");
const { getLogger } = require("../core/logging");

const getAllByAuthId = async (auth0Id) => {
  
  const notifications = await notificationRepository.getSortedOnDateDescByAuthId(auth0Id);
  
  if (!notifications) {
    throw ServiceError.notFound("there are no notifications for this auth0Id");
  }

  return {
    items:notifications,
    count:notifications.length || 1,
  };
};

const getNotReadByAuthId = async (auth0Id) => {
  const notifications = await notificationRepository.getNotReadByAuthId(auth0Id);

  if (!notifications) {
    throw ServiceError.notFound("there are no notifications for this auth0Id");
  }

  return {
    items:notifications,
    count:notifications.length || 1,
  };
};

const getAmountNotReadByAuthId = async (auth0Id) => {
  const notifications = await notificationRepository.getNotReadByAuthId(auth0Id);

  return {count:notifications.length || 0,};
}

const getFiveMostRecentByAuthId = async (auth0Id) => {
  const notifications = await notificationRepository.getSortedOnDateDescByAuthId(auth0Id);

  if(notifications.info) {
    return notifications;
  }
  
  const notifications2 = notifications.slice(0,5);

  return {
    items:notifications2,
    count:notifications2.length || 1,
  };
}

const updateById = async (notification) => {

  let existingNotification

  if (notification.notification_id) {
    existingNotification = await notificationRepository.getById(notification.notification_id);
    if (!existingNotification) {
      getLogger().error(`there is no notification with id: ${notification.notification_id}`);
      throw new ServiceError.notFound(`there is no notification with id: ${notification.notification_id}`);
    }
  }
  const toReturn = await notificationRepository.updateById(notification.notification_id,notification);

  return toReturn;

};

const updateByArray = async (body) => {
  return await notificationRepository.updateByArray(body.notifications);
}

module.exports = {
  getAllByAuthId,getNotReadByAuthId,updateById,getAmountNotReadByAuthId,getFiveMostRecentByAuthId,updateByArray,
}