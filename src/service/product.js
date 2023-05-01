const productRepository = require("../repository/product");
const ServiceError = require("../core/serviceError");

const getAll = async () => {
  const products = await productRepository.getAll();
  /*if (!products) {
    throw ServiceError.notFound(`There are no products.`);
  }*/
  return {
    items: products,
    count: products.length,
  };
};

const getById = async (id) => {
  const product = await productRepository.getById(Number(id));
  if (!product) {
    throw ServiceError.notFound(`There is no product with id ${id}`);
  }
  return {
    items: product,
    count: product.length || 1,
  };
};

const getByName = async (name) => {
  const product = await productRepository.getByName(name);
  if (!product) {
    throw ServiceError.notFound(`There is no product with name ${name}`);
  }
  return {
    items: product,
    count: product.length || 1,
  };
};

const getFilteredProducts = async ({
  startPrice = 0,
  endPrice = Number.MAX_SAFE_INTEGER,
  inStock = true,
  brand,
  category,
  limit,
  skip = 0,
}) => {
  const products = await productRepository.getFilteredProducts(
    Number(startPrice),
    Number(endPrice),
    Boolean(JSON.parse(inStock)),
    Array(brand),
    Array(category),
    Number(limit),
    Number(skip)
  );
  //Komt niet in
  /*if (!products) {
    throw ServiceError.notFound(`There are no products with the given filter.`);
  }*/
  return {
    items: products,
    count: products.length,
  };
};

const getCategories = async () => {
  const categories = await productRepository.getCategories();
  if (!categories) {
    throw ServiceError.notFound(`There are no products with categories`);
  }
  return {
    items: categories,
    count: categories.length,
  };
};

const getBrands = async () => {
  const brands = await productRepository.getBrands();
  if (!brands) {
    throw ServiceError.notFound(`There are no products with brands`);
  }
  return {
    items: brands,
    count: brands.length,
  };
};

const getHighestPrice = async () => {
  const highestPrice = await productRepository.getHighestPrice();
  if (!highestPrice) {
    throw ServiceError.notFound(`There are no products`);
  }
  return {
    items: highestPrice,
    count: highestPrice.length || 1,
  };
};

module.exports = {
  getAll,
  getById,
  getByName,
  getFilteredProducts,
  getCategories,
  getBrands,
  getHighestPrice,
};
