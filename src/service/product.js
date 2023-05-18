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

const getByIds = async ({ productId = null }) => {
  const products = await productRepository.getByIds(
    Array.isArray(productId) ? productId : productId ? Array(productId) : null
  );
  if (!products[0]) {
    throw ServiceError.notFound(
      `There is no products with id ${Array(productId)}`
    );
  }
  return {
    items: products,
    count: products.length,
  };
};

const getFilteredProducts = async ({
  name,
  startPrice = 0,
  endPrice = Number.MAX_SAFE_INTEGER,
  inStock = false,
  brand = null,
  category = null,
  limit,
  skip = 0,
  sortBy,
}) => {
  if (Number(startPrice) > Number(endPrice)) {
    endPrice = Number.MAX_SAFE_INTEGER;
  }

  const products = await productRepository.getFilteredProducts(
    name,
    Number(startPrice),
    Number(endPrice),
    Boolean(JSON.parse(inStock)),
    Array.isArray(brand) ? brand : brand ? Array(brand) : null,
    Array.isArray(category) ? category : category ? Array(category) : null,
    Number(limit),
    Number(skip),
    sortBy,
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
  getByIds,
  getFilteredProducts,
  getCategories,
  getBrands,
  getHighestPrice,
};
