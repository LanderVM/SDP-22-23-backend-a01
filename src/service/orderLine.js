const orderLineRepository = require("../repository/orderLine");
const ServiceError = require("../core/serviceError");

const getById = async (id) => {
  const orderLine = await orderLineRepository.getById(id);
  if (!orderLine) {
    throw ServiceError.notFound(`There is no medication with id ${id}`);
  }
  return {
    items: orderLine,
    count: orderLine.length,
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
