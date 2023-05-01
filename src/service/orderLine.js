const orderLineRepository = require("../repository/orderLine");
const ServiceError = require("../core/serviceError");

const getById = async (id) => {
  const orderLine = await orderLineRepository.getById(id);
  if (!orderLine) {
    throw ServiceError.notFound(`There is no orderLine with id ${id}`);
  }
  return {
    items: orderLine,
    count: orderLine.length || 1,
  };
};

const create = async (body) => {
  const orderLineId = await orderLineRepository.create(body);
  return getById(orderLineId);
};

module.exports = {
  create,
  getById,
};
