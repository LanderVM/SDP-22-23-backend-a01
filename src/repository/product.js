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

const getFilteredProducts = async (
  name,
  startPrice,
  endPrice,
  inStock,
  brand,
  category,
  limit,
  skip,
  sortBy,
) => {
  const products = getKnex()(tables.product);
  if (name) {
    products.whereILike("name", `%${name}%`);
    console.log(name)
  }
  if (inStock) {
    products.where("stock", ">", 0);
  }
  products.whereBetween("price", [startPrice, endPrice]);
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
  if (sortBy) {
    products.orderBy(`${tables.product}.${sortBy}`);
  }
  return products;
};

const getSortItems = async () => {
  const categories = await getKnex()(tables.product)
    .select("category")
    .distinct();
  return categories;
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
  getFilteredProducts,
  getSortItems,
  getCategories,
  getBrands,
  getHighestPrice,
};
