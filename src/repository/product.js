const { getKnex, tables } = require("../data/index");

const getAll = async () => {
  const products = await getKnex()(tables.product);
  return products;
};

const getByIds = async (productId) => {
  const products = getKnex()(tables.product);
  if (productId) {
    products.whereIn("product_id", productId);
  }
  return products;
};

const getByName = async (name) => {
  const product = await getKnex()(tables.product).where("name", name).first();
  return product;
};

const getFilteredProducts = async (
  startPrice,
  endPrice,
  inStock,
  brand,
  category,
  limit,
  skip
) => {
  const products = getKnex()(tables.product);
  if (inStock) {
    products.where("stock", ">", 0);
  } else {
    products.where("stock", "=", 0);
  }
  if (startPrice != null && endPrice != null) {
    products.whereBetween("price", [startPrice, endPrice]);
  }
  if (category) {
    products.whereIn("category", category);
  }
  if (brand) {
    products.whereIn("brand", brand);
  }
  if (limit) {
    products.limit(limit);
  }
  products.offset(skip);
  return products;
};

const getCategories = async () => {
  const categories = await getKnex()(tables.product)
    .select("category")
    .distinct();
  return categories;
};

const getBrands = async () => {
  const brands = await getKnex()(tables.product).select("brand").distinct();
  return brands;
};

const getHighestPrice = async () => {
  const highestPrice = await getKnex()(tables.product)
    .max({ price: "price" })
    .first();
  return highestPrice;
};

module.exports = {
  getAll,
  getByIds,
  getByName,
  getFilteredProducts,
  getCategories,
  getBrands,
  getHighestPrice,
};
